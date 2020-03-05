import React from "react";
import Jumbotron from "../components/Jumbotron";
import { Col, Row, Container } from "../components/Grid";

function NotAuthorized() {
  return (
    <Container>
      <div className='gap' />

      <Row>
        <Col size='md-12'>
          <Jumbotron>
            <h1>401 Not Authorized</h1>
            <h1>User is not Authorized</h1>
          </Jumbotron>
        </Col>
      </Row>
      <div className='big-gap' />
    </Container>
  );
}

export default NotAuthorized;
