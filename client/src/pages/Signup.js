import React from "react";
import SignupForm from "../components/forms/SignupForm";
import Parallax from "../components/Parallax";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";

function Signup() {
  return (
    <div>
      <SignupForm />
      <Parallax />
      <CallToAction />
      <Footer />
    </div>
  );
}

export default Signup;
