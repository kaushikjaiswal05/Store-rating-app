import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "./storelist.css";

const StoreList = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/stores");
        setStores(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStores();
  }, []);

  return (
    <Container fluid className="store-list-container">
      <Row>
        <Col md={12}>
          <h2 className="text-center mb-4">Stores</h2>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Ratings</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {stores.map((store) => (
                <tr key={store._id}>
                  <td>{store.name}</td>
                  <td>{store.address}</td>
                  <td>{store.rating}</td>
                  <td>
                    <Link to={`/stores/${store._id}`}>
                      <Button variant="primary">View Details</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default StoreList;
