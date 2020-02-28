import React from "react";
import { useParams } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { useStoreContext } from "../utils/GlobalState";
import CardParent from "../components/CardParent";

function ParentDash() {
  const [state, dispatch] = useStoreContext();

  const { id } = useParams();

  return (
    <Container fluid>
      <Row>
        <Col size="md-6">
          <h1>Parent Dashboard</h1>
        </Col>
        <Col size="md-6 sm-12">
          <h3>Dashboard data will go here</h3>
        </Col>
        <CardParent />



      </Row>
    </Container>
  );
}

export default ParentDash;
