import React from "react";
import LoginForm from "../components/forms/LoginForm";
import Parallax from "../components/Parallax";
import CallToAction from "../components/CallToAction";

import Footer from "../components/Footer";

function Login() {
  return (
    <div>
      <LoginForm />
      <Parallax />
      <CallToAction />
    </div>
  );
}

export default Login;
