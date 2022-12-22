import { useNavigate } from "react-router-dom";
import { db } from '../firebase'
import {collection, getDocs} from 'firebase/firestore'
import { useState, useEffect, useMemo } from 'react';
import DataTable from 'react-data-table-component';
import {Button} from 'react-bootstrap';
import FilterComponent from "../FilterComponent";
export function EmployeeWorkingTimeData(){
    let datas = [];
    let i = 1;
    const [employee, setEmployee] = useState([]);
    const [workingTime, setWorkingTime] = useState([]);
    const usersCollectionRef = collection(db , "employee");
    const workingTimeCollectionRef = collection(db , "working time");
    const [pending, setPending] = useState(true);
	const [rows, setRows] = useState([]);
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
        const timeout = setTimeout(() => {
            setRows(workingTime);
            setPending(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }, []);
    const navigate = useNavigate();
    // const navigation = useNavigation();
    const HandleClick = (event, id, employeeId, day, startTime, endTime, name) => {
        // console.log("masuk");
        // <UpdateWorkingTime 
        // employeeId = {employeeId}/>
        // const navigate = useNavigate();
        navigate('/update_working_time', {
                state: {
                    id : id,
                    employeeId: employeeId,
                    day : day, 
                    startTime : startTime,
                    endTime : endTime,
                    name : name
                }
            });
    };
    workingTime.map((wo) => {
        employee.map((employee) => {
            if(employee.id === wo.employeeId){
                datas.push({
                    key : i++,
                    name : employee.name,
                    day : wo.day,
                    startDate : wo.startTime,
                    endDate : wo.endTime,
                    status : wo.status,
                    option : 
                    <Button style ={{fontSize :"13px"}} 
                    onClick= {event => HandleClick(event,wo.id, wo.employeeId, wo.day,wo.startTime,wo.endTime, employee.name)} > 
                    Update</Button>
            })
            }
        })
    })

    const columns = [
        {
            name : "No",
            selector : (row) => row.key,
            align : "center",
            // cell: row => <div style={{fontSize: 10}}>{row.id}</div>
        },
        {
            name : "Name",
            selector : (row) => row.name,
            align : "center",
            editable : true,
            sortable : true
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

        {
            name : "Option",
            selector : (row) => row.option,
            align : "center",
            editable : true,

        },
    ];
    const [filterText, setFilterText] = useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredItems = datas.filter(
        item => item.status && item.status.toLowerCase().includes(filterText.toLowerCase())
    );
    const subHeaderComponent = useMemo(() => {
        const handleClear = () => {
          if (filterText) {
            setResetPaginationToggle(!resetPaginationToggle);
            setFilterText("");
          }
        };
    
        return (
          <FilterComponent
            onFilter={e => setFilterText(e.target.value)}
            onClear={handleClear}
            filterText={filterText}
          />
        );
    }, [filterText, resetPaginationToggle]);
    return(
        <div style = {{fontSize :"18px"}}>
        <DataTable 
            title = "Employee Working Schedule"
            columns = {columns}
            pagination
            bordered
            striped
            progressPending={pending}
            data={filteredItems}
            defaultSortField="name"
            subHeader
            subHeaderComponent={subHeaderComponent}
        />
        </div >
    );
}
