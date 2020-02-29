import React, { useEffect, useState, useRef } from "react";
import { Col, Row, Container } from "../components/Grid";
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API";
import CardParent from "../components/CardParent";
import CardCourse from "../components/CardCourse";
import CardStudent from "../components/CardStudent";

function AdminDash() {
  const [state] = useStoreContext();
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);

  const [userFilter, setUserFilter] = useState("");

  const parentRef = useRef("");

  useEffect(() => {
    console.log("ADMIN DASH USE EFFECT");

    API.getAllUsers()
      .then(res => {
        console.log("GET ALL USER RESP", res.data);
        setUsers(res.data);
      })
      .catch(err => {
        console.log("FAILED TO GET ALL USERS", err);
        setUsers(undefined);
      });
    API.getAllCourses()
      .then(res => {
        console.log("GET ALL COURSES RESP", res.data);
        setCourses(res.data);
      })
      .catch(err => {
        console.log("FAILED TO GET ALL COURSES", err);
        setCourses(undefined);
      })
    API.getAllStudents()
      .then(res => {
        console.log("GET ALL STUDENTS RESP", res.data);
        setStudents(res.data);
      })
      .catch(err => {
        console.log("FAILED TO GET ALL STUDENTS", err);
        setStudents(undefined);
      });
  }, []);


  useEffect(() => {
    console.log("ADMIN DASH USE EFFECT - PARENT REF");
    setUserFilter(parentRef.current.value);
    console.log(userFilter);
  }, [userFilter]);

  if (state.loading) {
    return <h1>Loading Data...</h1>
  }

  return (
    <Container fluid>
      <h1>Admin Dashboard</h1>
      <Row>
        <Col size="md-4">
          <input type="text" ref={parentRef} />
          <div className="card">
            {users.map(user => (
              <CardParent user={user} key={user.id} />
            )
            )}
          </div>
        </Col>
        <Col size="md-4">
          {
            courses.map(course => (
              <CardCourse course={course} key={course.title} />
            ))
          }
        </Col>
        <Col size="md-4">
          {students.map(student => (
            <CardStudent student={student} key={student.id} />
          )
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDash;
