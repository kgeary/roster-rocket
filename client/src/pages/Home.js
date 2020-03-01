import React, { useEffect } from "react";
import { Col, Row, Container } from "../components/Grid";
import Hero from "../components/Hero";
import { useStoreContext } from "../utils/GlobalState";
import * as ACTIONS from "../utils/actions";
function Home() {
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    dispatch({ type: ACTIONS.DONE });
  }, []);

  if (!state.user) {
    return <Hero />
  }

  return (
    <Container fluid>
      <Row>
        <Col size="12">
          <h1>Hi {state.username ? state.username : "Guest User"}</h1>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
