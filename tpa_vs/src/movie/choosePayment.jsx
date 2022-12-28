import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getFirestore, doc, setDoc, updateDoc } from "firebase/firestore";
import {db} from '../firebase'
import {collection, addDoc, getDocs} from "firebase/firestore"
import moment from "moment";

import './createMovieOrder.scss'
export default function ChoosePayment() {  
    const location = useLocation();
    console.log(location.state);
    const [price, setPrice] = useState(location.state.price)
    const navigate = useNavigate();
    const [member, setMember] = useState([])
    const [inputPayment, setInputPayment] = useState()
    const back = (e) => {
        e.preventDefault();
        navigate('/use_member',{
            state : {
                id : location.state.id,
                shift : location.state.shift,
                date : location.state.date,
                roomNumber : location.state.roomNumber,
                price : location.state.price,
                voucherId : location.state.voucherId,
                orderSeat : location.state.orderSeat,
                points : location.state.points,
                memberId : location.state.memberId
            }
        });
    }
    const MemberCollectionRef = collection(db, "membership");
    const usePayment = async (e) => {
        e.preventDefault();
        console.log("sucess")
            navigate('/check_out_movie',{
            state : {
                id : location.state.id,
                shift : location.state.shift,
                date : location.state.date,
                roomNumber : location.state.roomNumber,
                price : location.state.price,
                voucherId : location.state.voucherId,
                memberId : location.state.memberId,
                orderSeat : location.state.orderSeat,
                points : location.state.points,
                payment : inputPayment
            }
        });
    }
    return (
        <div className ="create-container">
            <div className = "back">
                <button onClick ={back}>Go Back</button>
            </div>
            <div className ="form-container">
                <h1> Choose Payment
                </h1>
                <form>
                    <label>Select Payment</label>
                    <select onChange={e => setInputPayment(e.target.value)}>
                        <option value=""></option>
                        <option value="Paypal">Paypal</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Visa">Visa</option>
                        <option value="Mastercard">Mastercard</option>
                        {/* <option value="Cash">Cash</option> */}
                    </select>

                    <button onClick={usePayment}> Choose Payment </button>
                </form>
            </div>
        </div>
    )
}