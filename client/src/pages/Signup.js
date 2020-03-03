import React from "react";
import SignupForm from "../components/forms/SignupForm";
import Parallax from "../components/Parallax";
import CallToAction from "../components/CallToAction";

function Signup() {
  return (
    <div>
      <SignupForm />
      <Parallax />
      <CallToAction />
    </div>
  );
}

export default Signup;
