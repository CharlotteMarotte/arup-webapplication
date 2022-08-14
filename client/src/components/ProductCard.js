import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard(props) {
  return (
    <div className="col">
      <div className="card text-center" style={{ width: '18rem' }}>
        <img
          src={props.product.image}
          className="card-img-top d-flex align-items-stretch"
          alt={props.product.name}
        />
        <div className="card-body">
          <h6 className="card-subtitle mb-2 text-muted text-uppercase">
            {props.product.brand}
          </h6>
          <h5 className="card-title text-uppercase">{props.product.name}</h5>
          <p className="card-text">{props.product.price} €</p>
          <Link
            to={`/product/details/${props.product.id}`}
            className="btn btn-outline-primary card-link"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
