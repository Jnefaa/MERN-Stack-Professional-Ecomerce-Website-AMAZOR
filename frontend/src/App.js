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
function App() {
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
              <LinkContainer to="/contact-us">
                <Navbar.Brand>contact us </Navbar.Brand>
              </LinkContainer>
            </Container>
          </Navbar>
        </header>
        <main>
          <Routes>
            <Route path="/product/:slug" element={<ProductScreen />} />
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </main>
        <footer bg="dark">
          <div ClassName="text-center bg=dark"> All right reserved </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
