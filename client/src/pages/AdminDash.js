import React, { useEffect, useState, useRef } from "react";
import { Col, Row, Container } from "../components/Grid";
import { useStoreContext } from "../utils/GlobalState";
import * as ACTIONS from "../utils/actions";
import API from "../utils/API";
import AddCourseForm from "../components/forms/AddCourseForm";
import AddStudentForm from "../components/forms/AddStudentForm";
import AddParentForm from "../components/forms/AddParentForm";
import AddModal from "../components/AddModal";
import { Link, Redirect } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";
import AddCodeForm from "../components/forms/AddCodeForm";
import DeleteCodeForm from "../components/forms/DeleteCodeForm";
import getCsv from "../utils/getCsv";
import download from "../utils/download";

function AdminDash() {
  const [state, dispatch] = useStoreContext();
  const [codes, setCodes] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [parentFlip, setParentFlip] = useState(false);
  const [classFlip, setClassFlip] = useState(false);
  const [childFlip, setChildFlip] = useState(false);

  const setUsers = val => {
    dispatch({ type: ACTIONS.SET_USERS, value: val });
  };
  const setCourses = val => {
    dispatch({ type: ACTIONS.SET_COURSES, value: val });
  };
  const setStudents = val => {
    dispatch({ type: ACTIONS.SET_STUDENTS, value: val });
  };

  const [userFilter, setUserFilter] = useState("");
  const userFilterRef = useRef("");

  const [courseFilter, setCourseFilter] = useState("");
  const courseFilterRef = useRef("");

  const [studentFilter, setStudentFilter] = useState("");
  const studentFilterRef = useRef("");

  const updateUsers = () => API.getAllUsers();
  const updateStudents = () => API.getAllStudents();
  const updateCourses = () => API.getAllCourses();

  const getCodes = () => {
    API.getCodes()
      .then(res => {
        setCodes(res.data.map(i => i.code));
      })
      .catch(err => {
        setCodes([]);
      });
  };
  const updateAll = () => {
    //console.log("ADMIN LOAD DATA");
    dispatch({ type: ACTIONS.LOADING });
    Promise.all([updateUsers(), updateCourses(), updateStudents()])
      .then(res => {
        //console.log("PROMISE COMPLETE");
        const [userData, courseData, studentData] = res.map(i => i.data);
        setUsers(userData);
        setCourses(courseData);
        setStudents(studentData);
      })
      .catch(err => {
        console.log("PROMISE ALL ERROR", err);
      })
      .finally(() => {
        dispatch({ type: ACTIONS.DONE });
        setLoaded(true);
      });
  };

  useEffect(() => {
    updateAll();
    getCodes();
  }, []);

  useEffect(() => { }, [userFilter]);
  useEffect(() => { }, [courseFilter]);
  useEffect(() => { }, [studentFilter]);

  const onFilterChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case "userFilter":
        setUserFilter(value.toLowerCase());
        break;
      case "courseFilter":
        setCourseFilter(value.toLowerCase());
        break;
      case "studentFilter":
        setStudentFilter(value.toLowerCase());
        break;
      default:
        throw new Error("Unknown filter");
    }
  };

  const saveToCsv = () => {
    download(getCsv(state.courses));
  }

  if (state.loading || !loaded) {
    return (
      <Container>
        <div className='big-gap' />
        <h1>Loading Admin Data...</h1>
      </Container>
    );
  }
  if (!state.user) {
    return <Redirect to='/login' />;
  }
  if (!state.user.isAdmin) {
    return (
      <Container fluid>
        <div className='big-gap' />
        <h1>You must be an administrator to access this page.</h1>
      </Container>
    );
  }

  return (
    <div>
      <Container>
        <div className='big-gap' />
        <h1>Admin Dashboard</h1>
        <br />
        <div className='alert alert-dark' role='alert'>
          <Row>
            <Col size="md-5">
              <p className='admin-info'>
                Emergency Hotline: (512) 555-1212<br />
                Class-Codes: {codes.join(", ")}
              </p>
            </Col>
            <Col size="md-7">
              <div style={{
                display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap"
              }}>
                <AddModal title='Add Code' form={AddCodeForm} onReturn={getCodes} />
                <DeleteModal
                  title='Delete Code'
                  users={codes}
                  form={DeleteCodeForm}
                  onReturn={getCodes}
                />
                <button className="btn btn-info btn-sm m-2" onClick={saveToCsv}>
                  <i className='fas fa-save' />{" "}
                  Save Class Data to CSV
                </button>
              </div>
            </Col>
          </Row>
        </div>
        <br />
        <Row>
          <Col size='lg-4'>
            <div className='card pt-0 admin-card'>
              <div className='card-header pb-0'>
                <div className='float-left'>
                  <h1>Parents</h1>
                </div>
                <div className='float-right'>
                  <AddModal
                    title='Invite Parent'
                    form={AddParentForm}
                    users={codes}
                  />
                </div>
              </div>
              <ul className='list-group list-group-flush tiny-font'>
                <li className='list-group-item list-group-item-primary pt-1 pb-1 pl-3 pr-4 d-flex justify-content-between align-items-center'>
                  <span className='badge-title'> > Number of Parents: </span>
                  <span className='badge badge-primary badge-pill'>
                    {state.users.length}
                  </span>
                </li>
                <li className='list-group-item list-group-item-danger pt-1 pb-1 pl-3 pr-4 d-flex justify-content-between align-items-center' onClick={() => setParentFlip(!parentFlip)}>
                  <span className='badge-title'>
                    {" "}
                    {parentFlip ? "˅" : ">"} Parents without Children:{" "}
                  </span>
                  <span className='badge badge-primary badge-pill'>
                    {
                      state.users.filter(user => user.Students.length < 1)
                        .length
                    }
                  </span>
                </li>
                {
                  !parentFlip ? null :
                    <li>
                      <ul className="list-group list-group-flush tiny-font" style={{ maxHeight: "160px", overflow: "auto" }}>
                        {
                          state.users
                            .filter(user => user.Students.length < 1)
                            .map(user => (
                              <Link key={user.id} to={`/parent/${user.id}`}>
                                <li className="list-group-item" key={user.id}>{user.name}</li>
                              </Link>
                            ))
                        }
                      </ul>
                    </li>
                }
              </ul>
              <input
                className='input-styled'
                type='text'
                id='userFilter'
                name='userFilter'
                placeholder='Filter by Parent...'
                ref={userFilterRef}
                onChange={onFilterChange}
              />
              <div className='admin-card-inner'>
                <ul className='list-group'>
                  {state.users
                    ? state.users
                      .filter(user =>
                        user.name.toLowerCase().includes(userFilter)
                      )
                      .map(user => (
                        <Link key={user.id} to={`/parent/${user.id}`}>
                          <li className='list-group-item list-group-item-warning list-group-item-action pt-1 pb-1 pl-2 pr-2 d-flex justify-content-between align-items-center'>
                            {user.name}
                            <span className='badge badge-primary badge-pill'>
                              {user.Students.length}
                            </span>
                          </li>
                        </Link>
                      ))
                    : null}
                </ul>
              </div>
            </div>
          </Col>
          <Col size='lg-4'>
            <div className='card pt-0 admin-card'>
              <div className='card-header pb-0'>
                <div className='float-left'>
                  <h1>Classes</h1>
                </div>
                <div className='float-right'>
                  <AddModal
                    title='Add Class'
                    users={state.users}
                    form={AddCourseForm}
                    onReturn={updateAll}
                  />
                </div>
              </div>
              <ul className='list-group list-group-flush tiny-font'>
                <li className='list-group-item list-group-item-primary pt-1 pb-1 pl-3 pr-4 d-flex justify-content-between align-items-center'>
                  <span className='badge-title'> > Number of Classes: </span>
                  <span className='badge badge-primary badge-pill'>
                    {state.courses.length}
                  </span>
                </li>
                <li className='list-group-item list-group-item-danger pt-1 pb-1 pl-3 pr-4 d-flex justify-content-between align-items-center' onClick={() => setClassFlip(!classFlip)}>
                  {" "}
                  <span className='badge-title'>
                    {" "}
                    {classFlip ? "˅" : ">"} Classes without Teachers:{" "}
                  </span>
                  <span className='badge badge-primary badge-pill'>
                    {
                      state.courses.filter(course => course.TeacherId === null)
                        .length
                    }
                  </span>
                </li>
                {
                  !classFlip ? null :
                    <li>
                      <ul className="list-group list-group-flush tiny-font" style={{ maxHeight: "160px", overflow: "auto" }}>
                        {
                          state.courses
                            .filter(course => course.TeacherId === null)
                            .map(course => (
                              <Link to={`/course/${course.id}`}>
                                <li className="list-group-item" key={course.id}>{course.title}</li>
                              </Link>
                            ))
                        }
                      </ul>
                    </li>
                }
              </ul>

              <input
                className='input-styled'
                type='text'
                id='courseFilter'
                name='courseFilter'
                placeholder='Filter by Class...'
                ref={courseFilterRef}
                onChange={onFilterChange}
              />
              <div className='admin-card-inner'>
                <ul className='list-group'>
                  {state.courses
                    ? state.courses
                      .filter(course =>
                        course.title.toLowerCase().includes(courseFilter)
                      )
                      .map(course => (
                        <Link key={course.id} to={`/course/${course.id}`}>
                          <li className='list-group-item list-group-item-warning list-group-item-action pt-1 pb-1 pl-2 pr-2 d-flex justify-content-between align-items-center'>
                            {course.title}
                            <span className='badge badge-primary badge-pill'>
                              {course.Students.length}
                            </span>
                          </li>
                        </Link>
                      ))
                    : null}
                </ul>
              </div>
            </div>
          </Col>
          <Col size='lg-4'>
            <div className='card pt-0 admin-card'>
              <div className='card-header pb-0'>
                <div className='float-left'>
                  <h1>Students</h1>
                </div>
                <div className='float-right'>
                  <AddModal
                    title='Add Student'
                    form={AddStudentForm}
                    users={state.users}
                    onReturn={updateAll}
                  />
                </div>
              </div>
              <ul className='list-group list-group-flush tiny-font'>
                <li className='list-group-item list-group-item-primary pt-1 pb-1 pl-3 pr-4 d-flex justify-content-between align-items-center'>
                  <span className='badge-title'>
                    > Number of Students: </span>
                  <span className='badge badge-primary badge-pill'>
                    {state.students.length}
                  </span>
                </li>
                <li className='list-group-item list-group-item-danger pt-1 pb-1 pl-3 pr-4 d-flex justify-content-between align-items-center' onClick={() => setChildFlip(!childFlip)}>
                  <span className='badge-title'> {childFlip ? "˅" : ">"} Unpaid Students: </span>
                  <span className='badge badge-primary badge-pill'>
                    {state.students.reduce(
                      (a, c) =>
                        (a += c.StudentCourses.filter(sc => !sc.Paid).length > 0 ? 1 : 0),
                      0
                    )}
                  </span>
                </li>
                {
                  !childFlip ? null :
                    <li>
                      <ul className="list-group list-group-flush tiny-font" style={{ maxHeight: "160px", overflow: "auto" }}>
                        {
                          state.students
                            .filter(student => student.StudentCourses.filter(sc => !sc.Paid).length > 0)
                            .map(student => (
                              <Link to={`/student/${student.id}`}>
                                <li className="list-group-item" key={student.id}>{student.name}</li>
                              </Link>
                            ))
                        }
                      </ul>
                    </li>
                }
              </ul>
              <input
                className='input-styled'
                type='text'
                id='studentFilter'
                name='studentFilter'
                placeholder='Filter by Student...'
                ref={studentFilterRef}
                onChange={onFilterChange}
              />
              <div className='admin-card-inner'>
                <ul className='list-group'>
                  {state.students
                    ? state.students
                      .filter(student =>
                        student.name.toLowerCase().includes(studentFilter)
                      )
                      .map(student => (
                        <Link key={student.id} to={`/student/${student.id}`}>
                          <li className='list-group-item list-group-item-warning list-group-item-action pt-1 pb-1 pl-2 pr-2 d-flex justify-content-between align-items-center'>
                            {student.name}
                          </li>
                        </Link>
                      ))
                    : null}
                </ul>
              </div>
            </div>
          </Col>
        </Row>
      </Container >
      <div className='big-gap' />
    </div >
  );
}

export default AdminDash;
