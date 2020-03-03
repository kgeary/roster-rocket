import React, { useEffect } from "react";
import { Col, Row, Container } from "../components/Grid";
import { useStoreContext } from "../utils/GlobalState";
import * as ACTIONS from "../utils/actions";
import Hero from "../components/Hero";
import Benefit from "../components/Benefit";
import CallToAction from "../components/CallToAction";
import Parallax from "../components/Parallax";

function Home() {
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    dispatch({ type: ACTIONS.DONE });
  }, []);

  return (
    <div>
      <Hero />
      <Benefit />
      <Parallax />
      <CallToAction />
    </div>
  );
}

export default Home;
