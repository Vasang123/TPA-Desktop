import './login.scss';
import React, { useEffect, useState } from "react";
import {ValidateLogin} from '../controller/loginController';
const Login = () =>{
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div className="login-menu">
            <div className="form-container">
                <div className="title">
                    <h1>Stuck In The Movie</h1>
                </div>
                <form>
                    <input type="email" name="email" id="email" placeholder="Email.." 
                    onChange={ (e) => setEmail(e.target.value) }></input>
                    <input type="password" name="password" id="password" placeholder="Password.."
                    onChange={ (e) => setPassword(e.target.value) }></input>
                    <ValidateLogin 
                    email = {email}
                    password = {password}
                    error = {error}
                    setError = {setError}
                    />
                </form>
            </div>
        </div>
    );
};

export default Login;