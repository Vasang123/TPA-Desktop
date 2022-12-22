import Navbar from '../navbar.jsx';
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import {collection, addDoc} from "firebase/firestore"
import {db} from '../firebase'
import './leaveRequest.scss'
export default function CreateLeaveRequest() {
    
    const [employee, setEmployee] = useState([]);
    const [startDate, setStartDate] = useState();
    
    const [endDate, setEndDate] = useState();
    const [description, setDescription] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        const employee = JSON.parse(sessionStorage.getItem('employee'));
        setEmployee(employee);
    }, [])  
    const createRequest = (e) => {
        e.preventDefault();
        const collectionRef = collection(db, "leave request");
        const payload = {
            description : description,
            employeeId : employee.id,
            employeeName : employee.name,
            endDate : endDate,
            startDate : startDate,
            status : "pending"
        };
        addDoc(collectionRef,payload);
        navigate('/dashboard');
    }
    return(
        <div className = "leave-request">
            <Navbar/>
            <main className ="p-4">
            <div className ="form-container">
                <form>
                    <h1>Create Leave Request</h1>


                    <label htmlFor="startDate">Start Date</label>
                    <input type="date" name ="startDate" id="startDate"
                    onChange = { (e) => setStartDate(e.target.value)} />

                    <label htmlFor="endDate">End Date</label>
                    <input type="date" name ="endDate" id="endDate"
                    onChange = { (e) => setEndDate(e.target.value)}/>

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