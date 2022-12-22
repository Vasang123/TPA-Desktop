import Navbar from '../navbar.jsx';
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {collection, addDoc} from "firebase/firestore"
import {db} from '../firebase'
import './createFundRequest.scss'
import moment from "moment";
export default function CreateFundRequest() {
    
    const [employee, setEmployee] = useState([]);
    const [description, setDescription] = useState();
    const [quantity, setQuantity] = useState();
    const [price, setprice] = useState();
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
            date : time,
            description : description,
            employeeId : employee.id,
            price : price,
            quantity : quantity,
            status1  : "pending",
            status2 : "pending"
        };
        addDoc(collectionRef,payload);
        navigate('/dashboard');
    }
    return(
        <div className = "fund-request">
            <Navbar/>
            <main className ="p-4">
            <div className ="form-container">
                <form>
                    <h1>Create Fund Request</h1>
                    <label htmlFor="price">Price</label>
                    <input type ="number"
                    onChange = { (e) => setprice(e.target.value)}/>
                    
                    <label htmlFor="quantity">Quantity</label>
                    <input type = "number"
                    onChange = { (e) => setQuantity(e.target.value)}/>
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