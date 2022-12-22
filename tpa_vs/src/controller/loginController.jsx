import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { db } from '../firebase'
import {collection, getDocs} from 'firebase/firestore'
import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
export function ValidateLogin({email, password, error, setError}){
    const navigate = useNavigate();
    const [employee, setEmployee] = useState([]);
    const usersCollectionRef = collection(db , "employee");
    useEffect(() => {
        const getEmployee = async () => {
        const data = await getDocs(usersCollectionRef);
        setEmployee(data.docs.map((doc)=> ({...doc.data(), id: doc.id})));
        }
        getEmployee();
    }, []);
    const handleLogin = (e) => {
        e.preventDefault();
        // console.log("masuk");
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            employee.map((employee) => {
                if(employee.email == email){
                    sessionStorage.setItem(
                        "employee", JSON.stringify(employee)
                    );
                }
            });
            
            // console.log("sussce");
            navigate('/dashboard');
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError("true");
            // console.log(errorMessage);
            // console.log(errorCode);
        });
      };
    return (
        <div className="temp" style = {{width : "50%"}}>
            <button type='submit'  onClick={ handleLogin}>
            Login
            </button>
            
            {error && 
            <div className ="temp2" style = {{ textAlign : "center"}}>
                <span>Wrong email or password!</span>
            </div>
            }
        </div>
    );

}