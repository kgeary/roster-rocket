import React, { useContext, useReducer, createContext } from "react";
import * as ACTIONS from "./actions";

const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  const newState = { ...state };
  switch (action.type) {

    // LOADING
    case ACTIONS.LOADING:
      newState.loading = true;
      return newState;

    case ACTIONS.DONE:
      newState.loading = false;
      return newState;

    // SET THEME
    case ACTIONS.SET_THEME:
      newState.theme = action.theme;
      localStorage.setItem("theme", action.theme);
      return newState;

    case ACTIONS.SET_USER:
      if (action.user) {
        newState.username = action.user.name || action.user.email;
        newState.email = action.user.email;
      } else {
        newState.username = undefined;
        newState.email = undefined;
      }
      sessionStorage.setItem("username", newState.username);
      sessionStorage.setItem("email", newState.email);
      return newState;

    default:
      return newState;
  }
};

const StoreProvider = ({ value = [], ...props }) => {
  const initialState = {
    loading: false,
    theme: localStorage.getItem("theme") || "dark",
    username: sessionStorage.getItem("username") || "",
    email: sessionStorage.getItem("email") || "",
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => { return useContext(StoreContext); };


export { StoreProvider, useStoreContext };