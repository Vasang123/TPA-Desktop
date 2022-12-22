
import Navbar from '../navbar.jsx';
import './viewLeaveRequest.scss'
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

export default function ViewLeaveRequest() {
  const [leaveRequest, setLeaveRequest] = useState([]);
  const usersCollectionRef = collection(db , "leave request");
  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState([]);
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Accept Request
    </Tooltip>
  );
  const renderTooltip2 = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Reject Request
    </Tooltip>
  );
  useEffect(() => {
      const getLeaveRequest = async () => {
      const data = await getDocs(usersCollectionRef);
      setLeaveRequest(data.docs.map((doc)=> ({...doc.data(), id: doc.id})));
      }
      getLeaveRequest();
      const timeout = setTimeout(() => {
    setRows(data);
    setPending(false);
  }, 2000);
  return () => clearTimeout(timeout);
  }, []);
  let i = 1;
  const data = leaveRequest.map((lr) => ({
      key : i++,
      startDate : lr.startDate,
      endDate : lr.endDate,
      description : lr.description,
      employeeName : lr.employeeName,
      status : lr.status,
      option :
      <div className = "temp3">
        
      <OverlayTrigger
        placement="top"
        delay={{ show: 100, hide: 200 }}
        overlay={renderTooltip}
        >
        <Button style ={{fontSize :"15px"}}
        onClick={e => Accept(e,'leave request', lr.id, 'accepted')}> 
        <i class="uil uil-check"></i></Button>
      </OverlayTrigger>
      <OverlayTrigger
          placement="top"
          delay={{ show: 100, hide: 200 }}
          overlay={renderTooltip2}
          >
          <Button style ={{fontSize :"15px"}} className="btn-danger"
          onClick={e => Reject(e,'leave request', lr.id, 'rejected')}> 
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
          name : "Start Date",
          selector : (row) => row.startDate,
          align  : "center",
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
          name : "Employee Name",
          selector : (row) => row.employeeName,
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
    return (
      <div className="view-leave-request">  
        <Navbar />
        <main className ="p-4">
            <DataTable 
                title = "Employee Leave Request List"
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