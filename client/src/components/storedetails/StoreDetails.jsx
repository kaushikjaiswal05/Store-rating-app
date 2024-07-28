import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./storedetails.css";

const StoreDetails = () => {
  const { id } = useParams();
  const [store, setStore] = useState(null);
  const [rating, setRating] = useState("");
  const [userRating, setUserRating] = useState(null);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/stores/${id}`);
        setStore(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchUserRating = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: { "x-auth-token": token },
        };
        const res = await axios.get(`http://localhost:5000/api/stores/${id}`);
        const userRating = res.data.ratings.find(
          (r) => r.user === localStorage.getItem("user_id")
        );
        if (userRating) {
          setUserRating(userRating.rating);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchStore();
    fetchUserRating();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { "x-auth-token": token },
      };
      const res = await axios.put(
        `http://localhost:5000/api/stores/${id}/rate`,
        { rating },
        config
      );
      setStore(res.data);
      setUserRating(rating);
    } catch (err) {
      console.error(err);
    }
  };

  if (!store) {
    return <div>Loading...</div>;
  }

  return (
    <Container fluid className="store-detail-container">
      <Row>
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title>{store.name}</Card.Title>
              <Card.Text>
                <strong>Address:</strong> {store.address}
              </Card.Text>
              <Card.Text>
                <strong>Overall Rating:</strong> {store.rating}
              </Card.Text>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="rating">
                  <Form.Label>Submit Your Rating</Form.Label>
                  <Form.Control
                    as="select"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    required
                  >
                    <option value="">Select Rating</option>
                    {[1, 2, 3, 4, 5].map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                  Submit Rating
                </Button>
              </Form>
              {userRating && (
                <Card.Text className="mt-3">
                  <strong>Your Rating:</strong> {userRating}
                </Card.Text>
              )}
              <Link to="/stores">
                <Button variant="primary" className="mt-3">
                  Back to Store List
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StoreDetails;
