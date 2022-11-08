import React from "react";
//import from "..";
//import "../index.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useReducer } from "react";
import axios from "axios";
import Product from "../Components/Product";
//import data from "../data";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
function HomeScreen() {
  // const [products, seProducts] = useState([]);
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    products: [],
    error: "",
  });
  useEffect(() => {
    const fetchdata = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        let result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: error.message });
      }

      //seProducts(result.data);
    };
    fetchdata();
  }, []);

  return (
    <div>
      <Row>
        <h1> Featured Products </h1>
        {loading ? (
          <div> loading .. </div>
        ) : error ? (
          <div> {error}</div>
        ) : (
          products.map((product) => (
            <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
              <Product product={product}> </Product>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
}
export default HomeScreen;
