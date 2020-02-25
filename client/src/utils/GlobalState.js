import React, { useContext, useReducer, createContext } from "react";

const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  const newState = { ...state };
  switch (action.type) {

    default:
      return newState;
  }
};

const StoreProvider = ({ value = [], ...props }) => {
  const initialState = {
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => { return useContext(StoreContext); };


export { StoreProvider, useStoreContext };