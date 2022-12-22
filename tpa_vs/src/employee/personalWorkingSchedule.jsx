import './personalWorkingSchedule.scss'
import Navbar from '../navbar.jsx'
import { useNavigate } from "react-router-dom";
import { db } from '../firebase'
import {collection, getDocs} from 'firebase/firestore'
import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import {Button} from 'react-bootstrap';
export default function PersonalWorkingTime(params) {
    let datas = [];
    const [personalSchedule, setPersonalSchedule] = useState();
    const [employee, setEmployee] = useState();
    const [workingTime, setWorkingTime] = useState([]);
    const usersCollectionRef = collection(db , "employee");
    const workingTimeCollectionRef = collection(db , "working time");
    const [pending, setPending] = useState(true);
	const [rows, setRows] = useState([]);
    useEffect(() => {
        const employee = JSON.parse(sessionStorage.getItem('employee'));
        setEmployee(employee);

        const getWorkingTime = async () => {
            const workingData = await getDocs(workingTimeCollectionRef);
            setWorkingTime(workingData.docs.map((doc)=> ({...doc.data(), id: doc.id})));
          }
          getWorkingTime();
        const timeout = setTimeout(() => {
            setRows(workingTime);
            setPending(false);
        }, 2000);
        return () => clearTimeout(timeout);
      }, [])  
      let i = 1;

      workingTime.map((wo) => {
        if(employee.id === wo.employeeId){
            datas.push({
                key : i++,
                day : wo.day,
                startDate : wo.startTime,
                endDate : wo.endTime,
                status : wo.status,
        })
        }

    })
    const columns = [
        {
            name : "No",
            selector : (row) => row.key,
            align : "center",
            // cell: row => <div style={{fontSize: 10}}>{row.id}</div>
        },
        {
            name : "Day",
            selector : (row) => row.day,
            align : "center",
            editable : true,
            sortable : true
        },
        {
            name : "Start Time",
            selector : (row) => row.startDate,
            align : "center",
            editable : true,
            sortable : true
        },
        {
            name : "End Time",
            selector : (row) => row.endDate,
            align : "center",
            editable : true,
        },
        {
            name : "Status",
            selector : (row) => row.status,
            align : "center",
            editable : true,
            sortable : true
        },
    ];
    return(
        <div className="personal-working-time">
            <Navbar/>
            <main className= "p-4">
            <DataTable 
            title = "Personal Working Schedule"
            columns = {columns}
            data = {datas}
            pagination
            bordered
            striped
            progressPending={pending}
        />
            </main>
        </div>
    )
}