import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from 'react-router-dom';
import Productgrid from './views/Productgrid';
import Api from './helpers/Api';
import './App.css';


function App() {
  const navigate = useNavigate();

  let [products, setProducts] = useState([]);

  // useEffect() will call getproducts() when App is mounted on the DOM
  useEffect(() => {
    getProducts();
  }, []);

  // GET all products
  async function getProducts() {
    let response = await Api.getContent('/products');
    try {
      if (response.ok) {
        let products = response.data;
        setProducts(products); // set products state with all products, so it can be used by other components/views
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  // PUT: Update a product with new information
  async function updateProduct(productID, productData) {
    let response = await Api.updateProduct(productID, productData); // do POST
    try {
      if (response.ok) {
        let products = response.data;
        setProducts(products); // set products state with updated products, so it can be used by other components/views
        navigate(`/`); // navigates to products grid
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  // DELETE a product
  async function deleteProduct(productID) {
    let response = await Api.deleteInvoice(productID);
    try {
      if (response.ok) {
        let products = response.data;
        setProducts(products); // set products state with updated products, so it can be used by other components/views
        navigate(`/`); // navigates to products grid
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  return (
    <Routes>
      <Route path="/" element={<Productgrid />} />
    </Routes>
  );
}

export default App;
