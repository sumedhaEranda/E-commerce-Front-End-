
import React, { useState, useEffect } from "react";

function Test() {
  const [productData, setProductData] = useState([]);


  return (
    <div>
      <h1>Product List</h1>
      {/* {productData.map((product) => (
        <div key={product.id}>
          <h2>{product.id}</h2>
          <p>{product.title}</p>
          <p>{
          
          
          }</p>
          <p>{product.category}</p>
          <p>Price: {product.price}</p>
        </div>
      ))} */}
    </div>
  );
}

export default Test;