import React from "react";
// import { Navbar, Nav, Container, Button } from "react-bootstrap";
import Navbar from "../Navbar/Navbar";
import CategoryDropdown from "../CategoryDropdown/CategoryDropdown";
import { Category } from "../../models/category";

interface HeaderProps {
  categories: Category[];
}

const Header: React.FC<HeaderProps> = ({ categories }) => {
  return (
    <div>
      <Navbar categories={categories} />
      <header className="bg-dark py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="text-center text-white">
            <h1 className="display-4 fw-bolder">
              Welcome to the Bookshelf Vault!
            </h1>
            <p className="lead fw-normal text-white-50 mb-0">
              A book e-commerce site
            </p>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
