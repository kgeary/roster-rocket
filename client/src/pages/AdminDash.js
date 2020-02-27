import React from "react";
import { Col, Row, Container } from "../components/Grid";
import { useStoreContext } from "../utils/GlobalState";

function AdminDash() {
  const [state, dispatch] = useStoreContext();

  return (
    <Container fluid>
      <Row>
        <Col size="md-6">
          <h1>Admin Dashboard</h1>
        </Col>
        <Col size="md-6 sm-12">
          <h3>Dashboard data will go here</h3>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDash;
