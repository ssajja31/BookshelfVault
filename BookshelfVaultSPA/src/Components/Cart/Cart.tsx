import { Col, Container, Offcanvas, Row } from "react-bootstrap";
import { useCart } from "../../context/CartContext";
import { useEffect, useState } from "react";
import { ShoppingCart } from "../../models/shoppingCart";
import agent from "../../Api/agent";

type CartProps = {
  isCartOpen: boolean;
};

export default function Cart({ isCartOpen }: CartProps) {
  const { closeCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<ShoppingCart | null>(null);

  useEffect(() => {
    agent.Cart.get()
      .then((cart) => setCart(cart))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Offcanvas show={isCartOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Container>
        <Row>
          {cart?.items.map((item) => (
            <Col key={cart.id} xs={12} sm={6} md={4} lg={3}>
              {item.title}
            </Col>
          ))}
        </Row>
      </Container>
    </Offcanvas>
  );
}
