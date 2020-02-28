import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NoMatch from "./pages/NoMatch";
import AdminDash from "./pages/AdminDash";
import ParentDash from "./pages/ParentDash";
import Nav from "./components/Nav";
import PasswordChange from './pages/PasswordChange';
import PasswordReset from './pages/PasswordReset';

import { StoreProvider } from "./utils/GlobalState";

function App() {

  return (
    <StoreProvider>
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/admindash" component={AdminDash} />
            <Route exact path="/parentdash" component={ParentDash} />
            <Route exact path="/changePassword" component={PasswordChange} />
            <Route exact path="/resetPassword" component={PasswordReset} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    </StoreProvider>
  );
}

export default App;
