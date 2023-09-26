import React from "react";

const BookCard: React.FC = () => {
  return (
    <div>
      <div className="col mb-5">
        <div className="card h-100">
          <img
            className="card-img-top"
            src="http://books.google.com/books/content?id=7vs2DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
          />
          <div className="card-body p-4">
            <div className="text-center">
              <h5 className="fw-bolder">In Defence of Science</h5>
              <h6 className="fw-bolder">by</h6>
              <h5 className="fw-bolder">Jack W. Grove</h5>
              $32.95
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
