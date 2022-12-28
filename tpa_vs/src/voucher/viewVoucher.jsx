import { useNavigate } from "react-router-dom";
import { db } from '../firebase'
import {Button} from 'react-bootstrap';
import {collection, getDocs} from 'firebase/firestore'
import { useState, useEffect, useMemo } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import Tooltip from 'react-bootstrap/Tooltip';
import FilterComponent from "../FilterComponent";
import Navbar from '../navbar.jsx'
import './viewVoucher.scss'
import {QRCodeSVG} from 'qrcode.react';

export default function ViewVoucher(){
    let i = 1;
    const [filterText, setFilterText] = useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [promo, setPromo] = useState([]);
    const promoCollectionRef = collection(db , "voucher");
    const [pending, setPending] = useState(true);
    const [rows, setRows] = useState();
    useEffect(() => {
        const getPromo = async () => {
        const data = await getDocs(promoCollectionRef);
        setPromo(data.docs.map((doc)=> ({...doc.data(), id: doc.id})));
        }
        getPromo();
        const timeout = setTimeout(() => {
			setRows(data);
			setPending(false);
		}, 2000);
		return () => clearTimeout(timeout);
    }, []);

    const navigate = useNavigate();
    const data = promo.map((promo) => ({
        key : i++,
        description : promo.description,
        discountPrice : promo.discountPrice,
        endDate : promo.endDate,
        startDate : promo.startDate,
        status : promo.status,
        type : promo.type,
        image :  <QRCodeSVG value={promo.id} />
        
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
            name : "Description",
            selector : (row) => row.description,
            align  : "center",
            editable : true,
            sortable : true
        },
        {
            name : "Discount Price",
            selector : (row) => row.discountPrice,
            align : "center",
            editable : true,
            sortable : true
        },
        {
            name : "Start Date",
            selector : (row) => row.startDate,
            align : "center",
            editable : true,
            sortable : true
        },
        {
            name : "End Date",
            selector : (row) => row.endDate,
            align : "center",
            editable : true,
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
        <div className="view-promo" >  
        <Navbar />
        <main className ="p-4">
            <DataTable 
                title = "Promo List"
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
            <Button onClick={changeScene} style ={{fontSize : "13px"}}>Generate Voucher</Button>
        </main>
      </div>
    );
}




