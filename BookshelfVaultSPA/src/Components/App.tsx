import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "../context/CartContext";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";

function App() {
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
