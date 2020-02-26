import React, { useEffect } from "react";
import { Col, Row, Container } from "../components/Grid";
import { useStoreContext } from "../utils/GlobalState";

function Home() {
  const [state, dispatch] = useStoreContext();

  return (
    <Container fluid>
      <h1>Hi {state.username ? state.username : "Guest User"}</h1>
      <Row>
        <Col size="md-6">
          <h1>One day we will have content</h1>
        </Col>
        <Col size="md-6 sm-12">
          <h1>And It will be glorious</h1>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
