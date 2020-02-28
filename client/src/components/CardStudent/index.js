import React from "react";
import { Link } from "react-router-dom";

function CardStudent(props) {
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
            {/* {this.state.students.map(student => (
                <CardStudent />))};
            )*/}
            <div className="card-body">
                <Link to="/" className="card-link">Add another Class</Link>
            </div>
        </div>
    );
}

export default CardStudent;