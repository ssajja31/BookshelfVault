import { Col, Offcanvas, Stack } from "react-bootstrap";
import { useCart } from "../../hooks/CartContext";
import { useAppSelector } from "../../Reducers/configureStore";

type CartProps = {
  isCartOpen: boolean;
};

export default function Cart({ isCartOpen }: CartProps) {
  const { closeCart } = useCart();
  const { cart } = useAppSelector((state) => state.cart);

  const totalItemsCount = cart?.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = cart?.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

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
                <div>
                  <span className="fw-bolder">{item.title}</span>
                  <span> By </span>
                  <span className="fw-bolder">{item.author}</span>
                </div>
                <div className="mb-5">
                  ${item.price} x{item.quantity}
                </div>
              </Col>
            ))}
          </Stack>
        </Stack>
        <p className="ms-auto fw-bold fs-5">
          Total Items in Cart: {totalItemsCount}
        </p>
        <p className="ms-auto fw-bold fs-5">
          Total Price: ${totalPrice?.toFixed(2)}
        </p>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
