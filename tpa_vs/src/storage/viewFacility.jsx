import { useNavigate } from "react-router-dom";
import { db } from '../firebase'
import {Button} from 'react-bootstrap';
import {collection, getDocs} from 'firebase/firestore'
import { useState, useEffect, useMemo } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import Tooltip from 'react-bootstrap/Tooltip';
import FilterComponent from "../FilterComponent";
import Navbar from '../navbar.jsx'
import './viewFacility.scss'
import {QRCodeSVG} from 'qrcode.react';

export default function ViewFacility(){
    let i = 1;
    const [filterText, setFilterText] = useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [facility, setFacility] = useState([]);
    const promoCollectionRef = collection(db , "facility and equipment");
    const [pending, setPending] = useState(true);
    const [rows, setRows] = useState();
    useEffect(() => {
        const getFacility = async () => {
        const data = await getDocs(promoCollectionRef);
        setFacility(data.docs.map((doc)=> ({...doc.data(), id: doc.id})));
        }
        getFacility();
        const timeout = setTimeout(() => {
			setRows(data);
			setPending(false);
		}, 2000);
		return () => clearTimeout(timeout);
    }, []);

    const navigate = useNavigate();
    const data = facility.map((data) => ({
        key : i++,
        name : data.name,
        description : data.description,
        lastMaintenance : data.lastMaintenance,
        lastUsed : data.lastUsed,
        quantity : data.quantity,
        status : data.status,
        type : data.type,
        image :  <QRCodeSVG value={data.id} />
        
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
            name : "Qr Code",
            selector : (row) => row.image,
            align  : "center",
            width : "220px",
            editable : true,
            sortable : true
        },
        {
            name : "Name",
            selector : (row) => row.name,
            align  : "center",
            editable : true,
            sortable : true
        },
        {
            name : "Description",
            selector : (row) => row.description,
            align  : "center",
            editable : true,
            sortable : true
        },
        {
            name : "Last Maintenance",
            selector : (row) => row.lastMaintenance,
            align : "center",
            editable : true,
            sortable : true
        },
        {
            name : "Last Used",
            selector : (row) => row.lastUsed,
            align : "center",
            editable : true,
            sortable : true
        },
        {
            name : "Quantity",
            selector : (row) => row.quantity,
            align : "center",
            editable : true,
            sortable : true
        },
        {
            name : "Type",
            selector : (row) => row.type,
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
        <div className="view-data" >  
        <Navbar />
        <main className ="p-4">
            <DataTable 
                title = "Facility and Equipment List"
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




