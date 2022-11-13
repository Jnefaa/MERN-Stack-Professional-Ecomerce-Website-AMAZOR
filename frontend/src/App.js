import logo from "./logo.svg";
import "./App.css";
import "react-bootstrap";

//import data from "./data";
import HomeScreen from "./Screens/HomeScreen";
//import { ProductScreen } from "./Screens/ProductScreen";
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import ProductScreen from "./Screens/ProductScreen";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { Badge, Nav } from "react-bootstrap";
import { useContext } from "react";
import { Store } from "./Screens/Store";
import CartScreen from "./Screens/CartScreen";
import SignInScreen from "./Screens/SigninScreen";
function App() {
  const { state } = useContext(Store);
  const { cart } = state;

  return (
    <BrowserRouter ClassName="d-flex flex-column site-container">
      <div
        className="d-flex flex-column site-container"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>AmazoR</Navbar.Brand>
              </LinkContainer>

              <LinkContainer to="/signin">
                <Navbar.Brand>Sign In </Navbar.Brand>
              </LinkContainer>
              <LinkContainer to="/contact-us">
                <Navbar.Brand>Contact us </Navbar.Brand>
              </LinkContainer>
              <Nav className="me-auto">
                <Link to="/cart" className="nav-Link">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.length}
                    </Badge>
                  )}
                </Link>
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />}></Route>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/signin" element={<SignInScreen></SignInScreen>} />
            </Routes>
          </Container>
        </main>
        <footer bg="dark">
          <div ClassName="text-center bg=dark"> All right reserved </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
