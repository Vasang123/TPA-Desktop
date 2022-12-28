import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getFirestore, doc, setDoc, updateDoc } from "firebase/firestore";
import {db} from '../firebase'
import {collection, addDoc, getDocs} from "firebase/firestore"
import moment from "moment";

// import './purchase.scss'
export default function CheckOutOrder() {  
    const location = useLocation();
    console.log(location.state);
    const [description, setDescription] = useState(""); 
    const [name, setName] = useState(""); 
    const [member, setMember] = useState([])
    const [orderSeat, setoOrderSeat] = useState(location.state.orderSeat); 
    const [expenses, setExpenses] = useState(""); 
    const [card, setCardNumber] = useState(""); 
    const [voucher, setVoucher] = useState([])
    let time =  moment().format("DD-MM-YYYY")
    // console.log(location.state.id);
    // console.log(location.state.name);
    const navigate = useNavigate();
    const back = (e) => {
        e.preventDefault();
        navigate('/choose_payment',{
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
                payment : location.state.payment
            }
        });
    }
    const VoucherCollectionRef = collection(db, "voucher");
    useEffect(() => {
        const getVoucher = async () => {
            const data = await getDocs(VoucherCollectionRef);
            setVoucher(data.docs.map((doc)=> ({...doc.data(), id: doc.id})));
        }
        getVoucher();
    }, []);

    let temp = 0;
    if(location.state.voucherId == ""){
        temp = location.state.price;
    }
    let discount = 0;
    voucher.map((data) => {
        if(data.id == location.state.voucherId 
            && data.type == "Movie" 
            && data.status == "active"
            ){
            
            // Nanti
           
            console.log("masuk1")
            discount = data.discountPrice;
            temp = location.state.price - data.discountPrice;
            // setPrice(temp);
        }
        // console.log(inputVoucher)
    })
    // let check = 0;
    const createItem = async (e) => {
        e.preventDefault();
        if(location.state.voucherId != ""){
            const docRef = doc(db, "voucher", location.state.voucherId);
            updateDoc(docRef, {
                status: "used"
            });
        }
        if(location.state.memberId != ""){
            const docRef2 = doc(db, "membership", location.state.memberId);
            updateDoc(docRef2, {
                points : location.state.points + (temp * location.state.orderSeat.length/100 )
            });
        }
        const OrderCollectionRef = collection(db, "movie order");
        const RevenueCollectionRef = collection(db, "revenue");
       
        const payload2 = {
            createdAt : time,
            paymentType : location.state.payment,
            status : "success",
            totalPrice : temp * location.state.orderSeat.length,
            type : "Movie Order"
        }
        addDoc(RevenueCollectionRef,payload2);
        for (let index = 0; index < orderSeat.length; index++) {
            const payload = {
                date : location.state.date,
                createdAt : time,
                roomNumber : location.state.roomNumber,
                seat : orderSeat[index],
                shift : location.state.shift,
                paymentType : location.state.payment
            };
            addDoc(OrderCollectionRef,payload);
            
        }
        navigate('/view_schedule');
        
    }
    // const getSeatBooked = orderSeat.map((e) =>{
    //     return(
    //         <h5>
    //             e[0].
    //         </h5>
    //     );
    // })
    let i = 0;
    console.log(location.state.orderSeat);
    return (
        <div className ="create-container">
            <div className = "back">
                <button onClick ={back}>Go Back</button>
            </div>
            <div className ="form-container">
                <form>
                    <h1>Check Out Order</h1>
                    <h5 htmlFor="name"> 
                    Seat :
                    {
                        orderSeat.join(', ')
                    }
                    </h5>
                    <h5 htmlFor="name">  
                    Voucher Discount : Rp. {discount}
                    </h5>
                    <h5 htmlFor="name">  
                    Member Points : +{temp * location.state.orderSeat.length/100} points
                    </h5>
                    <h5 htmlFor="name">  
                    Ticket Price : Rp. {temp}
                    </h5>
                    <h5 htmlFor="name">  
                    <b>Total Price : Rp. {temp * location.state.orderSeat.length}</b>
                    </h5>
                    <h5 htmlFor="name">  
                    Payment : {location.state.payment}
                    </h5>
                    <input type="text" className="card-number" placeholder ="Card Number"/>


                    <button onClick={createItem}> Create Order</button>
                </form>
            </div>
        </div>
    )
}