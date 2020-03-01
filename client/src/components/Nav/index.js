import React, { useEffect } from "react";
import { NavLink, Link, Redirect } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";
import useBodyClass from "../../utils/useBodyClass";
import "./style.css";
import Logo from "./rocket.svg";
import API from "../../utils/API";
import * as ACTIONS from "../../utils/actions";
const Nav = (props) => {

  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    // On First Load - Get the user from server
    API.getUser()
      .then(res => {
        dispatch({ type: ACTIONS.SET_USER, user: res.data });
      })
      .catch(err => {
        dispatch({ type: ACTIONS.SET_USER, user: undefined });
      });
  }, []);

  useBodyClass(state.theme);

  const toggleTheme = () => {
    const newTheme = state.theme === "dark" ? "light" : "dark";
    console.log(newTheme);
    dispatch({ type: ACTIONS.SET_THEME, theme: newTheme });
  }

  const onLogout = () => {
    console.log("on logout");
    API.logoutUser()
      .then(res => {
        dispatch({ type: ACTIONS.SET_USER, user: undefined });
      })
      .catch(err => {
        console.log(err);
      })
  }

  const getUserOptions = () => {
    return (
      <React.Fragment>
        {
          state.user && state.user.isAdmin ?
            <NavLink className="nav-link" activeClassName="active" to="/admin">Admin</NavLink> :
            null
        }
        <NavLink className="nav-link" activeClassName="active" to="/parent">My Profile</NavLink>
        <button className="nav-link btn" onClick={onLogout}>Logout</button>
      </React.Fragment>
    );
  }

  const getNonUserOptions = () => {
    return (
      <React.Fragment>
        <NavLink className="nav-link" activeClassName="active" to="/signup">Signup</NavLink>
        <NavLink className="nav-link" activeClassName="active" to="/login">Login</NavLink>
      </React.Fragment>
    );
  }

  const loggingOut = () => {
    // setLoggedOut(false);
    return <Redirect to="/" />
  }

  if (state.loading) {
    return (
      <nav className="navbar navbar-expand-md navbar-light bg-warning">
        <Link className="navbar-brand" to="/home">
          <img src={Logo} width="30" height="30" alt="" className="brand-logo" /><span className="brand">Roster Rocket</span>
        </Link>
        <NavLink className="navbar-brand ml-auto" to="/">Loading...</NavLink>
      </nav>
    )
  }

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-warning">
      <Link className="navbar-brand" to="/home">
        <img src={Logo} width="30" height="30" alt="" className="brand-logo" /><span className="brand">Roster Rocket</span>
      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <div className="navbar-nav mr-auto">
          {/* Left Aligned Links */}
        </div>
        {/* Right Aligned Links */}
        {state.username ? getUserOptions() : getNonUserOptions()}
        <button className="btn change-theme" onClick={toggleTheme}>{"Theme " + state.theme}</button>
      </div>
    </nav >
  );
};

export default Nav;
