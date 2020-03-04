import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
      <Container fluid>
        <h1>Loading Course Data...</h1>
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
    <Container>
      {course ? (
        <React.Fragment>
          <div className='gap' />
          <h1>Course Page {course ? course.title : null}</h1>
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
          status
        )}
      <div className="gap" />
    </Container>
  );
}

export default Course;
