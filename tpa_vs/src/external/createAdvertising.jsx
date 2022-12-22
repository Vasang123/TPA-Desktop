import './createMovie.scss'
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import {collection, addDoc} from "firebase/firestore"
import {db} from '../firebase'
import moment from "moment";
export default function CreateAdvertising(){
    const navigate = useNavigate();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [type, setType] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [duration, setDuration] = useState();
    const [producer, setProducer] = useState();
    const back = (e) => {
        e.preventDefault();
        navigate('/view_advertising');
    }

    const createAdvertising = async (e) => {
            e.preventDefault();
            const collectionRef = collection(db, "advertisements");
            const payload = {
                email : email,
                endDate : endDate,
                name : name,
                phone : phone,
                startDate : startDate,
                status : "pending",
                type : type,
            };
            addDoc(collectionRef,payload);
            navigate("/view_advertising")
    }
    return (
        <div className = "create">
            <div className = "back">
                <button onClick ={back}>Go Back</button>
            </div>
            <div className ="form-container">
                <form>
                    <h1>Insert Advertisements</h1>

                    <label htmlFor="name">Brand Name</label>
                    <input type="text" name ="name" id="name" 
                    onChange={ (e) => setName(e.target.value)}/>

                    <label htmlFor="email">Brand Email</label>
                    <input type="email" name ="email" id="email" 
                    onChange={ (e) => setEmail(e.target.value)}/>

                    <label htmlFor="phone">Brand Phone</label>
                    <input type="text" name ="phone" id="phone" 
                    onChange={ (e) => setPhone(e.target.value)}/>

                    <label htmlFor="type">Brand Type</label>
                    <input type="text" name ="type" id="type" 
                    onChange={ (e) => setType(e.target.value)}/>

                    <label htmlFor="start-date">Start Date</label>
                    <input type="date" name ="startd-date" id="start-date" 
                    onChange={ (e) => setStartDate(e.target.value)}/>

                    <label htmlFor="end-date">Start Date</label>
                    <input type="date" name ="end-date" id="end-date" 
                    onChange={ (e) => setEndDate(e.target.value)}/>


                    <button onClick={createAdvertising}> Create </button>
                </form>
            </div>
        </div>
    );

}
