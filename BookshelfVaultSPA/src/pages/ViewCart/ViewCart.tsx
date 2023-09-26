import { useEffect, useState } from "react";
import { Category } from "../../models/category";

import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import "../pages.css";

const ViewCart: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    fetch("https://localhost:7267/api/Categories")
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);
  return (
    <>
      <Navbar categories={categories} />
      <Header headerText="View Cart Page" subText="" />
      <div
        className="py-5 background"
        style={{
          backgroundImage:
            'url("https://madawaskadoors.ca/wp-content/uploads/2021/11/What-Is-Oak-Wood-The-Complete-Guide-To-Solid-Oak-Wood.jpeg")',
        }}
      ></div>
      <Footer />
    </>
  );
};

export default ViewCart;
