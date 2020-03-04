import React, { useEffect } from "react";
import { useStoreContext } from "../utils/GlobalState";
import * as ACTIONS from "../utils/actions";
import Hero from "../components/Hero";
import Benefit from "../components/Benefit";
import CallToAction from "../components/CallToAction";
import Parallax from "../components/Parallax";

function Home() {
  const [, dispatch] = useStoreContext();

  useEffect(() => {
    dispatch({ type: ACTIONS.DONE });
    console.log("USE EFFECT");
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
