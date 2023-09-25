import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import CategoryDropdown from "../CategoryDropdown/CategoryDropdown";

const Header: React.FC = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#">The Bookshelf Vault</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <CategoryDropdown options={["Test"]}></CategoryDropdown>
        <Nav className="ml-auto">
          <Nav.Link href="#register">
            <Button variant="outline-light">Register</Button>
          </Nav.Link>
          <Nav.Link href="#login">
            <Button variant="outline-light">Login</Button>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
