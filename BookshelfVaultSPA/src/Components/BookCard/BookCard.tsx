import React from "react";
import { Book } from "../../models/book";

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <div>
      <div className="col mb-5">
        <div className="card h-100">
          <img className="card-img-top" src={book.thumbnail} />
          <div className="card-body p-4">
            <div className="text-center">
              <h5 className="fw-bolder">{book.title}</h5>
              <h6 className="fw-bolder">by</h6>
              <h5 className="fw-bolder">{book.author}</h5>
              {book.price}
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
