import React, { useEffect, useState } from "react";
import { Container } from "../components/Grid";
import { useStoreContext } from "../utils/GlobalState";
import CardParent from "../components/CardParent";
import API from "../utils/API";
import * as ACTIONS from "../utils/actions";
import { Redirect } from "react-router-dom";

function ParentDash() {
  const [state, dispatch] = useStoreContext();
  const [parent, setParent] = useState(null);

  const loadData = () => {
    dispatch({ type: ACTIONS.LOADING });
    API.getUser(true)
      .then(res => {
        setParent(res.data);
      })
      .then(() => {
        return API.getAllCourses();
      })
      .then(res => {
        dispatch({ type: ACTIONS.SET_COURSES, value: res.data });
      })
      .catch(err => {
        console.log("Error Getting Current user", err);
        setParent(undefined);
      })
      .finally(() => {
        dispatch({ type: ACTIONS.DONE });
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const LoadScreen = () => {
    return (
      <Container>
        <div className='big-gap' />
        <h1>Loading Parent Data...</h1>
      </Container>
    );
  };

  if (state.loading) {
    return LoadScreen();
  }

  if (!state.user) {
    return <Redirect to="/login" />
  }

  return (
    <div>
      <Container>
        <div className='big-gap' />
        {parent ? (
          <React.Fragment>
            <h1>Parent Dashboard</h1>
            <br />
            <CardParent
              user={parent}
              includeChildren={true}
              updateFunc={loadData}
              accordion={true}
              changePw={true}
            />
          </React.Fragment>
        ) : null}
      </Container>
      <div className='big-gap' />
    </div>
  );
}

export default ParentDash;
