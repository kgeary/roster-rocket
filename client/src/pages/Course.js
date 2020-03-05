import React, { useEffect, useState } from "react";
import { useParams, Redirect } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { useStoreContext } from "../utils/GlobalState";
import CardCourse from "../components/CardCourse";
import API from "../utils/API";
import * as ACTIONS from "../utils/actions";

function Course() {
  const [state, dispatch] = useStoreContext();
  const [course, setCourse] = useState(null);
  const [status, setStatus] = useState(null);
  const { id } = useParams();

  const loadData = () => {
    dispatch({ type: ACTIONS.LOADING });
    API.getCourseById(id)
      .then(res => {
        console.log("GET COURSE BY ID " + id, res.data);
        setCourse(res.data);
        if (!res.data) {
          throw new Error("Unable to Find Course");
        }
      })
      .then(() => {
        return (state.user && state.user.isAdmin) ?
          API.getAllStudents() :
          API.getUserStudents();
      })
      .then(res => {
        dispatch({ type: ACTIONS.SET_STUDENTS, value: res.data });
      })
      .catch(err => {
        setStatus(<h1>{err.message}</h1>);
        setCourse(undefined);
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
        <h1>Loading Course Data...</h1>
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
      {course ? (
        <React.Fragment>
          <div className='big-gap' />
          <h1>Class Details</h1>
          <Row>
            <Col size='md-12'>
              <CardCourse
                course={course}
                updateFunc={loadData}
                accordion={true}
              />
            </Col>
          </Row>
        </React.Fragment>
      ) : (
          <div className="gap" >
            {status}
          </div>
        )}
      <div className="big-gap" />
    </Container>
  );
}

export default Course;
