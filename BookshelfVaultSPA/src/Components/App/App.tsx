import { Book } from "../../models/book";
import Catalog from "../Catalog/Catalog";
import Header from "../Header/Header";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetch("https://localhost:7267/api/Books")
      .then((response) => response.json())
      .then((data) => setBooks(data));
  }, []);

  return (
    <>
      <Header></Header>
      <Catalog books={books}></Catalog>
    </>
  );
}

export default App;
