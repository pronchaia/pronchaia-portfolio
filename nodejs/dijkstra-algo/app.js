const express = require('express');
const app = express();
const dijkstra = require('./routes/dijkstra');

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/', dijkstra);

app.listen(3000, () => {
    console.log('Start server at port 3000.');
});