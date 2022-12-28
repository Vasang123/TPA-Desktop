import Navbar from '../navbar.jsx';
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {collection, addDoc, getDocs} from "firebase/firestore"
import {db} from '../firebase'
import './createFacilityReport.scss'
import moment from "moment";
export default function CreateFacilityReport() {
    const employee2 = JSON.parse(sessionStorage.getItem('employee'));
    const [employee, setEmployee] = useState([]);
    const [item, setItem] = useState([]);
    const [description, setDescription] = useState();
    const [itemCode, setItemCode] = useState();
    const [itemName, setItemName] = useState();
    const navigate = useNavigate();
    const CollectionRef = collection(db , "facility and equipment");
    let time =  moment().format("DD-MM-YYYY hh:mm:ss")
    useEffect(() => {
        const employee = JSON.parse(sessionStorage.getItem('employee'));
        setEmployee(employee);

        const getFacility = async () => {
            const data = await getDocs(CollectionRef);
            setItem(data.docs.map((doc)=> ({...doc.data(), id: doc.id})));
        }
        getFacility();
        
    }, [])  

    const createRequest = (e) => {
        e.preventDefault();
        const collectionRef = collection(db, "facility report");
        const payload = {
            createdAt : time,
            description : description,
            itemCode : itemCode,
            employeeId : employee2.id,
            employeeName : employee2.name,
            status : "pending",
            createdAt : time
        };
        addDoc(collectionRef,payload);
        navigate('/dashboard');
    }
    let data = [];

    return(
        <div className = "facility-request">
            <Navbar/>
            <main className ="p-4">
            <div className ="form-container">
                <form>
                    <h1>Create Facility Report</h1>
                    <label htmlFor="item-code">Item Name</label>
                    <select name="item" id="item" onChange={(e) => setItemCode(e.target.value)}>
                    <option value=""></option>
                    {item.map(option => (
                        <option key={option.id} value={option.id}>
                            {option.name}
                        </option>
                    ))}
                    </select>
                    {/* <input type ="text"
                    onChange = { (e) => setItemCode(e.target.value)}/> */}
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