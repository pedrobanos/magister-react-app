import React from "react";
import { Link } from "react-router-dom";
import './Button.css'


const Button = ({ customRoute }) => {
        return (
            <Link to={`/${customRoute}`} >
                <div className="backButtonPosi">
                    <div className="buttonStyle">
                        <i style={{color: "black"}} className="fa-solid fa-arrow-left  fa-xl positionIcon"></i>
                    </div>
                </div>
            </Link>
        );
}

export default Button