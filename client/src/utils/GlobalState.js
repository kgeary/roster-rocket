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
        newState.user = action.user;
        newState.username = action.user.email;
      } else {
        newState.user = undefined;
        newState.username = undefined;
      }
      sessionStorage.setItem("username", newState.username);
      return newState;

    case ACTIONS.SET_USERS:
      newState.users = action.value;
      return newState;

    case ACTIONS.SET_COURSES:
      newState.courses = action.value;
      return newState;

    case ACTIONS.SET_STUDENTS:
      newState.students = action.value;
      return newState;

    default:
      return newState;
  }
};

const StoreProvider = ({ value = [], ...props }) => {
  const initialState = {
    loading: false,
    theme: localStorage.getItem("theme") || "dark",
    user: undefined,
    username: sessionStorage.getItem("username") || "",
    users: [],
    courses: [],
    students: [],
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => { return useContext(StoreContext); };


export { StoreProvider, useStoreContext };