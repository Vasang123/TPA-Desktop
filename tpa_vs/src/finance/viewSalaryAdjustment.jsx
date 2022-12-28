import { useNavigate } from "react-router-dom";
import { db } from '../firebase'
import {Button} from 'react-bootstrap';
import {collection, getDocs} from 'firebase/firestore'
import { useState, useEffect, useMemo } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import Tooltip from 'react-bootstrap/Tooltip';
import FilterComponent from "../FilterComponent";
import Navbar from '../navbar.jsx'
// import './viewFacility.scss'
import {QRCodeSVG} from 'qrcode.react';

export default function ViewSalaryAdjustment(){
    let i = 1;
    const [filterText, setFilterText] = useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [salary, setSalary] = useState([]);
    const CollectionRef = collection(db , "salary request");
    const [pending, setPending] = useState(true);
    const [rows, setRows] = useState();
    useEffect(() => {
        const getData = async () => {
        const data = await getDocs(CollectionRef);
        setSalary(data.docs.map((doc)=> ({...doc.data(), id: doc.id})));
        }
        getData();
        const timeout = setTimeout(() => {
			setRows(data);
			setPending(false);
		}, 2000);
		return () => clearTimeout(timeout);
    }, []);

    const navigate = useNavigate();
    const data = salary.map((data) => ({
        key : i++,
        createdAt : data.createdAt,
        employeeId : data.employeeId,
        newSalary : `Rp. ${data.newSalary}`,
        oldSalary : `Rp. ${data.oldSalary}`,
        status : data.status,
    }));

    const filteredItems = data.filter(
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
    // console.log(employee);
    const columns = [
        {
            name : "No",
            selector : (row) => row.key,
            align : "center",
            // cell: row => <div style={{fontSize: 10}}>{row.id}</div>
        },
        {
            name : "Employee Id",
            selector : (row) => row.employeeId,
            align  : "center",
            editable : true,
            sortable : true
        },
        {
            name : "Created At",
            selector : (row) => row.createdAt,
            align  : "center",
            editable : true,
            sortable : true
        },
        {
            name : "Old Salary",
            selector : (row) => row.oldSalary,
            align : "center",
            editable : true,
            sortable : true
        },
        {
            name : "New Salary",
            selector : (row) => row.newSalary,
            align : "center",
            editable : true,
            sortable : true
        },
        {
            name : "Status",
            selector : (row) => row.status,
            align : "center",
            editable : true,
            sortable : true
        },
    ];
    const myNewTheme= {
        rows: {
          fontSize: '45px'
        },
      }
    const styleObject = { fontSize: '25px' }
    const changeScene = (e) =>{
        e.preventDefault();
        navigate('/create_voucher');
    };
    // console.log("return employee data")
    return(
        <div className="view-data">  
        <Navbar />
        <main className ="p-4">
            <DataTable 
                title = "Salary Request List"
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
            />
        </main>
      </div>
    );
}




