import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Raiting from "./Raiting";
//import "../index.css";
function Product(props) {
  const { product } = props;
  return (
    <div className="product">
      <Card>
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.image}
            className="card-img-top"
            alt={product.name}
          />
        </Link>
        <Card.Body>
          <Link to={`/product/${product.slug}`}>
            <Card.Title>
              {" "}
              <p>{product.name}</p>{" "}
            </Card.Title>
          </Link>
          <Raiting
            raiting={product.raiting}
            numReviews={product.numReviews}
          ></Raiting>
          <Card.Text>${product.price}</Card.Text>
          <Button> Add to cart </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
export default Product;
