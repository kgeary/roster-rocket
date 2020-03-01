import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { useStoreContext } from "../utils/GlobalState";
import CardParent from "../components/CardParent";
import API from "../utils/API";
import * as ACTIONS from "../utils/actions";

function ParentDash() {
  const [state, dispatch] = useStoreContext();
  const [parent, setParent] = useState(null);

  const loadData = () => {
    dispatch({ type: ACTIONS.LOADING });
    API.getUser(true)
      .then(res => {
        console.log("GET Current user", res.data);
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
  }

  useEffect(() => {
    loadData();
  }, []);


  const LoadScreen = () => {
    return (
      <Container fluid>
        <h1>Loading Parent Data...</h1>
      </Container>
    )
  }


  if (state.loading) {
    return LoadScreen();
  }

  if (!state.user) {
    return (
      <Container fluid>
        <h1>You must be logged in to access this page.</h1>
      </Container>
    )
  }

  return (
    <Container fluid>
      {
        parent ?
          <React.Fragment>
            <h1>Parent Dashboard {parent ? parent.email : null}</h1>
            <Row>
              <Col size='md-12'>
                <CardParent user={parent} includeChildren={true} updateFunc={loadData} accordion={true} changePw={true} />
              </Col>
            </Row>
          </React.Fragment> : null
      }
    </Container>
  );
}

export default ParentDash;
