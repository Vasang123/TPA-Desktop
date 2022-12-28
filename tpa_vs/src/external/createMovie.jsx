import './createMovie.scss'
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import {collection, addDoc} from "firebase/firestore"
import {db, storage} from '../firebase'
import moment from "moment";
import {v4} from 'uuid'
import { ref, uploadBytes } from "firebase/storage";
import { getStorage, getDownloadURL } from "firebase/storage";
export default function CreateMovie(){
    const navigate = useNavigate();
    const [movieName, setMovieName] = useState();
    const [duration, setDuration] = useState();
    const [description, setDescription] = useState();
    const [producer, setProducer] = useState();
    const [releaseDate, setReleaseDate] = useState();
    const [endDate, setEndDate] = useState();
    const [image, setImage] = useState();
    const name = v4();
    const storageRef = ref(storage, `movie/${name}`);
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
    let time = moment().format("YYYY-MM-DD")
    const createMovie = async (e) => {
            e.preventDefault();
            const collectionRef = collection(db, "movie producer");
            let payload = {};
            await uploadBytes(storageRef, image)
            let starsRef = ref(storage, `movie/${name}`);
            // return await getDownloadURL(starsRef)
            payload = {
                image :await getDownloadURL(starsRef),
                duration: duration,
                movieName : movieName,
                producer : producer,  
                registeredAt : time,
                description : description,
                releaseDate : releaseDate,
                endDate : endDate,
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
                    <label htmlFor="image">Image</label>
                    <input type ="file" 
                    onChange = { (e) => setImage(e.target.files[0])}/>

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

                    <label htmlFor="release-date">End Date</label>
                    <input type="date" name ="release-date" id="release-date" 
                    onChange={ (e) => setEndDate(e.target.value)}/>

                    <label htmlFor="description">Movie Description</label>
                    <textarea name ="description" id="description"
                    onChange={ (e) => setDescription(e.target.value)}> 
                    </textarea>
                    <button onClick={createMovie}> Create </button>
                </form>
            </div>
        </div>
    );

}
