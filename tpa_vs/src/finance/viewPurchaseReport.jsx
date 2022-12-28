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

export default function ViewPurchaseReport(){
    let i = 1;
    const [filterText, setFilterText] = useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [expenses, setExpenses] = useState([]);
    const CollectionRef = collection(db , "expenses");
    const [pending, setPending] = useState(true);
    const [rows, setRows] = useState();
    useEffect(() => {
        const getData = async () => {
        const data = await getDocs(CollectionRef);
        setExpenses(data.docs.map((doc)=> ({...doc.data(), id: doc.id})));
        }
        getData();
        const timeout = setTimeout(() => {
			setRows(data);
			setPending(false);
		}, 2000);
		return () => clearTimeout(timeout);
    }, []);

    const navigate = useNavigate();
    const data = expenses.map((data) => ({
        key : i++,
        createdAt : data.createdAt,
        description : data.description,
        totalExpenses : `Rp. ${data.totalExpenses}`
    }));

    const filteredItems = data.filter(
        item => item.description && item.description.toLowerCase().includes(filterText.toLowerCase())
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
            name : "Created At",
            selector : (row) => row.createdAt,
            align  : "center",
            editable : true,
            sortable : true
        },
        {
            name : "Description",
            selector : (row) => row.description,
            align : "center",
            editable : true,
            sortable : true,
            width : "65%"
        },
        {
            name : "Total Expenses",
            selector : (row) => row.totalExpenses,
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
    // console.log("return employee data")
    return(
        <div className="view-data">  
        <Navbar />
        <main className ="p-4">
            <DataTable 
                title = "Purchase Report"
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




