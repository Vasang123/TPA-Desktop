import './login.scss';
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const Login = () =>{
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        console.log("masuk");
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("sussce");
            navigate('dashboard');
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError("true");
            console.log(errorMessage);
            console.log(errorCode);
        });
      };
    return (
        <div className="login-menu">
            <div className="form-container">
                <div className="title">
                    <h1>Stuck In The Movie</h1>
                
                </div>
                <form>
                    {/* <div className="temp">
                        <label htmlFor="email" >Email</label>
                    </div> */}
                    <input type="email" name="email" id="email" placeholder="Email.." 
                    onChange={ (e) => setEmail(e.target.value) }></input>
                    {/* <div className="temp">
                    <label htmlFor="password">Password</label>
                    </div> */}
                    <input type="password" name="password" id="password" placeholder="Password.."
                    onChange={ (e) => setPassword(e.target.value) }></input>
                    <button type='submit'  onClick={ handleLogin}>
                        Login
                    </button>
                    {error && <span>Wrong email or password!</span>}
                </form>
            </div>
        </div>
    );
};

export default Login;