import React from "react";
import Jumbotron from "../components/Jumbotron";
import { Col, Row, Container } from "../components/Grid";

function NotAuthorized() {
  return (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h1>401 Not Authorized</h1>
            <h1>
              User is not Authorized
            </h1>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
}

export default NotAuthorized;
