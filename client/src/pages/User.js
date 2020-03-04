import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { useStoreContext } from "../utils/GlobalState";
import CardParent from "../components/CardParent";
import API from "../utils/API";
import * as ACTIONS from "../utils/actions";

function User() {
  const [state, dispatch] = useStoreContext();
  const [parent, setParent] = useState(null);
  const [status, setStatus] = useState(null);
  const { id } = useParams();

  const loadData = () => {
    dispatch({ type: ACTIONS.LOADING });
    API.getUserById(id)
      .then(res => {
        console.log("GET USER BY ID " + id, res.data);
        setParent(res.data);
        if (!res.data) {
          throw new Error("Unable to Find User");
        }
      })
      .then(() => {
        return API.getAllCourses();
      })
      .then(res => {
        dispatch({ type: ACTIONS.SET_COURSES, value: res.data });
      })
      .catch(err => {
        setStatus(<h1>{err.message}</h1>);
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
      <Container fluid>
        <h1>Loading Parent Data...</h1>
      </Container>
    );
  };

  if (state.loading) {
    return LoadScreen();
  }

  if (!state.user) {
    return (
      <Container fluid>
        <div className="gap" />
        <h1>You must be logged in to access this page.</h1>
      </Container>
    );
  }

  return (
    <Container fluid>
      {parent ? (
        <React.Fragment>
          <div className='gap' />
          <h1>User Page {parent ? parent.email : null}</h1>
          <Row>
            <Col size='md-12'>
              <CardParent
                user={parent}
                includeChildren={true}
                updateFunc={loadData}
                accordion={true}
              />
            </Col>
          </Row>
        </React.Fragment>
      ) :
        <React.Fragment>
          <div className="gap" />
          {status}
          <div className="gap" />
        </React.Fragment>
      }
    </Container>
  );
}

export default User;
