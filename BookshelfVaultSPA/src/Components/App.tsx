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
      <Catalog books={books}></Catalog>
      <div
        className="py-5"
        style={{
          backgroundImage:
            'url("https://madawaskadoors.ca/wp-content/uploads/2021/11/What-Is-Oak-Wood-The-Complete-Guide-To-Solid-Oak-Wood.jpeg")',
        }}
      >
        <div className="container px-4 px-lg-5 mt-5">
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            <BookCard />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
