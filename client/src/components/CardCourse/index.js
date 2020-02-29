import React, { useState } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import PayButton from "../PayButton";

function CardCourse(props) {

    const [studentState, setStudentState] = useState(false);

    //console.log("CARD COURSE", props.course);
    const onDelete = (id) => {
        API.removeCourse(id).then(res => {
            if (props.updateFunc) {
                props.updateFunc();
            }
        });
    }

    const renderStudents = () => {
        return (
            <React.Fragment>
                {props.course.Students.length === 0 ? <h5>No Students Enrolled</h5> : null}
                {
                    props.course.Students.map(student => (
                        <div className="card student-card" key={student.name}>
                            <h5 className="card-title">Name: {student.name}</h5>
                            <div className="card-body">
                                <h6>Age: {student.age}</h6>
                                <h6>paid: {student.Paid ? "PAID" : <span style={{ fontWeight: "bold", color: "red" }}>NOT YET PAID</span>}</h6>
                                {
                                    !student.Paid ?
                                        <PayButton StudentId={student.id} CourseId={props.course.id} updateFunc={props.updateFunc} Paid={student.Paid} />
                                        : null
                                }
                            </div>
                        </div>
                    ))
                }
                <Link to="/" className="card-link">Add another Student</Link>
            </React.Fragment>
        );
    }

    return (
        <div className="card course-card">
            <div className="card-header">
                {props.course.title}
            </div>
            <div className="card-body">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Teacher: {props.course.User ? props.course.User.name : "Not Assigned"}</li>
                    <li className="list-group-item">Location: {props.course.location}</li>
                    <li className="list-group-item">Enrolled: {props.course.Students.length}</li>
                    <li className="list-group-item">Capacity: {props.course.capacity}</li>
                    <li className="list-group-item">Paid: {props.course.Students.filter(s => s.Paid).length}</li>
                    <li className="list-group-item">Unpaid: {props.course.Students.filter(s => !s.Paid).length}</li>
                    {props.admin ? <button className="btn btn-danger btn-sm" onClick={() => onDelete(props.course.id)}>Delete Course</button> : null}
                    <button className="btn btn-info btn-sm" onClick={() => { setStudentState(!studentState) }}>{studentState ? "Hide Students" : "Show Students"}</button>
                </ul>
                {
                    studentState ?
                        renderStudents() :
                        null
                }
            </div>
        </div>
    );
}

export default CardCourse;