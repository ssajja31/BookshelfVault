import React from "react";
import { Book } from "../../models/book";

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  let counter = 0;
  function addToCart() {
    counter++;
    console.log(counter);
  }

  return (
    <div>
      <div className="col mb-5">
        <div className="card">
          <img
            className="card-img-top"
            src={book.thumbnail}
            style={{ height: "350px" }}
          />
          <div className="card-body" style={{ height: "200px" }}>
            <div className="text-center">
              <h5 className="fw-bolder">{book.title}</h5>
              <h6 className="fw-bolder">by</h6>
              <h5 className="fw-bolder">{book.author}</h5>
              {book.price}
            </div>
          </div>
          <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div className="text-center">
              <button
                className="btn btn-outline-dark mt-auto"
                onClick={addToCart}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
