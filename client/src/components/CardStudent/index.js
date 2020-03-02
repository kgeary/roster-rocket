import React, { useState } from "react";
import API from "../../utils/API";
import EnrollStudentModal from "../EnrollStudentModal";
import EnrollStudentForm from "../forms/EnrollStudentForm";
import PayButton from "../PayButton";
import Avatar from 'react-avatar'
import "./style.css";

function CardStudent(props) {

    const [courseState, setCourseState] = useState(false);

    // console.log("CARD STUDENT", props.student);
    const onDelete = (id) => {
        API.removeStudent(id).then(res => {
            if (props.updateFunc) {
                props.updateFunc();
            }
        });
    }

    const onDrop = (StudentId, CourseId) => {
        API.dropCourse(StudentId, CourseId).then(res => {
            if (props.updateFunc) {
                props.updateFunc();
            }
        });
    }

    const renderCourses = () => {
        return (
            <React.Fragment>
                {props.student.StudentCourses.length > 0 ? <h3 className="subtitle">Classes</h3> : null}
                {
                    props.student.StudentCourses.map(sc => (
                        <div className="card course-card" key={sc.Course.title}>
                            <div className="card-body">
                                <h5 className="card-title">Title: {sc.Course.title}</h5>
                                <h6>Cost: {sc.Course.cost}</h6>
                                <h6>paid: {sc.Paid ? "PAID" : <span style={{ fontWeight: "bold", color: "red" }}>NOT YET PAID</span>}</h6>
                                <button className="btn btn-danger btn-sm" onClick={() => onDrop(props.student.id, sc.CourseId)}>Drop Class</button>
                                {
                                    !sc.Paid ?
                                        <PayButton StudentId={props.student.id} CourseId={sc.Course.id} updateFunc={props.updateFunc} Paid={props.student.Paid} />
                                        : null
                                }
                            </div>
                        </div>
                    ))
                }
            </React.Fragment>
        );
    }

    return (
        <div className="card student-card">
            {
                props.student.img.includes("via.placeholder") ?
                    <Avatar name={props.student.name} className='avatarCss' /> :
                    <img src={props.student.img} className='card-img avatarCss' alt={props.student.name} style={{ width: 100, height: 100 }} />
            }
            <div className="card-body">

                <h5 className="card-title">{props.student.name}</h5>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Age: {props.student.age}</li>
                <li className="list-group-item">Parent: {props.student.User.name}</li>
                {props.student.StudentCourses.length === 0 ? <li className="list-group-item">Not Currently Enrolled</li> : null}
                {props.admin ? <button className="btn btn-danger btn-sm" onClick={() => onDelete(props.student.id)}>Delete Student</button> : null}
                <EnrollStudentModal student={props.student} form={EnrollStudentForm} onReturn={props.updateFunc} />
                <button
                    className="btn btn-info btn-sm"
                    disabled={props.student.StudentCourses.length === 0}
                    onClick={() => { setCourseState(!courseState) }}>{courseState ? "Hide Classes" : "Show Classes"}</button>
            </ul>
            {
                courseState ?
                    <div className="card-body">
                        {renderCourses()}
                    </div>
                    : null

            }

        </div>
    );
}

export default CardStudent;