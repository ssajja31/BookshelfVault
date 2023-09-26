import React from "react";
import { useCart } from "../../context/CartContext";
import { Book } from "../../models/book";

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { getItemQuantity, addToCart } = useCart();
  const quantity = getItemQuantity(book.id);

  return (
    <div>
      <div className="col mb-5">
        <div className="card h-100">
          <img
            className="card-img-top"
            src={book.thumbnail}
            style={{ height: "350px" }}
          />
          <div className="card-body" style={{ height: "200px" }}>
            <div className="text-center">
              <h5 className="fw-bolder">{book.title}</h5>
              <h6 className="fw-bolder">by</h6>
              <h5 className="fw-bolder">{book.author}</h5>${book.price} CAD
            </div>
          </div>
          <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div className="text-center mt-auto">
              {quantity === 0 ? (
                <button
                  className="btn btn-outline-dark mt-auto w-100"
                  onClick={() => addToCart(book.id)}
                >
                  Add to cart
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
