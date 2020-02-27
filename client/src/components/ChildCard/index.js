import React from "react";
import { Link } from "react-router-dom";

function Card(props) {
    return (
        <div className="card">
            <img src="https://via.placeholder.com/150" className="card-img-top" alt="Kid here" />
            <div className="card-body">
                <h5 className="card-title">Kid's Name</h5>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Class card here</li>
                <li className="list-group-item">Class card here</li>
                <li className="list-group-item">Class card here</li>
            </ul>
            <div className="card-body">
                <Link to="/" className="card-link">Add another class</Link>
            </div>
        </div>
    );
}

export default Card;