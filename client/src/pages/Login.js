import React, { useEffect } from "react";
import LoginForm from "../components/forms/LoginForm";
import Parallax from "../components/Parallax";
import CallToAction from "../components/CallToAction";



function Login() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <div>
      <LoginForm />
      <Parallax />
      <CallToAction />
    </div>
  );
}

export default Login;
