import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContextProvider';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password, navigate);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Container fluid className="login-container d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col className ="login-form p-5" md={12}>
          <h2 className="text-center mb-4 text-light">Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label className='text-light mb-1 mt-3 '>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label className='text-light mb-1 mt-3'>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button id="login-btn" variant="primary" type="submit" className="w-100 mt-3 px-4 py-2">
              Login
            </Button>
          </Form>
          <div className="nav-link text-center mt-3">
            <Link className="text-decoration-none text-light" to="/signup">Don't have an account? <span style={{fontWeight: '600'}}>Sign up</span></Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
