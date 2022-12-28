import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getFirestore, doc, setDoc, updateDoc } from "firebase/firestore";
import {db} from '../firebase'
import {collection, addDoc, getDocs} from "firebase/firestore"
import moment from "moment";

import './createMovieOrder.scss'
export default function UseMember() {  
    const location = useLocation();
    console.log(location.state);
    const navigate = useNavigate();
    const [member, setMember] = useState([])
    const [inputMember, setInputMember] = useState(location.state.memberId)
    const back = (e) => {
        e.preventDefault();
        navigate('/use_voucher',{
            state : {
                id : location.state.id,
                shift : location.state.shift,
                date : location.state.date,
                roomNumber : location.state.roomNumber,
                price : location.state.price,
                voucherId : location.state.voucherId,
                orderSeat : location.state.orderSeat,
                memberId : location.state.memberId
            }
        });
    }
    const MemberCollectionRef = collection(db, "membership");
    let check = 0;
    useEffect(() => {
        const getMember = async () => {
            const data = await getDocs(MemberCollectionRef);
            setMember(data.docs.map((doc)=> ({...doc.data(), id: doc.id})));
        }
        getMember();
    }, []);
    let points = 0;
    const useMember = async (e) => {
        e.preventDefault();
        member.map((data) => {
            if(data.id == inputMember 
                && data.status == "active"
                ){
                console.log("masuk1")
                check = 1;
                points = data.points
            }
            // console.log(inputVoucher)
        })
         
        if(check == 1){
            console.log("sucess")
            navigate('/choose_payment',{
                state : {
                    id : location.state.id,
                    shift : location.state.shift,
                    date : location.state.date,
                    roomNumber : location.state.roomNumber,
                    price : location.state.price,
                    voucherId : location.state.voucherId,
                    orderSeat : location.state.orderSeat,
                    memberId : inputMember,
                    points : points
                }
            });
        }else{
            console.log("failed");
        }
    }
    const nextPage = async (e) => {
        navigate('/choose_payment',{
            state : {
                id : location.state.id,
                shift : location.state.shift,
                date : location.state.date,
                roomNumber : location.state.roomNumber,
                price : location.state.price,
                voucherId : location.state.voucherId,
                orderSeat : location.state.orderSeat,
                memberId : "",
                points : 0
            }
        });
    }
    return (
        <div className ="create-container">
            <div className = "back">
                <button onClick ={back}>Go Back</button>
            </div>
            <div className ="form-container">
                <h1> Input Member
                </h1>
                <form>
                    <label> Input Member Id
                    </label>
                    <input type= "text" value = {inputMember} 
                    onChange = {e => setInputMember(e.target.value)}/>
                    <div className="button-container">
                        <button onClick={nextPage}> Skip </button>
                        <button onClick={useMember}> Use Member Card </button>
                    </div>
                    <button onClick={useMember}> Create Membership </button>
                </form>
            </div>
        </div>
    )
}