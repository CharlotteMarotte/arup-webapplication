import React from 'react';
import ProductCard from '../components/ProductCard';


export default function Productgrid(props) {
  return (
    <div className="col-8 offset-2 mb-5">
    <h1 className="text-center">All products</h1>
      <div className="row row-cols-1 row-cols-md-3 g-5">
        {props.products.map((p) => (
          <ProductCard key={p.id} product={p}/>
        ))}
      </div>
      {/* <button
        type="button"
        className="btn btn-outline-primary mt-5"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button> */}
    </div>
  );
}
