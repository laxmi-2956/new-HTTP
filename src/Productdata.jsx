import React, { useEffect, useState } from "react";
import axios from "axios";


const Productdata = () => {

  
  const [data, setData] = useState([]); 
  const [editProductId, setEditProductId] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedPrice, setUpdatedPrice] = useState("");


  const getdatafromapi = () => {
    axios
      .get("http://localhost:8080/product")
      .then((res) => {
        setData(res.data.product);
        
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteProduct = (id) => {
    axios
      .delete(`http://localhost:8080/deleteproduct/${id}`)
      .then(() => {
        setData(data.filter((item) => item.id !== id)); 
      })
      .catch((err) => console.log(err));
  };


  const updateProduct = (id) => {
    axios
      .put(`http://localhost:8080/updateproduct/${id}`, {
        title: updatedTitle,
        price: updatedPrice,
      })
      .then((res) => {
        setData(data.map((item) => (item.id === id ? res.data.product : item)));
        setEditProductId(null);
      })
      .catch((err) => console.log(err));
  };


  

  useEffect(() => {
    getdatafromapi(); 
  }, []);

  // return (
  //   <>
  //     <h1>Product</h1>
  //     <div>
  //       <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr" }}>
  //         {data.length > 0 &&
  //           data.map((el) => (
  //             <div key={el.id}>
  //               <img src={el.image} alt="" height={200} width={200} />
  //               <h2 style={{fontSize : '20px'}}>{el.title}</h2>
  //               <h2>{el.price}</h2>
  //               <p style={{fontSize : '14px'}}>{el.description}</p>
  //               <button onClick={() => deleteProduct(el.id)}>delete</button>
  //             </div>
  //           ))}
  //       </div>
  //     </div>
  //   </>
  // );

  return (
    <>
      <h1>Product</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
        {data.length > 0 &&
          data.map((el) => (
            <div key={el.id}>
              <img src={el.image} alt="" height={200} width={200} />
              {editProductId === el.id ? (
                <>
                  <input
                    type="text"
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                    placeholder="Update title"
                  />
                  <input
                    type="text"
                    value={updatedPrice}
                    onChange={(e) => setUpdatedPrice(e.target.value)}
                    placeholder="Update price"
                  />
                  <button onClick={() => updateProduct(el.id)}>update</button>
                 
                </>
              ) : (
                <>
                  <h2 style={{ fontSize: "20px" }}>{el.title}</h2>
                  <h2>{el.price}</h2>
                  <p style={{ fontSize: "14px" }}>{el.description}</p>
                  <button onClick={() => deleteProduct(el.id)}>Delete</button>
                  <button onClick={() => setEditProductId(el.id)}>Edit</button>
                </>
              )}
            </div>
          ))}
      </div>
    </>
  );
};




export default Productdata;