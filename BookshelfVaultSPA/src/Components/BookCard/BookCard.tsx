import React from "react";

const BookCard: React.FC = () => {
  return (
    <div>
      <div className="col mb-5">
        <div className="card h-100">
          <img
            className="card-img-top"
            src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
            alt="..."
          />
          <div className="card-body p-4">
            <div className="text-center">
              <h5 className="fw-bolder">Book 1</h5>
              $2.50
            </div>
          </div>
          <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div className="text-center">
              <a className="btn btn-outline-dark mt-auto" href="#">
                Add to cart
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
