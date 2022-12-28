import './create.scss'
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import {collection, addDoc} from "firebase/firestore"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {db} from '../firebase'
const CreateEmployee = () =>{
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [salary, setSalary] = useState("");
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState("");
    const [password, setPassword] = useState("");
    const [department, setDepartment] = useState("");
    const [error1, setError1] = useState(false);
    const [error2, setError2] = useState(false);
    const [error3, setError3] = useState(false);
    const [error4, setError4] = useState(false);
    const [error5, setError5] = useState(false);
    const [error6, setError6] = useState(false);
    const [error7, setError7] = useState(false);
    const [error8, setError8] = useState(false);
    const back = (e) => {
        e.preventDefault();
        navigate('/view_employee');
    }
    const showError = (error,errorElement) =>{
        let errorDiv = document.getElementById(errorElement);
        errorDiv.innerHTML = error;
        return false;
    }

    const createEmployee = async (e) => {
        e.preventDefault();
        const auth = getAuth();
        if(name === ''){
            setError1(true);
        }else
        if(gender === ''){
            setError2(true);
        }else
        if(department === ''){
            setError3(true);
        }else
        if(address === ''){
            setError4(true);
        }else
        if(email === ''){
            setError5(true);
        }else
        if(phone === ''){
            setError6(true);
        }else
        if(salary < 1000000 || salary > 4000000){
            setError7(true);
        }else
        if(password.length <= 6){
            setError8(true);
        }else{
            let id = "";
            const collectionRef = collection(db, "employee");
            const payload = {
                address : address,
                contract : 'active',
                name : name,
                gender : gender,
                department : department,
                email : email,
                phone : phone,
                salary : salary,
                dob : dob,
                status : "active"
            };
            addDoc(collectionRef,payload).then(function (docRef) {
                let i = 1;
                while(i <= 6){
                    let workingPayload = {
                        day : i++,
                        employeeId : docRef.id,
                        endTime : "17:00",
                        startTime : "09:00",
                        status : "active",
   
                    };
                    addDoc(workingRef, workingPayload);
                }
            });
            const workingRef = collection(db, "working time");
            
           


            createUserWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                const user = userCredential.user;
                // ...
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
            navigate("/view_employee")
        }
        
    }
    return (
        <div className = "create">
            <div className = "back">
                <button onClick ={back}>Go Back</button>
            </div>
            <div className ="form-container">
                <form>
                    <h1>Insert Employee</h1>
                    <label htmlFor="name">Full Name</label>
                    <input type="text" name ="name" id="name" 
                    onChange={ (e) => setName(e.target.value)}/>
                    {error1 && <span>Name can't be empty</span>}
                    <label htmlFor="gender">Gender</label>

                    <div className ="genderContainer"> 
                        <div className="temp">
                            <input type="radio" name ="gender" id="gender" value="Male" 
                            onChange={ (e) => setGender(e.target.value)}/> 
                            <label> Male </label>
                            <input type="radio" name ="gender" id="gender" value="Female"
                            onChange={ (e) => setGender(e.target.value)}/>
                            <label> Female </label>
                        </div>
                        {error2 && <span>Gender must be choosen</span>}
                    </div>
                    
                    <label htmlFor="dob">Date Of Birth</label>
                    <input type="date" name ="dob" id="dob" 
                    onChange={ (e) => setDob(e.target.value)}/>


                    <label htmlFor="department">Department</label>
                    <select onChange ={e => setDepartment(e.target.value)}>
                        <option value =""></option>
                        <option value ="Administrator">Administrator</option> 
                        <option value ="Manager">Manager</option>
                        <option value ="Accounting and Finance Department">Accounting and Finance Department</option>
                        <option value ="HRD">HRD</option>
                        <option value ="Promo And Event Department">Promo And Event Department</option>
                        <option value ="Storage Department">Storage Department</option>
                        <option value ="External Department">External Department</option>
                        <option value ="Movie Front Office Division">Movie Front Office Division</option>
                        <option value ="Schedule Division">Schedule Division</option>
                        <option value ="Operation Division">Operation Division</option>
                        <option value ="Cafe Front Office Department">Cafe Front Office Department</option>
                        <option value ="Kitchen Division">Kitchen Division</option>
                    </select>
                    
                    <label htmlFor="address">Address</label>
                    <textarea name ="address" id="address"
                    onChange={ (e) => setAddress(e.target.value)}> 
                    </textarea>
                    {error4 && <span>Address can't be empty</span>}

                    <label htmlFor="email">Email</label>
                    <input type="email" name ="email" id="email"
                    onChange={ (e) => setEmail(e.target.value)}/>
                    {error5 && <span>Email can't be empty</span>}

                    <label htmlFor="phone">Phone</label>
                    <input type="text" name ="phone" id="phone"
                    onChange={ (e) => setPhone(e.target.value)}/>
                    {error6 && <span>Phone can't be empty</span>}

                    <label htmlFor="salary">Salary</label>
                    <input type="number" name ="salary" id="salary"
                    onChange={ (e) => setSalary(e.target.value)}/>
                    {error7 && <span>Salary must be between 1000000 and 4000000</span>}

                    <label htmlFor="password">Password</label>
                    <input type="string" name ="password" id="password"
                    onChange={ (e) => setPassword(e.target.value)}/>
                    {error8 && <span>Password length must be greater than 6</span>}

                    <button onClick={createEmployee}> Create </button>
                </form>
            </div>
        </div>
    );

}
export default CreateEmployee