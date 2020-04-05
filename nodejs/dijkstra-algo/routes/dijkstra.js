var router = require('express').Router();
const fs = require('fs');
const distanceMin = 0;
const distanceMax = 999;
const previous = '';
router.get('/dijkstra/:origin/:destination', function (req, res) {
    let origin = decodeURI(req.params.origin);
    let destination = decodeURI(req.params.destination);

    let nodes = JSON.parse(fs.readFileSync('./data/datasource.json')).reduce(function (r, a) {
        let value = {
            neighbor: a.destination,
            distance: a.distance
        };
        let distance = distanceMax;
        if (a.source == origin) {
            distance = distanceMin;
        }
        r[a.source] = r[a.source] || { name: a.source, distance: distance, previous: '', neighbor: [] };
        r[a.source].neighbor.push(value);

        return r;
    }, {});

    let visited = [];
    let unvisited = nodes;

    while (Object.keys(unvisited).length > 0) {

        let sortNode = Object.keys(unvisited).map(function (key) {

            return unvisited[key];
        }).sort(function (x, y) {
            return (x.distance > y.distance) ? 1 : 0;
        });

        var minDistance = sortNode[0];
        unvisited = sortNode;

        unvisited = unvisited.filter(function (node) {
            return node.name != minDistance.name;
        });

        minDistance.neighbor.forEach(neighbor => {
            let matched = MapNode(unvisited, neighbor.neighbor);
            if (matched != -1) {
                let alt = minDistance.distance + neighbor.distance;
                unvisited.forEach(node => {
                    if (node.name == neighbor.neighbor && alt < node.distance) {
                        node.distance = alt;
                        node.previous = minDistance.name;
                    }
                });

            }
        });
        visited.push(minDistance);

    }
    let shortestPath = [];
    let nodeDestination = destination;
    while (MapNode(visited, nodeDestination) != -1) {
        let nodePrevious = visited.filter(node => node.name == nodeDestination);
        if (nodePrevious != undefined) {
            let matched = nodePrevious[0].neighbor.filter(function (node) {
                return node.neighbor == nodePrevious[0].previous;
            });

            if (matched != undefined && Object.keys(matched).length > 0) {
                var result = {
                    from : nodePrevious[0].previous,
                    to : nodePrevious[0].name,
                    distance : matched[0].distance
                };
                shortestPath.unshift(result);
                nodeDestination = nodePrevious[0].previous;
            }else{
                break;
            }
        }
    }
    res.send(shortestPath);
});

function MapNode(nodes, matchName) {
    return nodes.map(function (node) {
        return node.name;
    }).indexOf(matchName);
}

module.exports = router;