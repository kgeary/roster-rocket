import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "../components/Grid";
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API";

function AdminDash() {
  const [state, dispatch] = useStoreContext();
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    console.log("ADMIN DASH USE EFFECT");
    API.getAllUsers()
      .then(res => {
        console.log("GET ALL USER RESP", res.data);
        setUsers(res.data);
      })
    API.getAllCourses()
      .then(res => {
        console.log("GET ALL COURSES RESP", res.data);
        setCourses(res.data);
      })
    API.getAllStudents()
      .then(res => {
        console.log("GET ALL STUDENTS RESP", res.data);
        setStudents(res.data);
      })
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col size="md-6">
          <h1>Admin Dashboard</h1>
        </Col>
        <Col size="md-6 sm-12">
          <h3>Dashboard data will go here</h3>
          {users.map(user => (
            <h3 key={user.id}>{user.email}</h3>
          )
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDash;
