import { useState } from "react";
import { Button, ButtonGroup, Dropdown } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../Reducers/configureStore";
import { logOut } from "../../Reducers/AccountSlice";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../Reducers/CartSlice";

export default function LoggedInMenu() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.account);
  const [showMenu, setShowMenu] = useState(false);

  const handleClick = (event: any) => {
    setShowMenu(!showMenu);
  };

  const handleLogOut = () => {
    dispatch(logOut());
    dispatch(clearCart());
    navigate("/");
  };

  const buttonStyle = {
    border: "none", // Remove the button outline
  };

  const boldText = {
    fontWeight: "bold", // Make the text bold
  };

  return (
    <>
      <ButtonGroup>
        <Button
          id="fade-button"
          variant="outline-dark"
          aria-controls={showMenu ? "fade-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={showMenu ? "true" : undefined}
          onClick={handleClick}
          style={{ ...buttonStyle, ...boldText }}
        >
          {user?.email}
        </Button>
        <Dropdown
          id="fade-menu"
          show={showMenu}
          onToggle={() => setShowMenu(!showMenu)}
        >
          <Dropdown.Toggle variant="transparent" id="dropdown-basic">
            {/* This empty span is necessary to prevent a console warning */}
            <span></span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleLogOut}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </ButtonGroup>
    </>
  );
}
