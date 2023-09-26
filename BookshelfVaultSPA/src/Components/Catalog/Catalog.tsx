import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { Book } from "../../models/book";
import BookCard from "../BookCard/BookCard";

interface CatalogProps {
  books: Book[];
}

const Catalog: React.FC<CatalogProps> = ({ books }) => {
  return (
    <Container>
      <Row>
        {books.map((book) => (
          <Col key={book.id} xs={12} sm={6} md={4} lg={3}>
            <BookCard book={book} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Catalog;
