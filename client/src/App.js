import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NoMatch from "./pages/NoMatch";
import NotAuthorized from "./pages/NotAuthorized";
import AdminDash from "./pages/AdminDash";
import ParentDash from "./pages/ParentDash";
import User from "./pages/User";
import Course from "./pages/Course";
import Student from "./pages/Student";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import PasswordChange from "./pages/PasswordChange";
import PasswordReset from "./pages/PasswordReset";
import { StoreProvider } from "./utils/GlobalState";
function App() {
  return (
    <StoreProvider>
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/home' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/admin' component={AdminDash} />
            <Route exact path='/parent' component={ParentDash} />
            <Route exact path='/parent/:id' component={User} />
            <Route exact path='/course/:id' component={Course} />
            <Route exact path='/student/:id' component={Student} />
            <Route exact path='/changePassword' component={PasswordChange} />
            <Route exact path='/resetPassword' component={PasswordReset} />
            <Route exact path='/notauthorized' component={NotAuthorized} />
            <Route component={NoMatch} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </StoreProvider>
  );
}

export default App;
