import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getFirestore, doc, setDoc, updateDoc } from "firebase/firestore";
import {db} from '../firebase'
import {collection, addDoc} from "firebase/firestore"
import moment from "moment";

// import './warningLetter.scss'
export default function UpdateMovieSchedule () {  
    const location = useLocation();
    const [shift, setShift] = useState(location.state.shift);
    const [roomNumber, setRoomNumber] = useState(location.state.roomNumber);
    const [date, setDate] = useState(location.state.date);
    let time =  moment().format("YYYY-MM-DD")
    // console.log(location.state.id);
    // console.log(location.state.name);
    const navigate = useNavigate();
    const back = (e) => {
        e.preventDefault();
        navigate('/view_schedule');
    }
    const updateSchedule = async (e) => {
        e.preventDefault();
        const dataRef = doc(db, 'movie schedule', location.state.id);
        await updateDoc(dataRef, {
            shift : shift,
            roomNumber : roomNumber,
            date : date
        });
        navigate('/view_schedule');
    }
    return (
        <div className ="warning-letter-container">
            <div className = "back">
                <button onClick ={back}>Go Back</button>
            </div>
            <div className ="form-container">
                <form>
                    <h1>Update Movie Schedule</h1>
                    <label forHtml ="">Shift</label>
                    <input type ="number" value = {shift}  onChange = {e => setShift(e.target.value)}/>
                    <label forHtml ="">Room Number</label>
                    <input type ="number" value = {roomNumber} onChange = {e => setRoomNumber(e.target.value)}/>
                    <label forHtml ="">Date</label>
                    <input type ="date" value = {date} onChange = {e => setDate(e.target.value)}/>
                    <button onClick = {updateSchedule}> Update </button>
                </form>
            </div>
        </div>
    )
}