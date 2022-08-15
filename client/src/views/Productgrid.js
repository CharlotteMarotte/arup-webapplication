import React from 'react';
import ProductCard from '../components/ProductCard';

/*
Grid that holds cards created from mapping over all products
*/

export default function Productgrid(props) {

  return (
    <div className="col-8 offset-2 mb-5">
      <h1 className="text-center">All products</h1>
      <div className="row row-cols-1 row-cols-md-3 g-5">
        {props.products.map((p) => (
          <ProductCard key={p.p_id} product={p} />
        ))}
      </div>
    </div>
  );
}
