import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getFirestore, doc, setDoc, updateDoc } from "firebase/firestore";
import {db} from '../firebase'
import {collection, addDoc, getDocs} from "firebase/firestore"
import moment from "moment";

import './createMovieOrder.scss'
export default function UseVoucher() {  
    const location = useLocation();
    console.log(location.state);
    const navigate = useNavigate();
    const [voucher, setVoucher] = useState([])
    const [inputVoucher, setInputVoucher] = useState(location.state.voucherId)
    const back = (e) => {
        e.preventDefault();
        navigate('/create_movie_order',{
            state : {
                id : location.state.id,
                shift : location.state.shift,
                date : location.state.date,
                roomNumber : location.state.roomNumber,
                price : location.state.price,
            }
        });
    }
    const VoucherCollectionRef = collection(db, "voucher");
    let check = 0;
    useEffect(() => {
        const getVoucher = async () => {
            const data = await getDocs(VoucherCollectionRef);
            setVoucher(data.docs.map((doc)=> ({...doc.data(), id: doc.id})));
        }
        getVoucher();
    }, []);
    let temp = 0;
    const useVoucher = async (e) => {
        e.preventDefault();
        voucher.map((data) => {
            if(data.id == inputVoucher 
                && data.type == "Movie" 
                && data.status == "active"
                ){
                
                // Nanti
                // const docRef = doc(db, "voucher", data.id);
                // updateDoc(docRef, {
                //     status: "used"
                // });
                console.log("masuk1")
                check = 1;
                temp = location.state.price - data.discountPrice;
                // setPrice(temp);
            }
            // console.log(inputVoucher)
        })
         
        if(check == 1){
            console.log(temp)
            navigate('/use_member',{
                state : {
                    id : location.state.id,
                    shift : location.state.shift,
                    date : location.state.date,
                    roomNumber : location.state.roomNumber,
                    price : location.state.price,
                    voucherId : inputVoucher,
                    orderSeat : location.state.orderSeat,
                    memberId : location.state.memberId
                }
            });
        }else{
            console.log("failed");
        }
    }
    const nextPage = async (e) => {
        navigate('/use_member',{
            state : {
                id : location.state.id,
                shift : location.state.shift,
                date : location.state.date,
                roomNumber : location.state.roomNumber,
                price : location.state.price,
                voucherId : "",
                orderSeat : location.state.orderSeat,
                memberId : location.state.memberId
            }
        });
    }
    return (
        <div className ="create-container">
            <div className = "back">
                <button onClick ={back}>Go Back</button>
            </div>
            <div className ="form-container">
                <h1> Input Voucher
                </h1>
                <form>
                    <label> Input Voucher
                    </label>
                    <input type= "text" value = {inputVoucher}
                    onChange = {e => setInputVoucher(e.target.value)}/>
                    <div className="button-container">
                        <button onClick={nextPage}> Skip </button>
                        <button onClick={useVoucher}> Use Voucher </button>
                    </div>
                </form>
            </div>
        </div>
    )
}