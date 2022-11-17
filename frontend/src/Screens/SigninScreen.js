import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
export default function SignInScreen() {
  const { search } = useLocation;
  const redirecturl = new URLSearchParams(search).get("redirect");
  const redirect = redirecturl ? redirecturl : "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submithandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/users/signin", {
        email,
        password,
      });
      console.log(data);
    } catch (error) {}
  };
  return (
    <Container className="small-container">
      <Helmet>
        <title> Sign In </title>
      </Helmet>
      <Form onSubmit={submithandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label> Email </Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label> Email </Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit"> Sign In </Button>
        </div>
        <div className="mb-3">
          New customer ?
          <Link to={`/signup?/redirect=${redirect}`}>
            Create Your New Account{" "}
          </Link>
        </div>
      </Form>
    </Container>
  );
}
