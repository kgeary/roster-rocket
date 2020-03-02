import React, { useEffect } from "react";
import { Col, Row, Container } from "../components/Grid";
import { useStoreContext } from "../utils/GlobalState";
import * as ACTIONS from "../utils/actions";
import Hero from "../components/Hero";
import Benefit from "../components/Benefit";
import Footer from "../components/Footer";
import CallToAction from "../components/CallToAction";
import Parallax from "../components/Parallax";

function Home() {
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    dispatch({ type: ACTIONS.DONE });
  }, []);

  if (!state.user) {
    return (
      <div>
        <Hero />
        <Benefit />
        <Parallax />
        <CallToAction />
        <Footer />
      </div>
    );
  }

  return (
    <Container fluid>
      <Row>
        <Col size='12'>
          <h1>Hi {state.username ? state.username : "Guest User"}</h1>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
