import { Link, useNavigate } from "react-router-dom";
import { db } from '../firebase'
import {Button} from 'react-bootstrap';
import {collection, getDocs} from 'firebase/firestore'
import { useState, useEffect, useMemo } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import FilterComponent from "../FilterComponent";
export function EmployeeData(){
    let i = 1;
    const [filterText, setFilterText] = useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [employee, setEmployee] = useState([]);
    const usersCollectionRef = collection(db , "employee");
    const [pending, setPending] = useState(true);
	const [rows, setRows] = useState([]);
    useEffect(() => {
        const getEmployee = async () => {
        const data = await getDocs(usersCollectionRef);
        setEmployee(data.docs.map((doc)=> ({...doc.data(), id: doc.id})));
        }
        getEmployee();
        const timeout = setTimeout(() => {
			setRows(data);
			setPending(false);
		}, 2000);
		return () => clearTimeout(timeout);
    }, []);
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Warning Letter
        </Tooltip>
      );

    const renderTooltip2 = (props) => (
        <Tooltip id="button-tooltip" {...props}>
        Adjust Salary
        </Tooltip>
    );
    const navigate = useNavigate();
    const changeToWarning = (event, id, name) =>{
        navigate('/create_warning_letter', {
            state : {
                id : id,
                name : name
            }
        });
    };
    const changeToSalary = (event, id, name,salary) =>{
        navigate('/adjust_salary', {
            state : {
                id : id,
                name : name,
                salary : salary
            }
        });
    };
    let data = [];
    employee.map((employee) => {
        if(employee.status === 'active'){
            data.push({
                key : i++,
                name : employee.name,
                gender : employee.gender,
                department :employee.department,
                email: employee.email,
                address : employee.address,
                phone : employee.phone,
                dob : employee.dob,
                salary : `Rp. ${employee.salary}`,
                option : 
                <div className="temp">
                    <OverlayTrigger
                    placement="top"
                    delay={{ show: 100, hide: 200 }}
                    overlay={renderTooltip}
                    >
                    <Button style ={{fontSize :"15px"}} className="btn-danger"
                    onClick = {event => changeToWarning(event, employee.id,employee.name)}> 
                    <i class="uil uil-exclamation-octagon"></i></Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                    placement="top"
                    delay={{ show: 100, hide: 200 }}
                    overlay={renderTooltip2}
                    >
                    <Button style ={{fontSize :"15px"}} className="btn-success"
                    onClick = {event => changeToSalary(event, employee.id,employee.name, employee.salary)}> 
                    <i class="uil uil-usd-circle"></i></Button>
                    </OverlayTrigger>
                </div>
            })
        }
    });
    const ExpandedComponent = (data) => {
        return (<div className ="data-expand">
            <p>Name : {data["data"].name} </p>
            <p>Gender : {data["data"].gender} </p>
            <p>Department : {data["data"].department} </p>
            <p>Email : {data["data"].email} </p>
            <p>Address : {data["data"].address} </p>
            <p>Phone : {data["data"].phone} </p>
            <p>Date Of Birth : {data["data"].dob} </p>
            <p>Salary : {data["data"].salary} </p>
        </div>);
    };
    const filteredItems = data.filter(
        item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
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
    // console.log(employee);
    const columns = [
        {
            name : "No",
            selector : (row) => row.key,
            align : "center",
            width : "70px"
            // cell: row => <div style={{fontSize: 10}}>{row.id}</div>
        },
        {
            name : "Name",
            selector : (row) => row.name,
            align  : "center",
            editable : true,
            sortable : true
        },
        {
            name : "Department",
            selector : (row) => row.department,
            align : "center",
            editable : true,
            sortable : true
        },
        {
            name : "Salary",
            selector : (row) => row.salary,
            align : "center",
            editable : true,
            sortable : true,
        },
        {
            name : "Option",
            selector : (row) => row.option,
            align : "center",
            editable : true,
            // width : "120px"
            // sortable : true
        },
    ];
    const myNewTheme= {
        rows: {
          fontSize: '45px'
        },
      }
    const styleObject = { fontSize: '25px' }
      
    // console.log("return employee data")
    return(
        <div style = {{fontSize :"18px"}}>
        <DataTable 
            title = "Employee List"
            columns = {columns}
            pagination
            bordered
            striped
            theme={myNewTheme}
            style = {styleObject}
            progressPending={pending}
            data={filteredItems}
            defaultSortField="name"
            subHeader
            subHeaderComponent={subHeaderComponent}
            expandableRows 
            expandableRowsComponent={ExpandedComponent}
        />
        </div >
    );
}

export function CreateButton(){
    const navigate = useNavigate();
    const changeScene = (e) =>{
        e.preventDefault();
        navigate('/create_employee');
    };
    return(
        <Button onClick={changeScene} style ={{fontSize : "13px"}}>Add Employee</Button>
    );
}



