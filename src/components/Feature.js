import React from "react";

function Feature(props) {
    return (
        <li className="w3-bar">
            <div className="w3-bar-item">
                <span>{props.name}</span>
            </div>
        </li>
    );
}

export default Feature;