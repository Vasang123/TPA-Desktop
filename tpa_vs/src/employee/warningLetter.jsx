import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import {db} from '../firebase'
import {collection, addDoc} from "firebase/firestore"
import moment from "moment";

import './warningLetter.scss'
export default function CreateWarningLetter () {  
    const location = useLocation();
    const [description, setDescription] = useState("");
    let date = new Date();
    let time =  moment().format("DD-MM-YYYY hh:mm:ss")
    // console.log(location.state.id);
    // console.log(location.state.name);
    const navigate = useNavigate();
    const back = (e) => {
        e.preventDefault();
        navigate('/view_employee');
    }
    const createLetter = async (e) => {
        e.preventDefault();
        const collectionRef = collection(db, "warning letter");
        const payload = {
            createdAt : time,
            description : description,
            employeeId : location.state.id,
            name : location.state.name,
            status : "pending"

        };
        addDoc(collectionRef,payload);
        navigate('/view_employee');
    }
    return (
        <div className ="warning-letter-container">
            <div className = "back">
                <button onClick ={back}>Go Back</button>
            </div>
            <div className ="form-container">
                <form>
                    <h1>Create Warning Letter</h1>
                    <label htmlFor="name"> <b>Employee Name : {location.state.name}</b></label>
                    <label htmlFor="description">Violation Description</label>
                    <textarea name ="description" id="description"
                    onChange={ (e) => setDescription(e.target.value)}> 
                    </textarea>

                    <button onClick={createLetter}> Create </button>
                </form>
            </div>
        </div>
    )
}