import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { useStoreContext } from "../utils/GlobalState";
import CardCourse from "../components/CardCourse";
import API from "../utils/API";
import * as ACTIONS from "../utils/actions";

function Courses() {
  const [state, dispatch] = useStoreContext();
  const [courses, setCourses] = useState([]);
  const [status, setStatus] = useState(null);
  const [search, setSearch] = useState("");

  const loadData = () => {
    dispatch({ type: ACTIONS.LOADING });
    API.getAllCourses()
      .then(res => {
        console.log("GET COURSES", res.data);
        setCourses(res.data);
        if (!res.data) {
          throw new Error("Unable to Find Course Data!");
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
        setCourses([]);
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
    return <Redirect to="/login" />
  }

  return (
    <Container>
      {courses ? (
        <React.Fragment>
          <div className='gap' />
          <h1>Courses Page</h1>
          <Row>
            <Col size='md-12'>
              <label htmlFor="search" className="mr-2">Filter Classes By Title:</label>
              <input type="text" id="search" onChange={(event) => setSearch(event.target.value)} value={search} />
              {
                courses.filter(c => c.title.toLowerCase().includes(search.toLowerCase())).map(course => (
                  <div className="card pt-0" key={course.id}>
                    <div className="card-body">
                      <CardCourse
                        course={course}
                        updateFunc={loadData}
                        accordion={true}
                      />
                    </div>
                  </div>
                ))
              }
            </Col>
          </Row>
        </React.Fragment>
      ) : (
          <div className="gap" >
            {status}
          </div>
        )}
      <div className="gap" />
    </Container>
  );
}

export default Courses;
