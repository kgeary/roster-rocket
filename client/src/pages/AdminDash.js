import React, { useEffect, useState, useRef } from "react";
import { Col, Row, Container } from "../components/Grid";
import { useStoreContext } from "../utils/GlobalState";
import * as ACTIONS from "../utils/actions";
import API from "../utils/API";
import CardParent from "../components/CardParent";
import CardCourse from "../components/CardCourse";
import CardStudent from "../components/CardStudent";
import AddCourseForm from "../components/forms/AddCourseForm";
import AddStudentForm from "../components/forms/AddStudentForm";
import AddModal from "../components/AddModal";
import { Redirect } from "react-router-dom";

function AdminDash() {
  const [state, dispatch] = useStoreContext();
  const [loaded, setLoaded] = useState(false);

  const setUsers = (val) => { dispatch({ type: ACTIONS.SET_USERS, value: val }); }
  const setCourses = (val) => { dispatch({ type: ACTIONS.SET_COURSES, value: val }); }
  const setStudents = (val) => { dispatch({ type: ACTIONS.SET_STUDENTS, value: val }); }

  const [userFilter, setUserFilter] = useState("");
  const userFilterRef = useRef("");

  const [courseFilter, setCourseFilter] = useState("");
  const courseFilterRef = useRef("");

  const [studentFilter, setStudentFilter] = useState("");
  const studentFilterRef = useRef("");

  const updateUsers = () => API.getAllUsers();
  const updateStudents = () => API.getAllStudents();
  const updateCourses = () => API.getAllCourses();

  const updateCoursesOnly = () => {
    dispatch({ type: ACTIONS.LOADING });
    updateUsers()
      .then(res => {
        setCourses(res.data);
      })
      .catch(err => {
        console.log("UPDATE ALL COURSES ERROR", err);
      }).finally(() => {
        dispatch({ type: ACTIONS.DONE });
        setLoaded(true);
      });
  }

  const updateStudentsOnly = () => {
    dispatch({ type: ACTIONS.LOADING });
    updateStudents()
      .then(res => {
        setStudents(res.data);
      })
      .catch(err => {
        console.log("UPDATE ALL STUDENTS ALL ERROR", err);
      }).finally(() => {
        dispatch({ type: ACTIONS.DONE });
        setLoaded(true);
      });
  }

  const updateAll = () => {
    console.log("ADMIN LOAD DATA");
    dispatch({ type: ACTIONS.LOADING });
    Promise.all([updateUsers(), updateCourses(), updateStudents()]).then((res) => {
      console.log("PROMISE COMPLETE");
      const [userData, courseData, studentData] = res.map(i => i.data);
      setUsers(userData);
      setCourses(courseData);
      setStudents(studentData);
    }).catch(err => {
      console.log("PROMISE ALL ERROR", err);
    }).finally(() => {
      dispatch({ type: ACTIONS.DONE });
      setLoaded(true);
    });
  }

  useEffect(() => {
    updateAll();
  }, []);

  useEffect(() => {
  }, [userFilter]);

  useEffect(() => {
  }, [courseFilter]);

  useEffect(() => {
  }, [studentFilter]);

  const onFilterChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case "userFilter":
        setUserFilter(value);
        break;
      case "courseFilter":
        setCourseFilter(value);
        break;
      case "studentFilter":
        setStudentFilter(value);
        break;
      default:
        throw new Error("Unknown filter");
    }
  };


  if (state.loading || !loaded) {
    return (
      <Container fluid>
        <h1>Loading Admin Data...</h1>
      </Container>
    )
  }
  if (!state.user || !state.user.isAdmin) {
    return <Redirect to="/" />
  }

  return (
    <Container fluid>
      <h1>Admin Dashboard</h1>
      <Row>
        <Col size="md-4">
          <div className="card">
            <div className="card-body">
              <p className="card-text">
                Classes: {state.courses.length}<br />
                Students: {state.students.length}<br />
              </p>
            </div>
          </div>
        </Col>
        <Col size="md-4">
          <div className="card">
            <div className="card-body">
              <p className="card-text">
                Students Unpaid: {state.students.reduce((a, c) => a += c.StudentCourses.filter(sc => !sc.Paid).length, 0)}<br />
                Classes without teachers: {state.courses.filter(course => course.TeacherId === null).length}<br />
              </p>
            </div>
          </div>
        </Col>
        <Col size="md-4">
          <div className="card card-dark">
            <div className="card-body card-dark dark">
              Emergency Hotline: 555-1212<br />
              Class-Code: 3925643<br />
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col size="md-4">
          <h1>Parents</h1>
          <label htmlFor="userFilter">User Filter:</label>
          <input type="text" id="userFilter" name="userFilter" ref={userFilterRef} onChange={onFilterChange} />
          <div className="card">
            {
              state.users ?
                state.users.map(user => (
                  <CardParent user={user} key={user.id} admin={true} updateFunc={updateAll} includeChildren={true} />
                )) : null
            }
          </div>
        </Col>
        <Col size="md-4">
          <h1>Courses</h1>
          <AddModal title="Add Course" users={state.users} form={AddCourseForm} onReturn={updateCoursesOnly} />
          <br />
          <input type="text" id="courseFilter" name="courseFilter" placeholder="Filter by Course" ref={courseFilterRef} onChange={onFilterChange} />
          {
            state.courses ?
              state.courses.map(course => (
                <CardCourse course={course} key={course.title} admin={true} updateFunc={updateAll} />
              )) : null
          }
        </Col>
        <Col size="md-4">
          <h1>Students</h1>
          <AddModal title="Add Student" form={AddStudentForm} users={state.users} onReturn={updateStudentsOnly} />
          <input type="text" id="studentFilter" name="studentFilter" placeholder="Filter by Student" ref={studentFilterRef} onChange={onFilterChange} />
          {
            state.students ?
              state.students.map(student => (
                <CardStudent student={student} key={student.id} admin={true} updateFunc={updateAll} />
              )) : null
          }
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDash;
