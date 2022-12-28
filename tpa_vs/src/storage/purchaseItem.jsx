import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { getFirestore, doc, setDoc, updateDoc } from "firebase/firestore";
import {db} from '../firebase'
import {collection, addDoc} from "firebase/firestore"
import moment from "moment";

import './purchase.scss'
export default function PurchaseItem () {  
    const location = useLocation();
    const [description, setDescription] = useState(""); 
    const [name, setName] = useState(""); 
    const [type, setType] = useState(""); 
    const [expenses, setExpenses] = useState(""); 
    let time =  moment().format("DD-MM-YYYY")
    // console.log(location.state.id);
    // console.log(location.state.name);
    const navigate = useNavigate();
    const back = (e) => {
        e.preventDefault();
        navigate('/view_fund');
    }
    const createItem = async (e) => {
        e.preventDefault();
        const collectionRef = collection(db, "expenses");
        const FacilityCollectionRef = collection(db, "facility and equipment");
        const FundCollectionRef = doc(db, "purchase request", location.state.id);
        const payload = {
            createdAt : time,
            totalExpenses : expenses,
            description : location.state.description
        };
        const payload2 = {
            description : description,
            lastMaintenance : time,
            lastUsed : "none",
            name :  name,
            quantity : location.state.quantity,
            status : "available",
            type : type
        }
        updateDoc(FundCollectionRef, {
            status1 : "purchased",
            status2 : "purchased",
        
        })
        addDoc(collectionRef,payload);
        addDoc(FacilityCollectionRef,payload2);
        navigate('/view_fund');
    }
    return (
        <div className ="warning-letter-container">
            <div className = "back">
                <button onClick ={back}>Go Back</button>
            </div>
            <div className ="form-container">
                <form>
                    <h1>Create Purchase Item</h1>
                    <label htmlFor="name"> <b>Fund Given : Rp. {location.state.fund}</b></label>

                    <label htmlFor="">Total Expenses</label>
                    <input type="number" 
                    onChange={(e) => setExpenses(e.target.value)} />

                    <label htmlFor="">Item Name</label>
                    <input type="text" 
                    onChange={(e) => setName(e.target.value)} />

                    <label htmlFor="">Item Type</label>
                    <input type="text" 
                    onChange={(e) => setType(e.target.value)} />

                    <label htmlFor="description">Item Description</label>
                    <textarea name ="description" id="description"
                    onChange={ (e) => setDescription(e.target.value)}> 
                    </textarea>

                    <button onClick={createItem}> Create </button>
                </form>
            </div>
        </div>
    )
}