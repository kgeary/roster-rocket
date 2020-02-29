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

  const setUsers = (val) => { dispatch({ type: ACTIONS.SET_USERS, value: val }); }
  const setCourses = (val) => { dispatch({ type: ACTIONS.SET_COURSES, value: val }); }
  const setStudents = (val) => { dispatch({ type: ACTIONS.SET_STUDENTS, value: val }); }

  const [userFilter, setUserFilter] = useState("");
  const userFilterRef = useRef("");

  const [courseFilter, setCourseFilter] = useState("");
  const courseFilterRef = useRef("");

  const [studentFilter, setStudentFilter] = useState("");
  const studentFilterRef = useRef("");

  const updateUsers = () => {
    console.log("ADMIN DASH USE EFFECT USERS");
    return API.getAllUsers();
  }

  const updateStudents = () => {
    console.log("ADMIN DASH USE EFFECT STUDENTS");
    return API.getAllStudents();
  };

  const updateCourses = () => {
    console.log("ADMIN DASH USE EFFECT COURSES");
    return API.getAllCourses();
  }

  const updateAll = () => {
    dispatch({ type: ACTIONS.LOADING });
    Promise.all([updateUsers(), updateCourses(), updateStudents()]).then((res) => {
      console.log(res);
      setUsers(res[0].data);
      setCourses(res[1].data);
      setStudents(res[2].data);
      console.log("ADMIN PROMISE ALL COMPLETE");
    }).catch(err => {
      console.log("PROMISE ALL ERROR", err);
    }).finally(() => {
      dispatch({ type: ACTIONS.DONE });
    });
  }

  useEffect(() => {
    updateAll();
  }, []);

  useEffect(() => {
    console.log("ADMIN DASH USE EFFECT - USER FILTER");
    console.log(userFilter);
  }, [userFilter]);

  useEffect(() => {
    console.log("ADMIN DASH USE EFFECT - COURSE FILTER");
    console.log(courseFilter);
  }, [courseFilter]);

  useEffect(() => {
    console.log("ADMIN DASH USE EFFECT - STUDENT FILTER");
    console.log(studentFilter);
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


  if (state.loading) {
    return <h1>Loading Data...</h1>
  }

  if (!state.user || !state.user.isAdmin) {
    return <Redirect to="/" />
  }

  return (
    <Container fluid>
      <h1>Admin Dashboard</h1>
      <Row>
        <Col size="md-4">
          <h1>Parents</h1>
          <label htmlFor="userFilter">User Filter:</label>
          <input type="text" id="userFilter" name="userFilter" ref={userFilterRef} onChange={onFilterChange} />
          <div className="card">

            {
              state.users ?
                state.users.map(user => (
                  <CardParent user={user} key={user.id} admin={true} updateFunc={updateAll} />
                )) : null
            }
          </div>
        </Col>
        <Col size="md-4">
          <h1>Courses</h1>
          <AddModal title="Add Course" users={state.users} form={AddCourseForm} onReturn={updateCourses} />

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
          <AddModal title="Add Student" form={AddStudentForm} users={state.users} onReturn={updateStudents} />
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
