import React from "react";
import { Link } from "react-router-dom";

function Card(props) {
    return (
        <div className="card">
            <img src={props.image} className="card-img-top" alt={props.name} />
            <div className="card-body">
                <h5 className="card-title">{props.nameOfStudent}</h5>
            </div>
            <ul className="list-group list-group-flush">
            <li className="list-group-item">studentName{props.name}</li>
            
            <li className="list-group-item">Class here</li>
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

export default Card;