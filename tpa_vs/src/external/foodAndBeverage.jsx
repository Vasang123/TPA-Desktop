
import Navbar from '../navbar.jsx';
import './foodAndBeverage.scss'
import { Link, useNavigate } from "react-router-dom";
import { db } from '../firebase'
import {collection, getDocs} from 'firebase/firestore'
import { useState, useEffect, useMemo } from 'react';
import DataTable from 'react-data-table-component';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import {Button}  from 'react-bootstrap';

import {Accept, Reject} from '../controller/optionController.jsx'
import FilterComponent from "../FilterComponent";

export default function ViewSupplierDetails() {
  const [supplierDetail, setSupplierDetail] = useState([]);
  const CollectionRef = collection(db , "food and beverage supplier");
  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState([]);
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Set Active
    </Tooltip>
  );
  const renderTooltip2 = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Set Inactive
    </Tooltip>
  );
  useEffect(() => {
      const getSupplier = async () => {
      const data = await getDocs(CollectionRef);
      setSupplierDetail(data.docs.map((doc)=> ({...doc.data(), id: doc.id})));
      }
      getSupplier();
      const timeout = setTimeout(() => {
    setRows(data);
    setPending(false);
  }, 2000);
  return () => clearTimeout(timeout);
  }, []);

  let i = 1;
  const data = supplierDetail.map((lr) => ({
      key : i++,
      email: lr.email,
      name: lr.name,
      phone: lr.phone,
      registeredAt: lr.registeredAt,
      status : lr.status,
      type : lr.type,
      option :
      <div className = "temp3">
        
      <OverlayTrigger
        placement="top"
        delay={{ show: 100, hide: 200 }}
        overlay={renderTooltip}
        >
        <Button style ={{fontSize :"15px"}}
        onClick={e => Accept(e,'food and beverage supplier', lr.id, 'active')}> 
        <i class="uil uil-check"></i></Button>
      </OverlayTrigger>
      <OverlayTrigger
          placement="top"
          delay={{ show: 100, hide: 200 }}
          overlay={renderTooltip2}
          >
          <Button style ={{fontSize :"15px"}} className="btn-danger"
          onClick={e => Reject(e,'food and beverage supplier', lr.id, 'inactive')}> 
          <i class="uil uil-times"></i></Button>
      </OverlayTrigger>
      </div>
  }));
  const columns = [
      {
          name : "No",
          selector : (row) => row.key,
          align : "center",
          // cell: row => <div style={{fontSize: 10}}>{row.id}</div>
      },
      {
          name : "Supllier Email",
          selector : (row) => row.email,
          align  : "center",
          editable : true,
          sortable : true
      },
      {
          name : "Supllier Name",
          selector : (row) => row.name,
          align : "center",
          editable : true,
          sortable : true
      },
      {
          name : "Supplier Phone",
          selector : (row) => row.phone,
          align : "center",
          editable : true,
          sortable : true
      },
      {
          name : "Registered At",
          selector : (row) => row.registeredAt,
          align : "center",
          editable : true,
          sortable : true
      },
      {
        name : "Type",
        selector : (row) => row.type,
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
      {
        name : "Option",
        selector : (row) => row.option,
        align : "center",
        editable : true,
        
    },
  ];
  const [filterText, setFilterText] = useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
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
    const navigate = useNavigate();
    const changeScene = (e) =>{
        e.preventDefault();
        navigate('/create_supplier');
    };
    return (
      <div className="view-supplier-details">  
        <Navbar />
        <main className ="p-4">
            <DataTable 
                title = "Food And Beverage List"
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
             <Button onClick={changeScene} style ={{fontSize : "13px"}}>Add Supplier</Button>
        </main>
      </div>  
    );
}