import { Book } from "../models/book";
import Catalog from "./Catalog/Catalog";
import Header from "./Header/Header";
import BookCard from "./BookCard/BookCard";
import Footer from "./Footer/Footer";
import { useEffect, useState } from "react";

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetch("https://localhost:7267/api/Books")
      .then((response) => response.json())
      .then((data) => setBooks(data));
  }, []);

  return (
    <>
      <Header />
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
