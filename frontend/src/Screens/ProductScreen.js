import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import { Badge, Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Rating from "../Components/Raiting";
import { Helmet } from "react-helmet-async";
import { Store } from "./Store";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
function ProductScreen() {
  const params = useParams();
  const { slug } = params;
  // const [products, seProducts] = useState([]);
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    loading: true,
    product: [],
    error: "",
  });
  useEffect(() => {
    const fetchdata = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        let result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: error.message });
      }

      //seProducts(result.data);
    };
    fetchdata();
  }, [slug]);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const addToCartHand = () => {
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, qauntity: 1 },
    });
  };
  return loading ? (
    <div>loading... </div>
  ) : error ? (
    <div> {error} </div>
  ) : (
    <div>
      <Row>
        <Col md={6}>
          {" "}
          <img className="img-large" src={product.image}></img>
        </Col>
        <Col md={5}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Helmet>
                    <title>{product.name}</title>
                  </Helmet>
                  <h1>{product.name}</h1>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    raiting={product.raiting}
                    numReviews={product.numReviews}
                  >
                    {" "}
                  </Rating>
                </ListGroup.Item>
                <ListGroup.Item> Price : $ {product.price} </ListGroup.Item>
                <ListGroup.Item>
                  {" "}
                  Description : {product.description}{" "}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col> Price : </Col>
                    <Col> {product.price} $ </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col> status : </Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg="success"> In stock </Badge>
                      ) : (
                        <Badge bg="dange">Out of stock</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button onClick={addToCartHand} variant="primary">
                        Add to cart
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ProductScreen;
