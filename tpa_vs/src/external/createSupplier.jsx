import './createSupplier.scss'
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import {collection, addDoc} from "firebase/firestore"
import {db} from '../firebase'
import moment from "moment";
export default function CreateSupplier(){
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [type, setType] = useState();
    const back = (e) => {
        e.preventDefault();
        navigate('/view_supplier');
    }
    const showError = (error,errorElement) =>{
        let errorDiv = document.getElementById(errorElement);
        errorDiv.innerHTML = error;
        return false;
    }

    let time = moment().format("DD/MM/YYYY")
    const createSupplier = async (e) => {
            e.preventDefault();
            const collectionRef = collection(db, "food and beverage supplier");
            const payload = {
                email: email,
                name: name,
                phone: phone,
                registeredAt: time,
                status : "active",
                type : type,
            };
            addDoc(collectionRef,payload);
            navigate("/view_supplier")
    }
    return (
        <div className = "create">
            <div className = "back">
                <button onClick ={back}>Go Back</button>
            </div>
            <div className ="form-container">
                <form>
                    <h1>Insert Supplier</h1>
                    <label htmlFor="email">Supplier Email</label>
                    <input type="email" name ="email" id="email" 
                    onChange={ (e) => setEmail(e.target.value)}/>

                    <label htmlFor="name">Supplier Name</label>
                    <input type="text" name ="name" id="name" 
                    onChange={ (e) => setName(e.target.value)}/>


                    <label htmlFor="phone">Supplier Phone</label>
                    <input type="text" name ="phone" id="phone" 
                    onChange={ (e) => setPhone(e.target.value)}/>


                    <label htmlFor="type">Supplier Type</label>
                    <input type="text" name ="type" id="type" 
                    onChange={ (e) => setType(e.target.value)}/>
                    
                    <button onClick={createSupplier}> Create </button>
                </form>
            </div>
        </div>
    );

}
