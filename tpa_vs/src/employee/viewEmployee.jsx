import { Link, useNavigate } from "react-router-dom";
import {Table, Button} from 'react-bootstrap';
import { db } from '../firebase'
import {collection, getDocs} from 'firebase/firestore'
import { useState, useEffect } from 'react';
import './view.scss'
import Navbar from '../navbar.jsx'
function View_Employee (){
    const navigate = useNavigate();
    const [employee, setEmployee] = useState([]);
    let i = 1;
    const usersCollectionRef = collection(db , "employee");
    useEffect(() => {
      const getEmployee = async () => {
        const data = await getDocs(usersCollectionRef);
        setEmployee(data.docs.map((doc)=> ({...doc.data(), id: doc.id})));
      }
      getEmployee();
    }, []);
    const changeScene = (e) =>{
        e.preventDefault();
        navigate('/create_employee');
    };
    return (
        <div className = "View-Employee">
            <Navbar/>
            <main className ="p-4">
            <Table striped bordered hover className="mw-100">
            <thead>
                <tr>
                <th>No</th>
                <th>Full Name</th>
                <th>Gender</th>
                <th>Department</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Salary</th>
                </tr>
            </thead>
            <tbody>
            {
                employee.map((employee) => {
                    return(
                        <tr key ={employee.id}>
                        <td>{i++}</td>
                        <td>{employee.name}</td>
                        <td>{employee.gender}</td>
                        <td>{employee.department}</td>
                        <td>{employee.email}</td>
                        <td>{employee.address}</td>
                        <td>{employee.phone}</td>
                        <td>Rp. {employee.salary}</td>
                        </tr>
                        // {i++}
                    )
                })
            }
            </tbody>
            </Table>
            {/* <form> */}
            <Button onClick={changeScene}>Add Employee</Button>
            {/* </form> */}
            </main>
        </div>
    );
};

export default View_Employee;