import React from "react";
import API from "../../utils/API";
import EnrollStudentModal from "../EnrollStudentModal";
import EnrollStudentForm from "../forms/EnrollStudentForm";
import PayButton from "../PayButton";

function CardStudent(props) {

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

    return (
        <div className="card student-card">
            <img src={props.student.img} className="card-img-top" alt={props.student.name} style={{ width: 150, height: 150 }} />
            <div className="card-body">
                <h5 className="card-title">{props.student.name}</h5>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Name: {props.student.name}</li>
                <li className="list-group-item">Age: {props.student.age}</li>
                <li className="list-group-item">Parent: {props.student.User.name}</li>
                {props.admin ? <button className="btn btn-danger btn-sm" onClick={() => onDelete(props.student.id)}>Delete Student</button> : null}
                {props.student.StudentCourses.length === 0 ? <li className="list-group-item">Not Currently Enrolled</li> : null}
            </ul>
            <div className="card-body">
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
                                        <PayButton StudentId={props.student.id} CourseId={sc.Course.id} updateFunc={props.updateFunc} Paid={props.student.Paid}>
                                            Pay
                                </PayButton> : null
                                }
                            </div>
                        </div>
                    ))
                }
                <EnrollStudentModal student={props.student} form={EnrollStudentForm} onReturn={props.updateFunc} />

            </div>
        </div>
    );
}

export default CardStudent;