import React, { useEffect } from "react";
import { Col, Row, Container } from "../components/Grid";
import { useStoreContext } from "../utils/GlobalState";
import * as ACTIONS from "../utils/actions";
import Hero from "../components/Hero";
import Benefit from "../components/Benefit";
import Footer from "../components/Footer";
import CallToAction from "../components/CallToAction";



function Home() {
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    dispatch({ type: ACTIONS.DONE });
  }, []);

  return (
    <div>
    <Hero />
    <Benefit />
    <CallToAction />
    <Footer />
    </div>
  );
}

export default Home;
