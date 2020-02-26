import React from "react";
import { NavLink } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";
import useBodyClass from "../../utils/useBodyClass";
import "./style.css";
import API from "../../utils/API";
import * as ACTIONS from "../../utils/actions";
const Nav = () => {

  const [state, dispatch] = useStoreContext();
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
      <button className="nav-button" onClick={onLogout}>Logout</button>
    );
  }

  const getNonUserOptions = () => {
    return (
      <React.Fragment>
        <NavLink exact className="nav-link" activeClassName="active" to="/signup">Signup</NavLink>
        <NavLink exact className="nav-link" activeClassName="active" to="/login">Login</NavLink>
      </React.Fragment>
    );
  }

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      {state.loading ?
        <NavLink className="navbar-brand ml-auto" to="/">Loading...</NavLink> :
        <React.Fragment>
          <button className="navbar-brand" onClick={toggleTheme}>Project 3</button>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="navbar-nav mr-auto">
              <NavLink exact className="nav-link" activeClassName="active" to="/home">Home</NavLink>
            </div>
            {state.username ? getUserOptions() : getNonUserOptions()}
          </div>
        </React.Fragment>
      }
    </nav>
  );
};

export default Nav;
