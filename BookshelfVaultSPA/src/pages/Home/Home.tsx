import { useEffect, useState } from "react";
import { Book } from "../../models/book";
import { Category } from "../../models/category";

import Catalog from "../../Components/Catalog/Catalog";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";

const Home: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("https://localhost:7267/api/Books")
      .then((response) => response.json())
      .then((data) => setBooks(data));
  }, []);

  useEffect(() => {
    fetch("https://localhost:7267/api/Categories")
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <>
      <Navbar categories={categories} />
      <Header
        headerText="Welcome to the Bookshelf Vault!"
        subText="A book e-commerce site"
      />
      <div
        className="py-5"
        style={{
          backgroundImage:
            'url("https://madawaskadoors.ca/wp-content/uploads/2021/11/What-Is-Oak-Wood-The-Complete-Guide-To-Solid-Oak-Wood.jpeg")',
        }}
      >
        <Catalog books={books}></Catalog>
      </div>
      <Footer />
    </>
  );
};

export default Home;
