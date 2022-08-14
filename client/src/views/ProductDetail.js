import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function ProductDetail(props) {
  let { id } = useParams();

  // useEffect() will call getproducts() when App is mounted on the DOM
  useEffect(() => {
    props.getProductByIDCb(id);
  }, []);

  return (
    <div className="container mt-5 mb-5">
      <h1 className="text-center">Product Details</h1>
      <div className="row d-flex justify-content-center">
        <div className="col-md-10">
          <div className="card">
            <div className="row">
              <div className="col-md-6">
                <div className=" p-3">
                  <div className="text-center p-4">
                    {' '}
                    <img src={props.product.image} width="250" alt={props.product.name}/>{' '}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className=" p-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      {' '}
                      <Link to="/" className="ml-1">
                        Back to products
                      </Link>{' '}
                    </div>{' '}
                  </div>
                  <div className="mt-4 mb-3">
                    {' '}
                    <span className="text-uppercase text-muted ">
                      {props.product.brand}
                    </span>
                    <h5 className="text-uppercase">{props.product.name}</h5>
                    <div className=" d-flex flex-row align-items-center">
                      {' '}
                      <span>{props.product.price} €</span>
                    </div>
                  </div>
                  <p>{props.product.description}</p>

                  <div className="mt-4 align-items-center">
                    {' '}
                    <button
                      className="btn btn-outline-danger mr-2 px-4"
                      onClick={(p) => props.deleteProductCb(props.product.id)}
                    >
                      {' '}
                      Delete
                    </button>
                    <Link
                      className="btn btn-outline-primary m-2 px-4"
                      to={`/product/update/${props.product.id}`}
                    >
                      {' '}
                      Update
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}