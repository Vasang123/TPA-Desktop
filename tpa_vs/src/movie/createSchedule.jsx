import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { getFirestore, doc, setDoc, updateDoc } from "firebase/firestore";
import {db} from '../firebase'
import {collection, addDoc} from "firebase/firestore"
import moment from "moment";
import momentRandom from "moment-random"
import './createSchedule.scss'
export default function CreateSchedule () {  
    const location = useLocation();
    const [startDate, setStartDate] = useState(""); 
    const [endDate, setEndDate] = useState(""); 
    const [quantity, setQuantity] = useState(""); 
    const [roomNum, setRoomNum] = useState(""); 
    const [price, setPrice] = useState(""); 
    const [shift, setShift] = useState(""); 
    let time =  moment().format("DD-MM-YYYY")
    // console.log(location.state.id);
    // console.log(location.state.name);
    const navigate = useNavigate();
    const back = (e) => {
        e.preventDefault();
        navigate('/view_movie_contract');
    }
    function randomNumberInRange(min, max) {
        // 👇️ get number between min (inclusive) and max (inclusive)
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const createSchedule= async (e) => {
        e.preventDefault();
        const collectionRef = collection(db, "movie schedule");
        let i = 0;
        
        while(i < quantity){
            let temp = momentRandom(endDate, startDate).format("YYYY-MM-DD")
            
            const payload = {
                date : temp,
                roomNumber : randomNumberInRange(1,10),
                seat : 250,
                price : price,
                shift : randomNumberInRange(1,8),
                status : "active",
                movieId : location.state.id,
                movieName : location.state.name,
                image : location.state.image
            };
            addDoc(collectionRef,payload);      
            i = i +1;
        }

        navigate('/view_movie_contract');
    }
    return (
        <div className = "create">
        <div className = "back">
            <button onClick ={back}>Go Back</button>
        </div>
        <div className ="form-container">
            <form>
                <h1>Generate Schedule</h1>

                <label htmlFor="start-date">Start Date</label>
                <input type="date" name ="startd-date" id="start-date" 
                onChange = {e => setStartDate(e.target.value)}/>

                <label htmlFor="end-date">End Date</label>
                <input type="date" name ="end-date" id="end-date" 
                onChange = {e => setEndDate(e.target.value)}/>

                <label htmlFor="quantity">Ticket Price (Rp)</label>
                <input type="number" name ="quantity" id="quantity" 
                onChange = {e => setPrice(e.target.value)}/>

                <label htmlFor="quantity">Quantity</label>
                <input type="number" name ="quantity" id="quantity" 
                onChange = {e => setQuantity(e.target.value)}/>

                <button onClick={createSchedule}> Generate </button>
            </form>
        </div>
    </div>
    )
}