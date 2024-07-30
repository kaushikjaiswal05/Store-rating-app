import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../AuthContextProvider";
import "./signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "NormalUser",
  });

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const { name, email, password, address } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData, navigate);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Container
      fluid
      className="signup-container d-flex justify-content-center align-items-center vh-100"
    >
      <Row>
        <Col className="signup-form py-3 px-5" md={12}>
          <h2 className="text-center text-light">Sign Up</h2>
          <Form onSubmit={handleSubmit} className="p-4">
            <Form.Group controlId="formBasicName">
              <Form.Label className="text-light mb-1 mt-2">Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label className="text-light mb-1 mt-2">
                Email address
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label className="text-light mb-1 mt-2">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicAddress">
              <Form.Label className="text-light mb-1 mt-2 ">Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                name="address"
                value={address}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button
              id="signup-btn"
              variant="primary"
              type="submit"
              className="w-100 mt-4"
            >
              Sign Up
            </Button>
            <div className="nav-link text-center mt-3">
              <Link className="text-decoration-none text-light" to="/">
                Go back to{" "}
                <span style={{ fontWeight: "600" }}>Login</span>
                {" "}Page
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
