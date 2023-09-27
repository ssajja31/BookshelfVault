import { Col, Container, Offcanvas, Row, Stack } from "react-bootstrap";
import { useCart } from "../../hooks/CartContext";
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

  const totalItemsCount = cart?.items.length;

  return (
    <Offcanvas show={isCartOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header
        closeButton
        style={{
          backgroundImage:
            'url("https://madawaskadoors.ca/wp-content/uploads/2021/11/What-Is-Oak-Wood-The-Complete-Guide-To-Solid-Oak-Wood.jpeg")',
        }}
      >
        <Offcanvas.Title className="fw-bold">Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3} className="d-flex align-items-center">
          <Stack>
            {cart?.items.map((item) => (
              <Col key={cart.id}>
                <img
                  src={item.thumbnail}
                  style={{
                    width: "100px",
                    height: "120px",
                  }}
                />
                <div className="fw-bolder">
                  {item.title} by {item.author}
                </div>
                <div className="mb-5">x{item.quantity}</div>
              </Col>
            ))}
          </Stack>
        </Stack>
        <p className="ms-auto fw-bold fs-5">
          Total Items in Cart: {totalItemsCount}
        </p>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
