import { ListGroup } from "react-bootstrap";
import { Book } from "../../models/book";

interface CatalogProps {
  books: Book[];
}

const Catalog: React.FC<CatalogProps> = ({ books }) => {
  return (
    <ListGroup>
      {books.map((book) => (
        <ListGroup.Item>
          {book.title} - {book.price} - {book.subtitle} - {book.author}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default Catalog;
