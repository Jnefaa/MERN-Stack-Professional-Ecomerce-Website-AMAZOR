import axios from "axios";
import { useContext, useState } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Store } from "./Store";

export default function CartScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const updateCartHandler = async (item, qauntity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < qauntity) {
      window.alert("Sorry product is out of stock ");
    } else return qauntity;

    //console.log("quantity ", qauntity);
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity: 1 },
    });
  };
  /*
  const [dataitem, setdataitem] = useState(updateCartHandler);

  const removeitem = () => {
    setdataitem((current) =>
      current.filter((dataitem) => {
        return dataitem._id !== 2;
      })
    );
  };*/

  const removeItemHandler = (item) => {
    ctxDispatch({
      type: "CART_REMOVE_ITEM",
      payload: { item },
    });
  };
  return (
    <div>
      <Helmet>
        <title> Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart </h1>
      <Row>
        <Col md={9}>
          {cartItems.length === 0 ? (
            <h1>
              Cart is empty . <Link to="/"> Go shopping </Link>
            </h1>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-item-center">
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>
                      <Link to={`/product/${item.slug}`}> {item.name} </Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        variant="light"
                        onClick={() =>
                          updateCartHandler(item, item.qauntity - 1)
                        }
                        disabled={item.quantity === 1}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>

                      <Button
                        variant="light"
                        onClick={() =>
                          updateCartHandler(item, item.qauntity + 1)
                        }
                        disabled={item.quantity === item.countInStock}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={3}>${item.price} </Col>
                    <Col>
                      <Button
                        onClick={() => removeItemHandler(item)}
                        variant="light"
                        disabled={item.quantity === 1}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>

                    <Col md={5}>
                      <h3>
                        subtotal (
                        {cartItems.reduce(
                          (qauntity, price) => item.qauntity * item.price,
                          0
                        )}
                        ){" "}
                      </h3>
                      <Button
                        type="button"
                        variant="primary"
                        disabled={cartItems.length === 0}
                      >
                        prceed to Checkout
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
    </div>
  );
}
