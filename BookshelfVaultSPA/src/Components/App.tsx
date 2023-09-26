import { Book } from "../models/book";
import Catalog from "./Catalog/Catalog";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { useEffect, useState } from "react";
import { Category } from "../models/category";

const App: React.FC = () => {
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
      <Header categories={categories} />
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

export default App;
