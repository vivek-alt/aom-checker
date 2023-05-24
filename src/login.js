import React, { useState } from "react";
import './App.css';
import bcrypt from 'bcryptjs';
import PropTypes from 'prop-types';
import "bootstrap/dist/css/bootstrap.min.css";
export default function Login({ setToken }) {
    const [password, setPassword] = useState("");
    const [errorMessages, setErrorMessages] = useState({});
    const encPass = "$2a$10$eYkmx2lNyIu6GQKKecuzQe.6AQZiymGWp88vdrhYcRaccAnQyzk2W";
    function handleSubmit(e) {
        e.preventDefault();
        bcrypt.hash(password, 10, function(err, hash) {
            console.log(hash);
        });
        bcrypt.compare(password, encPass, function (err, result) {
            setToken(result);
            if(result===false){
                setErrorMessages({name:"error",message:"Wrong password"})
            }
        });
    }
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );
    return (
        <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>
                    {renderErrorMessage("error")}
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary" onClick={(e)=>handleSubmit(e)}>
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>

    );
}
Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }
  