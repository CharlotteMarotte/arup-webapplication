import React from 'react';

export default function Productgrid() {
  return (
    <div className="App">
      {/* <div className="row row-cols-1 row-cols-md-3 g-4"></div> */}

      <button
        type="button"
        className="btn btn-primary mt-5"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
    </div>
  );
}
