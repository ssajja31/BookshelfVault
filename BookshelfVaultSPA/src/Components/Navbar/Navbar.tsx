import React from "react";
import { Category } from "../../models/category";

interface NavbarProps {
  categories: Category[];
}

const Navbar: React.FC<NavbarProps> = ({ categories }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fw-bolder">
      <div className="container px-4 px-lg-5">
        <a className="navbar-brand" href=".">
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
              <a className="nav-link" aria-current="page" href=".">
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
                  <li>
                    <a className="dropdown-item" href="#!">
                      {category.name}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          <form className="d-flex">
            <a className="btn btn-outline-dark" href="viewCart">
              <i className="bi-cart-fill me-1"></i>
              Cart
              <span className="badge bg-dark text-white ms-1 rounded-pill">
                0
              </span>
            </a>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
