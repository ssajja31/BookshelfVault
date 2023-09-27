import React, { useEffect, useState } from "react";
import { Category } from "../../models/category";
import { useCart } from "../../hooks/CartContext";
import "./Navbar.css";

interface NavbarProps {
  categories: Category[];
  totalItemsCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ categories }) => {
  const { openCart } = useCart();
  const [totalItemsCount, setTotalItemsCount] = useState<number | null>(null);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);

  // set below to dynamically update cart value
  useEffect(() => {
    setTotalItemsCount(5);
  }, []);

  // update query string to specify category based on below
  const handleCategoryClick = (categoryName: string) => {
    setCurrentCategory(categoryName);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fw-bolder">
      <div className="container px-4 px-lg-5">
        <a className="navbar-brand" href="/">
          Bookshelf Vault
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="register">
                Register
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="login">
                Login
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {categories.map((category) => (
                  <li key={category.categoryId}>
                    <button className={"dropdown-item"}>
                      <button
                        className={"dropdown-item"}
                        onClick={() => handleCategoryClick(category.name)}
                      >
                        {category.name}
                      </button>
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          <form className="d-flex">
            <button
              className="btn btn-outline-dark"
              onClick={openCart}
              type="button"
            >
              <i className="bi-cart-fill me-1"></i>
              Cart
              <span className="badge bg-dark text-white ms-1 rounded-pill">
                {totalItemsCount}
              </span>
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
