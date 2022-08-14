import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

let DEFAULT_FORM = {
  name: '',
  brand: '',
  price: '',
  description: '',
  image: '',
};

export default function ProductForm(props) {
  let { id } = useParams();

  // useEffect() will call getProductByIDCb() when Product Form is mounted on the DOM
  useEffect(() => {
    props.getProductByIDCb(id);
  }, []);

  useEffect(() => {
    setProductData({
      name: props.product.name,
      brand: props.product.brand,
      price: props.product.price,
      description: props.product.description,
      image: props.product.image,
    });
  }, [props]);

  const [productData, setProductData] = useState({});

  const handleInputChange = (event) => {
    let { name, value } = event.target;

    // gets pressed after each key change
    setProductData((state) => ({
      ...state, // gets replaced by all key-value pairs from obj
      [name]: value, // updates key [name] with new value
    }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    props.updateProductCb(id, productData);
    setProductData(DEFAULT_FORM);
  }

  return (
    <div>
      <h1 className="text-center">Update Product Details</h1>
      <form className="row g-3 col-8 offset-2 mb-5" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label className="form-label" htmlFor="brand">
            Brand
          </label>
          <input
            type="text"
            className="form-control"
            id="brand"
            name="brand"
            value={productData.brand}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor="price">
            Price (in €){' '}
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            min={0}
            step={0.01}
            name="price"
            value={productData.price}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-12">
          <label className="form-label" htmlFor="name">
            Name{' '}
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-12">
          <label className="form-label" htmlFor="image">
            Image URL{' '}
          </label>
          <input
            type="text"
            className="form-control"
            id="image"
            name="image"
            value={productData.image}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description </label>
          <textarea
            className="form-control"
            rows="3"
            id="description"
            name="description"
            value={productData.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-12">
          <Link type="button" className="btn btn-outline-secondary m-2 px-4" to="/">
            Cancel
          </Link>
          <button type="submit" className="btn btn-outline-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
