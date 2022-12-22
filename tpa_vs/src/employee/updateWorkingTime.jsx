import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import './updateTime.scss'
import {db} from '../firebase'
export default function UpdateWorkingTime(){
    const location = useLocation();
    const [startTime, setStartTime] = useState(location.state.startTime);
    const [endTime, setEndTime] = useState(location.state.endTime);
    // const [startTime, setStartTime] = useState("");
    // console.log(location.state.employeeId);
    const docRef = doc(db, "working time", location.state.id);
    const navigate = useNavigate();
    const back = (e) => {
        e.preventDefault();
        navigate('/view_working_time');
    }
    const updateTime = (e) => {
        e.preventDefault();
        const data = {
            // id: location.state.id,
            day : location.state.day,
            employeeId : location.state.employeeId,
            startTime: startTime,
            endTime: endTime,
            status : "updated"
        };
        setDoc(docRef, data)
        .then(docRef => {
            console.log("Entire Document has been updated successfully");
            navigate('/view_working_time');
        })
        .catch(error => {
            console.log(error);
        });
    


    }
    return (
        <div className="Update-Container"> 
            <div className = "back">
                <button onClick ={back}>Go Back</button>
            </div>
            <div className = "form-container">
                <form>
                <h1>Change Working Time Day - {location.state.day}</h1>
                <h4>Employee Name : {location.state.name}</h4>
                    <label htmlFor="startTime">Start Time</label>
                    <input type="time" name="startTime" 
                    value = {startTime}
                    onChange={ (e) => setStartTime(e.target.value)}/>
                    <label htmlFor="endTime">End Time</label>
                    <input type="time" name="endTime" 
                    value = {endTime}
                    onChange={ (e) => setEndTime(e.target.value)}/>
                    <button onClick={updateTime}><span>Change</span> <span>Time</span></button>
                </form>
            </div>
            {/* <h1>{location.state.id}</h1>
            <h1>{location.state.employeeId}</h1>
            <h1>{location.state.startTime}</h1>
            <h1>{location.state.endTime}</h1>  
            <h1>{location.state.name}</h1>   */}
        </div>
    );
}