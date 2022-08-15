import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard(props) {
  return (
    <div className="col">
      <div className="card text-center" style={{ width: '18rem' }}>
        <img
          src={props.product.p_image}
          className="card-img-top d-flex align-items-stretch"
          alt={props.product.p_name}
        />
        <div className="card-body">
          <h6 className="card-subtitle mb-2 text-muted text-uppercase">
            {props.product.p_brand}
          </h6>
          <h5 className="card-title text-uppercase">{props.product.p_name}</h5>
          <p className="card-text">{props.product.p_price} €</p>
          <Link
            to={`/product/details/${props.product.p_id}`}
            className="btn btn-outline-primary card-link"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
