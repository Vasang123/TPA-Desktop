
import Navbar from '../navbar.jsx';
import './advertising.scss'
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

export default function ViewAdvertisingDetails() {
  const [advertiseDetail, setAdvertiseDetail] = useState([]);
  const CollectionRef = collection(db , "advertisements");
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
      const getAdvertiseDetail = async () => {
      const data = await getDocs(CollectionRef);
      setAdvertiseDetail(data.docs.map((doc)=> ({...doc.data(), id: doc.id})));
      }
      getAdvertiseDetail();
      const timeout = setTimeout(() => {
    setRows(data);
    setPending(false);
  }, 2000);
  return () => clearTimeout(timeout);
  }, []);

  let i = 1;
  const data = advertiseDetail.map((lr) => ({
      key : i++,
      email : lr.email,
      endDate : lr.endDate,
      name : lr.name,
      phone : lr.phone,
      startDate : lr.startDate,
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
        onClick={e => Accept(e,'advertisements', lr.id, 'active')}> 
        <i class="uil uil-check"></i></Button>
      </OverlayTrigger>
      <OverlayTrigger
          placement="top"
          delay={{ show: 100, hide: 200 }}
          overlay={renderTooltip2}
          >
          <Button style ={{fontSize :"15px"}} className="btn-danger"
          onClick={e => Reject(e,'advertisements', lr.id, 'inactive')}> 
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
          name : "Brand",
          selector : (row) => row.name,
          align  : "center",
          editable : true,
          sortable : true
      },
      {
          name : "Email",
          selector : (row) => row.email,
          align : "center",
          editable : true,
          sortable : true
      },
      {
          name : "Phone",
          selector : (row) => row.phone,
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
        navigate('/create_advertising');
    };
    return (
      <div className="view-advertising-details">  
        <Navbar />
        <main className ="p-4">
            <DataTable 
                title = "Advertisement List"
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
             <Button onClick={changeScene} style ={{fontSize : "13px"}}>Add Advertising</Button>
        </main>
      </div>  
    );
}