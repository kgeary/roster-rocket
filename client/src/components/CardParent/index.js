import React from "react";
import { Link } from "react-router-dom";
import CardStudent from "../CardStudent"

function Card(props) {
    return (
        <div className="card">
            <img src={props.image} className="card-img-top" alt={props.name} />
            <div className="card-body">
                <h5 className="card-title">Parent's Name{props.name}</h5>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">mailing address</li>
                <li className="list-group-item">email address</li>
                <li className="list-group-item">phone number</li>
                <li className="list-group-item">alt phone</li>
            </ul>
            <CardStudent />
            <CardStudent />
            {/* {this.state.students.map(student => (
                <CardStudent />))};
            )*/}
            <div className="card-body">
            </div>

        </div>
    );
}

export default Card;