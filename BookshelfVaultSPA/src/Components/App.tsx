import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "../hooks/CartContext";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import { useAppDispatch } from "../Reducers/configureStore";
import { useEffect } from "react";
import { getCookie } from "../Helpers/helper";
import agent from "../Api/agent";
import { setShoppingCart } from "../Reducers/CartSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const buyerId = getCookie("buyerId");
    if (buyerId) {
      agent.Cart.get()
        .then((cart) => () => dispatch(setShoppingCart(cart)))
        .catch((error) => console.log(error));
    }
  }, [dispatch]);

  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
