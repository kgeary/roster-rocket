import React, { useEffect } from "react";
import SignupForm from "../components/forms/SignupForm";
import Parallax from "../components/Parallax";
import CallToAction from "../components/CallToAction";

function Signup() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <div>
      <SignupForm />
      <Parallax />
      <CallToAction />
    </div>
  );
}

export default Signup;
