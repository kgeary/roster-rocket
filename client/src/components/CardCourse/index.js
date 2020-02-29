import React from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import PayButton from "../PayButton";

function CardCourse(props) {

    //console.log("CARD COURSE", props.course);
    const onDelete = (id) => {
        API.removeCourse(id).then(res => {
            if (props.updateFunc) {
                props.updateFunc();
            }
        });
    }

    return (
        <div className="card course-card">
            <div className="card-body">
                <h5 className="card-title">{props.course.title}</h5>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Location: {props.course.location}</li>
                <li className="list-group-item">Current # Enrolled: {props.course.Students.length}</li>
                <li className="list-group-item">Max Size: {props.course.capacity}</li>
                <li className="list-group-item"># Unpaid: {props.course.Students.filter(s => !s.Paid).length}</li>
                {props.admin ? <button className="btn btn-danger btn-sm" onClick={() => onDelete(props.course.id)}>Delete Course</button> : null}

            </ul>
            <h3>Teacher: {props.course.User ? props.course.User.name : "Not Assigned"}</h3>
            <h3>Students</h3>
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
                                    <PayButton StudentId={student.id} CourseId={props.course.id} updateFunc={props.updateFunc} Paid={student.Paid}>
                                        Pay
                                </PayButton> : null
                            }
                        </div>
                    </div>
                ))
            }
            <div className="card-body">
                <Link to="/" className="card-link">Add another Student</Link>
            </div>
        </div>
    );
}

export default CardCourse;