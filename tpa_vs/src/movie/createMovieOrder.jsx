import { useState, useEffect, useMemo } from 'react';
import { getFirestore, doc, setDoc, updateDoc } from "firebase/firestore";
import {db} from '../firebase'
import {collection, addDoc, getDocs} from "firebase/firestore"
import moment from "moment";
import { Link, useNavigate, useLocation } from "react-router-dom";



import './createMovieOrder.scss'
export default function CreateMovieOrder () {  
    const location = useLocation();
    console.log(location.state)
    const [description, setDescription] = useState(""); 
    const [name, setName] = useState(""); 
    const [order, setOrder] = useState([]); 
    const [type, setType] = useState(""); 
    const [expenses, setExpenses] = useState(""); 
    let time =  moment().format("DD-MM-YYYY")
    const CollectionRef = collection(db , "movie order");
    const [rows, setRows] = useState([]);
    let seat = [];
    let buttons = [];
    let orderSeat = [];
    // console.log(location.state.id);
    // console.log(location.state.name);
    const navigate = useNavigate();
    const back = (e) => {
        e.preventDefault();
        navigate('/view_schedule');
    }
    useEffect(() => {
        const getOrder = async () => {
        const data = await getDocs(CollectionRef);
        setOrder(data.docs.map((doc)=> ({...doc.data(), id: doc.id})));
    }
    getOrder();
    }, []);
    order.map((lr) => {
        // console.log(location.state.shift)
        // console.log(location.state.date)
        // console.log(location.state.roomNumber
        if(location.state.shift == lr.shift && location.state.date == lr.date && location.state.roomNumber == lr.roomNumber){
            // console.log(lr.seat);
            seat.push(
                lr.seat
            )
        }
        
    })
    console.log(location.state);
    const checkVoucher = async (e) => {
        e.preventDefault();
        navigate('/use_voucher',{
            state : {
                id : location.state.id,
                shift : location.state.shift,
                date : location.state.date,
                roomNumber : location.state.roomNumber,
                price : location.state.price,
                orderSeat : orderSeat,
                voucherId : "",
                memberId : ""
            }
        });
    }
    const [active, setActive] = useState(false);
    const handleClick = (e) => {
    //   setActive(!active);
    //   console.log(e.currentTarget.id);
    console.log(e.currentTarget.style.backgroundColor);
      if (e.currentTarget.style.backgroundColor === 'white') {
        e.currentTarget.style.backgroundColor = '#90EE90';
        orderSeat.push(
            e.currentTarget.id
        )
        // console.log("masuk1")
      } else {
        e.currentTarget.style.backgroundColor = 'white';
        const index = orderSeat.indexOf(e.currentTarget.id);
        if (index > -1) { // only splice array when item is found
          orderSeat.splice(index, 1); 
        }
        // console.log("masuk2")
      }
      console.log(orderSeat);
    };
    let  i = 1;     
    let check = 0;
    seat.sort();        
    while(i <=250) {
        if(seat.length > 0){ // ada yg ke booked
            for(let j = 0; j < seat.length; j++){
                if(i == seat[j]){
                    buttons.push(
                        <button value = "{i}" className ="button-seat-booked" disabled>
                            {i}
                        </button>
                    )
                    check =1;
                }

            }
            if(check == 0){

                buttons.push(
                    <button value = "{i}" className={"button-seat-disabled"} 
                    onClick={e => handleClick(e)}
                    style={{backgroundColor : 'white'}}
                    id = {i}>
                        {i}
                    </button>
                )  
            }
            check = 0;
            
        }else{
            buttons.push(
                <button value = "{i}" className={"button-seat-disabled"} 
                    onClick={e => handleClick(e)}
                    style={{backgroundColor : 'white'}}
                    id = {i}>
                        {i}
                    </button>
            )         
        }
       
        i = i +1;
    }
    
    return (
        <div className ="create-container">
            <div className = "back">
                <button onClick ={back}>Go Back</button>
            </div>
            <h1>Choose Seat</h1>
            <div className ="form-container">
                <div className="seat-location">
                    {buttons}
                </div>
                <form>
                    <button onClick={checkVoucher}> Order </button> 
                </form>
            </div>
        </div>
    )
}