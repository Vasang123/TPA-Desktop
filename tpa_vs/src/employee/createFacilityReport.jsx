import Navbar from '../navbar.jsx';
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {collection, addDoc} from "firebase/firestore"
import {db} from '../firebase'
import './createFacilityReport.scss'
import moment from "moment";
export default function CreateFacilityReport() {
    
    const [employee, setEmployee] = useState([]);
    const [description, setDescription] = useState();
    const [itemCode, setItemCode] = useState();
    const navigate = useNavigate();

    let date = new Date();
    let time =  moment().format("DD-MM-YYYY hh:mm:ss")
    useEffect(() => {
        const employee = JSON.parse(sessionStorage.getItem('employee'));
        setEmployee(employee);
    }, [])  
    const createRequest = (e) => {
        e.preventDefault();
        const collectionRef = collection(db, "purchase request");
        const payload = {
            createdAt : time,
            description : description,
            itemCode : itemCode,
            status : "pending"
        };
        addDoc(collectionRef,payload);
        navigate('/dashboard');
    }
    return(
        <div className = "facility-request">
            <Navbar/>
            <main className ="p-4">
            <div className ="form-container">
                <form>
                    <h1>Create Facility Report</h1>
                    <label htmlFor="item-code">Item Code</label>
                    <input type ="text"
                    onChange = { (e) => setItemCode(e.target.value)}/>
                    <label htmlFor="description">Description</label>
                    <textarea name ="description" id="description"
                    onChange = { (e) => setDescription(e.target.value)}> 
                    </textarea>

                    <button onClick={createRequest}> Create </button>
                </form>
            </div>
            </main>
        </div>
    )
}