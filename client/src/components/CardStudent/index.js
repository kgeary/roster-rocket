import React from "react";
import { Link } from "react-router-dom";

function CardStudent(props) {

    console.log("CARD STUDENT", props.student);

    return (
        <div className="card student-card">
            <img src={props.student.img} className="card-img-top" alt={props.student.name} style={{ width: 150, height: 150 }} />
            <div className="card-body">
                <h5 className="card-title">{props.student.name}</h5>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Name: {props.student.name}</li>
                <li className="list-group-item">Age: {props.student.age}</li>
                <li className="list-group-item">Class card here</li>
            </ul>
            {
                props.student.StudentCourses.map(sc => (
                    <div className="card course-card" key={sc.Course.title}>
                        <h5 className="card-title">Title: {sc.Course.title}</h5>
                        <div className="card-body">
                            <h5>Cost: {sc.Course.cost}</h5>
                            <h5>paid: {sc.Paid ? "PAID" : <span style={{ fontWeight: "bold", color: "red" }}>NOT YET PAID</span>}</h5>
                        </div>
                    </div>
                ))
            }
            <div className="card-body">
                <Link to="/" className="card-link">Add another Class</Link>
            </div>
        </div>
    );
}

export default CardStudent;