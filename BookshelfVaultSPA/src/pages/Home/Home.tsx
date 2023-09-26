import { useEffect, useState } from "react";
import { Book } from "../../models/book";
import { Category } from "../../models/category";

import Catalog from "../../Components/Catalog/Catalog";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import agent from "../../Api/agent";

const Home: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    agent.Catalog.books()
      .then((books) => setBooks(books))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    agent.Catalog.categories()
      .then((categories) => setCategories(categories))
      .catch((error) => console.log(error));
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
