import React, { useEffect, useState } from "react";
import { useParams, Redirect } from "react-router-dom";
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
        //console.log("GET USER BY ID " + id, res.data);
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
      <Container>
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
    <Container>
      {parent ? (
        <React.Fragment>
          <div className='big-gap' />
          <h1>{parent ? parent.name.split(" ")[1] : null} Family Profile</h1>
          <br />
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
          <div className="big-gap" />
        </React.Fragment>
      }
    </Container>
  );
}

export default User;
