import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import {collection, addDoc} from "firebase/firestore"
import {db} from '../firebase'
import moment from "moment";
import './createVoucher.scss'
export default function CreateVoucher(){
    const navigate = useNavigate();
    const [type, setType] = useState();
    const [description, setDescription] = useState();
    const [discountPrice, setDiscountPrice] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [quantity, setQuantity] = useState();
    let time =  moment().format("DD-MM-YYYY")
    const back = (e) => {
        e.preventDefault();
        navigate('/view_promo');
    }

    const createVoucher = async (e) => {
            e.preventDefault();
            const collectionRef = collection(db, "voucher");
            let i = 0;
            
            while(i < quantity){
                const payload = {
                    description : description,
                    discountPrice : discountPrice,
                    endDate : endDate,
                    startDate : startDate,
                    status : "active",
                    type : type,
                };
                addDoc(collectionRef,payload);      
                i = i +1;
            }
            navigate("/view_promo")
    }
    return (
        <div className = "create">
            <div className = "back">
                <button onClick ={back}>Go Back</button>
            </div>
            <div className ="form-container">
                <form>
                    <h1>Generate Promo</h1>

                    <label htmlFor="description">Description</label>
                    <textarea name ="description" id="description"
                    onChange = { (e) => setDescription(e.target.value)}> 
                    </textarea>

                    <label htmlFor="discount">Discount Price</label>
                    <input type="number" name ="discount" id="discount" 
                    onChange={ (e) => setDiscountPrice(e.target.value)}/>

                    <label htmlFor="type">Promo Type</label>
                    <select onChange={(e) => setType(e.target.value)}>
                        <option value=""></option>
                        <option value="Movie">Movie</option>
                        <option value="Food And Beverage">Food And Beverage</option>
                    </select>

                    <label htmlFor="start-date">Start Date</label>
                    <input type="date" name ="startd-date" id="start-date" 
                    onChange={ (e) => setStartDate(e.target.value)}/>

                    <label htmlFor="end-date">End Date</label>
                    <input type="date" name ="end-date" id="end-date" 
                    onChange={ (e) => setEndDate(e.target.value)}/>

                    <label htmlFor="quantity">Quantity</label>
                    <input type="number" name ="quantity" id="quantity" 
                    onChange={ (e) => setQuantity(e.target.value)}/>

                    <button onClick={createVoucher}> Generate </button>
                </form>
            </div>
        </div>
    );

}
