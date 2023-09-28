import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "../hooks/CartContext";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import { useAppDispatch } from "../Reducers/configureStore";
import { useCallback, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { fetchCurrentUser } from "../Reducers/AccountSlice";
import { fetchCartAsync } from "../Reducers/CartSlice";

function App() {
  const dispatch = useAppDispatch();

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchCartAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp();
  }, [initApp]);

  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </CartProvider>
  );
}

export default App;
