import { Offcanvas } from "react-bootstrap";
import { useCart } from "../../context/CartContext";

type CartProps = {
  isCartOpen: boolean;
};

export default function Cart({ isCartOpen }: CartProps) {
  const { closeCart } = useCart();
  return (
    <Offcanvas show={isCartOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
    </Offcanvas>
  );
}
