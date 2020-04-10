import React from "react";
import { Grid } from "@material-ui/core";
import MaterialTable from "material-table";

// components
import PageTitle from "../../components/PageTitle/PageTitle";

export default function Product() {
  const columns = [
    { title: 'Name', field: 'name' },
    { title: 'Price', field: 'price', type: 'numeric' },
    { title: 'Location', field: 'location' }
  ];

  const [product, setState] = React.useState({
    data: []
  });


  async function fetchData() {
    const req = await fetch("/product");
    req
      .json()
      .then(data => setState({
        data: data
      }))
      .catch(err => console.log(err));
  }

  async function AddData(newData) {
    const req = await fetch("/product", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }, body: JSON.stringify(newData)
    });
    
    req.json().then(res => {
      if(res.status == "success")
      {
        setState((prevState) => {
          const data = [...prevState.data];
          data.push(res.data);
          return { ...prevState, data };
        });
      }
    })
    .catch(error => {
        console.error(error);
    });
  }

  async function RemoveData(oldData)
  {
    fetch("/product/" + oldData.id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      if(res.ok)
      {
        setState((prevState) => {
          const data = [...prevState.data];
          data.splice(data.indexOf(oldData), 1);
          return { ...prevState, data };
        });
      }
    })
    .catch(error => {
        console.error(error);
    });  
  }

  async function EditData(newData, oldData)
  {
    const jsonData = {
      id: oldData.id,
      name: newData.name,
      price: newData.price,
      location: newData.location
    };

    fetch("/product/" + oldData.id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }, body: JSON.stringify(jsonData)
    })
    .then(res => {
      if(res.ok)
      {
        setState((prevState) => {
          const data = [...prevState.data];
          data[data.indexOf(oldData)] = newData;
          return { ...prevState, data };
        });
      }
    })
    .catch(error => {
        console.error(error);
    });  
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <PageTitle title="Products" />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {
            <MaterialTable
              title="Products list"
              options={{
                paging: false
              }}
              columns={columns}
              data={product.data}
              editable={{
                onRowAdd: (newData) =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      resolve();
                      AddData(newData);
                    }, 600);
                  }),
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      resolve();
                      if (oldData) {
                        EditData(newData, oldData);
                      }
                    }, 600);
                  }),
                onRowDelete: (oldData) =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      resolve();
                      RemoveData(oldData);
                    }, 600);
                  }),
              }}
            />
          }
        </Grid>
      </Grid>
    </>
  );
}
