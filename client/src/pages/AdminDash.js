import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API";
import CardParent from "../components/CardParent";
import CardCourse from "../components/CardCourse";
import CardStudent from "../components/CardStudent";
import AddCourseForm from "../components/forms/AddCourseForm";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root');

function AdminDash() {
  const [state] = useStoreContext();
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);

  const [userFilter, setUserFilter] = useState("");
  const userFilterRef = useRef("");

  const [courseFilter, setCourseFilter] = useState("");
  const courseFilterRef = useRef("");

  const [studentFilter, setStudentFilter] = useState("");
  const studentFilterRef = useRef("");

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    console.log("ADMIN DASH USE EFFECT USERS");
    API.getAllUsers()
      .then(res => {
        console.log("GET ALL USER RESP", res.data);
        setUsers(res.data);
      })
      .catch(err => {
        console.log("FAILED TO GET ALL USERS", err.response.statusText);
        setUsers([]);
      });

  }, []);

  useEffect(() => {
    console.log("ADMIN DASH USE EFFECT COURSES");
    API.getAllCourses()
      .then(res => {
        console.log("GET ALL COURSES RESP", res.data);
        setCourses(res.data);
      })
      .catch(err => {
        console.log(err.response.status);
        console.log("FAILED TO GET ALL COURSES", err.response.statusText);
        setCourses([]);
      })
  }, [modalIsOpen]);

  useEffect(() => {
    console.log("ADMIN DASH USE EFFECT STUDENTS");
    API.getAllStudents()
      .then(res => {
        console.log("GET ALL STUDENTS RESP", res.data);
        setStudents(res.data);
      })
      .catch(err => {
        console.log("FAILED TO GET ALL STUDENTS", err.response.statusText);
        setStudents([]);
      });
  }, [modalIsOpen]);


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

  return (
    <Container fluid>
      <h1>Admin Dashboard</h1>
      <Row>
        <Col size="md-4">
          <h1>Parents</h1>
          <label htmlFor="userFilter">User Filter:</label>
          <input type="text" id="userFilter" name="userFilter" ref={userFilterRef} onChange={onFilterChange} />
          <div className="card">
            {users.map(user => (
              <CardParent user={user} key={user.id} />
            )
            )}
          </div>
        </Col>
        <Col size="md-4">
          <h1>Courses</h1>
          <button className="btn btn-primary btn-sm" onClick={openModal}>Add New Course</button>
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <AddCourseForm
              users={users}
              setIsOpen={setIsOpen}
            />
          </Modal>
          <input type="text" id="courseFilter" name="courseFilter" placeholder="Filter by Course" ref={courseFilterRef} onChange={onFilterChange} />
          {
            courses.map(course => (
              <CardCourse course={course} key={course.title} />
            ))
          }
        </Col>
        <Col size="md-4">
          <h1>Students</h1>
          <label htmlFor="studentFilter">Student Filter:</label>
          <input type="text" id="studentFilter" name="studentFilter" ref={studentFilterRef} onChange={onFilterChange} />
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
