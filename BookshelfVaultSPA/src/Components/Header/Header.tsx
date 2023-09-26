import React from "react";
// import { Navbar, Nav, Container, Button } from "react-bootstrap";
import Navbar from "../Navbar/Navbar";
import CategoryDropdown from "../CategoryDropdown/CategoryDropdown";

const Header: React.FC = () => {
  return (
    <div>
      <Navbar />
      <header className="bg-dark py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="text-center text-white">
            <h1 className="display-4 fw-bolder">
              Welcome to the Bookshelf Vault!
            </h1>
            <p className="lead fw-normal text-white-50 mb-0">
              A book store e-commerce site
            </p>
          </div>
        </div>
      </header>
    </div>

    // <Navbar bg="primary" variant="dark" expand="lg">
    //   <Container>
    //     <Navbar.Brand href="#">The Bookshelf Vault</Navbar.Brand>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <CategoryDropdown options={["Test"]}></CategoryDropdown>
    //     <Nav className="ml-auto">
    //       <Nav.Link href="#register">
    //         <Button variant="outline-light">Register</Button>
    //       </Nav.Link>
    //       <Nav.Link href="#login">
    //         <Button variant="outline-light">Login</Button>
    //       </Nav.Link>
    //       <Nav.Link>
    //         <Button variant="outline-light">Cart</Button>
    //       </Nav.Link>
    //     </Nav>
    //   </Container>
    // </Navbar>
  );
};

export default Header;
