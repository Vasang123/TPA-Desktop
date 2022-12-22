
import Navbar from '../navbar.jsx';
import './viewWarningLetter.scss';
import { Link, useNavigate } from "react-router-dom";
import { db } from '../firebase'
import {collection, getDocs} from 'firebase/firestore'
import { useState, useEffect, useMemo } from 'react';
import DataTable from 'react-data-table-component';
import Tooltip from 'react-bootstrap/Tooltip';
import FilterComponent from "../FilterComponent";
export default function ViewWarningLetter(){
    const [warningLetter, setWarningLetter] = useState([]);
    const usersCollectionRef = collection(db , "warning letter");
    const [pending, setPending] = useState(true);
	const [rows, setRows] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    useEffect(() => {
        const getWarningLetter = async () => {
        const data = await getDocs(usersCollectionRef);
        setWarningLetter(data.docs.map((doc)=> ({...doc.data(), id: doc.id})));
        }
        getWarningLetter();
        const timeout = setTimeout(() => {
			setRows(data);
			setPending(false);
		}, 2000);
		return () => clearTimeout(timeout);
    }, []);
    let i = 1;
    const data = warningLetter.map((letter) => ({
        key : i++,
        createdAt : letter.createdAt,
        name : letter.name,
        description : letter.description,
        status : letter.status
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
    const columns = [
        {
            name : "No",
            selector : (row) => row.key,
            align : "center",
            // cell: row => <div style={{fontSize: 10}}>{row.id}</div>
        },
        {
            name : "Issued At",
            selector : (row) => row.createdAt,
            align  : "center",
            editable : true,
            sortable : true
        },
        {
            name : "Name",
            selector : (row) => row.name,
            align : "center",
            editable : true,
            sortable : true
        },
        {
            name : "Description",
            selector : (row) => row.description,
            align : "center",
            editable : true,
            sortable : true
        },
        {
            name : "Status",
            selector : (row) => row.status,
            align : "center",
            editable : true,
        },
    ];
    return (
        <div className ="view-warning-letter">
            <Navbar/>
            <main className = "p-4">
                <DataTable 
                title = "Employee Warning Letter List"
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
            </main>
        </div>
    );
}