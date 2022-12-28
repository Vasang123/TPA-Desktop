import { Link, useNavigate } from "react-router-dom";
import { db } from '../firebase'
import {Button} from 'react-bootstrap';
import {collection, getDocs} from 'firebase/firestore'
import { useState, useEffect, useMemo } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import FilterComponent from "../FilterComponent";
import Navbar from '../navbar.jsx'
import './viewMember.scss'
export default function ViewMember(){
    let i = 1;
    const [filterText, setFilterText] = useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [member, setMember] = useState([]);
    const usersCollectionRef = collection(db , "membership");
    const [pending, setPending] = useState(true);
    const [rows, setRows] = useState();
    useEffect(() => {
        const getMember = async () => {
        const data = await getDocs(usersCollectionRef);
        setMember(data.docs.map((doc)=> ({...doc.data(), id: doc.id})));
        }
        getMember();
        const timeout = setTimeout(() => {
			setRows(data);
			setPending(false);
		}, 2000);
		return () => clearTimeout(timeout);
    }, []);

    const data = member.map((member) => ({
        key : i++,
        dob : member.dob,
        gender : member.gender,
        name : member.name,
        points : member.points,
        rank : member.rank,
        registeredAt : member.registeredAt,
        status : member.status,
        email : member.email
        
    }));

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
            name : "Gender",
            selector : (row) => row.gender,
            align : "center",
            editable : true,
            sortable : true
        },
        {
            name : "Date Of Birth",
            selector : (row) => row.dob,
            align : "center",
            editable : true,
            sortable : true
        },
        {
            name : "Email",
            selector : (row) => row.email,
            align : "center",
            editable : true,
        },
        {
            name : "Member Type",
            selector : (row) => row.rank,
            align : "center",
            editable : true,
        },
        {
            name : "Registered At",
            selector : (row) => row.registeredAt,
            align : "center",
            editable : true,
        },
        {
            name : "Points",
            selector : (row) => row.points,
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
      
    // console.log("return employee data")
    return(
        <div className="view-member" >  
        <Navbar />
        <main className ="p-4">
            <DataTable 
                title = "Member List"
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




