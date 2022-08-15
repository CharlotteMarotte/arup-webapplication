import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Productgrid from './views/Productgrid';
import Api from './helpers/Api';
import ProductForm from './views/ProductForm';
import ProductDetail from './views/ProductDetail';

function App() {
  const navigate = useNavigate();

  let [products, setProducts] = useState([]); // holds all products
  let [selectedProduct, setSelectedProduct] = useState({}); // holds product when it is chosen by clicking "Details" in Card or "Update" in DetailView

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

  // GET product by ID
  async function getProductByID(productID) {
    let response = await Api.getContent(`/products/${productID}`);
    try {
      if (response.ok) {
        let product = response.data[0];
        setSelectedProduct(product); // set product state with data of product with ID
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
        alert("Product got updated");  
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  // DELETE a product
  async function deleteProduct(productID) {
    let response = await Api.deleteProduct(productID);
    try {
      if (response.ok) {
        let products = response.data;
        setProducts(products); // set products state with updated products, so it can be used by other components/views
        navigate(`/`); // navigates to products grid
        alert("Product got deleted");  
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  return (
    <Routes>
      <Route path="/" element={<Productgrid products={products} />} />
      <Route
        path="/product/details/:id"
        element={
          <ProductDetail
            deleteProductCb={(id) => deleteProduct(id)}
            getProductByIDCb={getProductByID}
            product={selectedProduct}
          />
        }
      />
      <Route
        path="/product/update/:id"
        element={
          <ProductForm
            getProductByIDCb={getProductByID}
            product={selectedProduct}
            updateProductCb={(i, p) => updateProduct(i, p)}
          />
        }
      />
    </Routes>
  );
}

export default App;
