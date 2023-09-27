import React, { useState } from "react";
import { Book } from "../../models/book";
import agent from "../../Api/agent";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface BookCardProps {
  book: Book;
}

type CartItem = {
  id: string;
  quantity: number;
};

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const quantity = getItemQuantity(book.id);

  function getItemQuantity(id: string) {
    const foundItem = cartItems.find((book) => book.id === id);
    if (foundItem) {
      return foundItem.quantity;
    } else {
      return 0;
    }
  }

  function addToCart(id: string) {
    agent.Cart.addItem(id).catch((error) => {
      console.log(error);
      toast.error(
        `Sorry, there was a problem adding ${book.title} by ${book.author} to your cart`
      );
    });

    toast.success(
      `${book.title} by ${book.author} added to your cart successfully!`
    );

    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

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
              <button
                className="btn btn-outline-dark mt-auto w-100"
                onClick={() => addToCart(book.id)}
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
