import { Link, useNavigate } from "react-router-dom";
import { db } from '../firebase'
import {collection, getDocs} from 'firebase/firestore'
import { useState, useEffect } from 'react';
import Navbar from '../navbar.jsx';
import {Table, Button} from 'react-bootstrap';
import './working.scss'
function View_Working_Time(){
    const navigate = useNavigate();
    let i = 1;
    const [employee, setEmployee] = useState([]);
    const [workingTime, setWorkingTime] = useState([]);
    const usersCollectionRef = collection(db , "employee");
    const workingTimeCollectionRef = collection(db , "working time");
    useEffect(() => {
      const getEmployee = async () => {
        const data = await getDocs(usersCollectionRef);
        setEmployee(data.docs.map((doc)=> ({...doc.data(), id: doc.id})));
      }
      
      const getWorkingTime = async () => {
        const workingData = await getDocs(workingTimeCollectionRef);
        setWorkingTime(workingData.docs.map((doc)=> ({...doc.data(), id: doc.id})));
      }
      getEmployee();
      getWorkingTime();
    }, []);
    return(
        
        <div className = 'View_Employee_Working_Time'>
            <Navbar/>
            <main className="p-4">
            <Table striped bordered hover className="mw-100">
            <thead>
                <tr>
                <th>No</th>
                <th>Full Name</th>
                <th>Day</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Option</th>
                </tr>
            </thead>
            <tbody>
            {
                workingTime.map((wo) => {
                    return(
                        <tr key ={wo.id}>
                        <td>{i++}</td>
                        <td>{wo.day}</td>
                        <td>{wo.day}</td>
                        <td>{wo.startTime}</td>
                        <td>{wo.endTime}</td>
                        <td>
                            <Button> 
                                Update
                            </Button> 
                        </td>
                        </tr>
                        // {i++}
                    )
                })
            }
            </tbody>
            </Table>
            </main>
        </div>
    );

};

export default View_Working_Time