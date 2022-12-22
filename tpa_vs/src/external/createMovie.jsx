import './createMovie.scss'
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import {collection, addDoc} from "firebase/firestore"
import {db} from '../firebase'
import moment from "moment";
export default function CreateMovie(){
    const navigate = useNavigate();
    const [movieName, setMovieName] = useState();
    const [duration, setDuration] = useState();
    const [producer, setProducer] = useState();
    const [releaseDate, setReleaseDate] = useState();
    const back = (e) => {
        e.preventDefault();
        navigate('/view_movie_details');
    }
    const showError = (error,errorElement) =>{
        let errorDiv = document.getElementById(errorElement);
        errorDiv.innerHTML = error;
        return false;
    }
    let date = new Date();
    let time = moment().format("DD/MM/YYYY")
    const createMovie = async (e) => {
            e.preventDefault();
            const collectionRef = collection(db, "movie producer");
            const payload = {
                duration: duration,
                movieName : movieName,
                producer : producer,  
                registeredAt : time,
                releaseDate : releaseDate,
                status : "pending",
            };
            addDoc(collectionRef,payload);
            navigate("/view_movie_details")
    }
    return (
        <div className = "create">
            <div className = "back">
                <button onClick ={back}>Go Back</button>
            </div>
            <div className ="form-container">
                <form>
                    <h1>Insert Movie</h1>
                    <label htmlFor="duration">Movie Duration (minutes)</label>
                    <input type="number" name ="duration" id="duration" 
                    onChange={ (e) => setDuration(e.target.value)}/>

                    <label htmlFor="name">Movie Name</label>
                    <input type="text" name ="name" id="name" 
                    onChange={ (e) => setMovieName(e.target.value)}/>

                    <label htmlFor="producer">Producer</label>
                    <input type="text" name ="producer" id="producer" 
                    onChange={ (e) => setProducer(e.target.value)}/>

                  
                    <label htmlFor="release-date">Release Date</label>
                    <input type="date" name ="release-date" id="release-date" 
                    onChange={ (e) => setReleaseDate(e.target.value)}/>
                    <button onClick={createMovie}> Create </button>
                </form>
            </div>
        </div>
    );

}
