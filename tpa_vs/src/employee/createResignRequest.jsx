import Navbar from '../navbar.jsx';
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {collection, addDoc} from "firebase/firestore"
import {db} from '../firebase'
import './createResignRequest.scss'
import moment from "moment";
export default function CreateResignRequest() {
    
    const [employee, setEmployee] = useState([]);
    const [description, setDescription] = useState();
    const [resignDate, setResignDate] = useState();
    const navigate = useNavigate();

    let date = new Date();
    let time =  moment().format("DD-MM-YYYY hh:mm:ss")
    useEffect(() => {
        const employee = JSON.parse(sessionStorage.getItem('employee'));
        setEmployee(employee);
    }, [])  
    const createRequest = (e) => {
        e.preventDefault();
        const collectionRef = collection(db, "resignation request");
        const payload = {
            date : time,
            description : description,
            employeeId : employee.id,
            resignDate : resignDate,
            status : "pending"
        };
        addDoc(collectionRef,payload);
        navigate('/dashboard');
    }
    return(
        <div className = "resign-request">
            <Navbar/>
            <main className ="p-4">
            <div className ="form-container">
                <form>
                    <h1>Create Resignation Request</h1>
                    <label htmlFor="resign-date">Resign Date</label>
                    <input type ="date"
                    onChange = { (e) => setResignDate(e.target.value)}/>
                
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