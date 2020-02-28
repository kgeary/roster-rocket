import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { useStoreContext } from "../utils/GlobalState";
import CardParent from "../components/CardParent";
import API from "../utils/API";
import * as ACTIONS from "../utils/actions";

function ParentDash() {
  const [state, dispatch] = useStoreContext();
  const [parent, setParent] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch({ type: ACTIONS.LOADING });
    API.getUser(true)
      .then(res => {
        console.log("GET Current user", res.data);
        setParent(res.data);
      })
      .catch(err => {
        console.log("Error Getting Current user", err);
        setParent(undefined);
      })
      .finally(() => {
        dispatch({ type: ACTIONS.DONE });
        setLoaded(true);
      });
  }, []);


  const LoadScreen = () => {
    return (
      <Container fluid>
        <h1>Loading Parent Data...</h1>
      </Container>
    )
  }


  if (!loaded) {
    return LoadScreen();
  }

  if (!parent) {
    return <Redirect to="/login" />;
  }

  return (
    <Container fluid>
      <h1>Parent Dashboard {parent ? parent.email : null}</h1>
      <Row>
        <Col size='md-12'>
          <CardParent user={parent} />
        </Col>
      </Row>
    </Container>
  );
}

export default ParentDash;
