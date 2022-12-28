import Navbar from '../navbar.jsx';
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {collection, addDoc} from "firebase/firestore"
import {db, storage} from '../firebase'
import './createCommunication.scss'
import moment from "moment";
import {v4} from 'uuid'
import { ref, uploadBytes } from "firebase/storage";
export default function CreateCommunication() {
    const [description, setDescription] = useState();
    const [image, setImage] = useState();
    const [type, setType] = useState();
    const navigate = useNavigate();
    let time =  moment().format("DD-MM-YYYY")
    const name = v4();
    const storageRef = ref(storage, `communication/${name}`);

    // 'file' comes from the Blob or File API
    const createCom = (e) => {
        e.preventDefault();
        uploadBytes(storageRef, image)
        const collectionRef = collection(db, "communication");

        const payload = {
            createdAt : time,
            description : description,
            type : type,
            image : name,
        };
        addDoc(collectionRef,payload);
        navigate('/dashboard');
    }
    return(
        <div className = "communication-request">
            <Navbar/>
            <main className ="p-4">
            <div className ="form-container">
                <form>
                    <h1>Record Communication</h1>
                    <label htmlFor="image">Image</label>
                    <input type ="file"
                    onChange = { (e) => setImage(e.target.files[0])}/>
                    <label htmlFor="type">Type</label>
                    <select onChange={(e) => setType(e.target.value)}>
                        <option value=""></option>
                        <option value="Movie Producer">Movie Producer</option>
                        <option value="Food And Beverage Supplier">Food And Beverage Supplier</option>
                        <option value="Advertising Partner">Advertising Partner</option>
                    </select>
                    <label htmlFor="description">Description</label>
                    <textarea name ="description" id="description"
                    onChange = { (e) => setDescription(e.target.value)}> 
                    </textarea>

                    <button onClick={createCom}> Create </button>
                </form>
            </div>
            </main>
        </div>
    )
}