import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import {db} from '../firebase'
import {collection, addDoc} from "firebase/firestore"
import moment from "moment";

import './adjustSalary.scss'
export default function AdjustSalary () {  
    const location = useLocation();
    const [description, setDescription] = useState("");
    const [newSalary, setnewSalary] = useState("");
    let date = new Date();
    let time =  moment().format("DD-MM-YYYY hh:mm:ss")
    // console.log(location.state.id);
    // console.log(location.state.name);
    const navigate = useNavigate();
    const back = (e) => {
        e.preventDefault();
        navigate('/view_employee');
    }
    const createRequest = async (e) => {
        e.preventDefault();
        const collectionRef = collection(db, "salary request");
        const payload = {
            createdAt : time,
            employeeId : location.state.id,
            newSalary : newSalary,
            oldSalary :  location.state.salary,
            status : "pending"
        };
        addDoc(collectionRef,payload);
        navigate('/view_employee');
    }
    return (
        <div className ="adjust-salary-container">
            <div className = "back">
                <button onClick ={back}>Go Back</button>
            </div>
            <div className ="form-container">
                <form>
                    <h1>Adjust Salary</h1>
                    <label htmlFor="name"> <b>Employee Name : {location.state.name}</b></label>
                    <label htmlFor="name"> <b>Employee Old Salary : Rp {location.state.salary}</b></label>
                    <label htmlFor="newSalary">New Salary</label>
                    <input type = "number"
                    onChange = {e => setnewSalary(e.target.value)}/>
                    <button onClick={createRequest}> Send Request </button>
                </form>
            </div>
        </div>
    )
}