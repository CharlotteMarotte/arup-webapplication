import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

/*
Shows all information about a product except description, responsive with Bootstrap
*/

export default function ProductCard(props) {
  return (
    <div className="col">
      <div className="card text-center" style={{ width: '18rem' }}>
        <img
          // placeholder image if image URL not filled
          src={
            props.product.p_image.length > 0
              ? props.product.p_image
              : 'https://i.pinimg.com/originals/a5/e0/1d/a5e01db694b47cd07018813ce821a4e1.png'
          }
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
