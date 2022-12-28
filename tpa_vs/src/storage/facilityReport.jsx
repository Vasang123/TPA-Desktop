
import Navbar from '../navbar.jsx';
import { Link, useNavigate } from "react-router-dom";
import { db } from '../firebase'
import {collection, getDocs} from 'firebase/firestore'
import { useState, useEffect, useMemo } from 'react';
import DataTable from 'react-data-table-component';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import {Button}  from 'react-bootstrap';

import {FixedFacility, BrokenFacility} from '../controller/optionController.jsx'
import FilterComponent from "../FilterComponent";

export default function ViewFacilityReport() {
  const [facilityReport, setFacilityReport] = useState([]);
  const usersCollectionRef = collection(db , "facility report");
  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState([]);
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Fixed
    </Tooltip>
  );
  const renderTooltip2 = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Unfixed
    </Tooltip>
  );
  useEffect(() => {
      const getFacilityReport = async () => {
      const data = await getDocs(usersCollectionRef);
      setFacilityReport(data.docs.map((doc)=> ({...doc.data(), id: doc.id})));
      }
      getFacilityReport();
      const timeout = setTimeout(() => {
    setRows(data);
    setPending(false);
  }, 2000);
  return () => clearTimeout(timeout);
  }, []);
  let i = 1;
  let data = [];
  facilityReport.map((lr) => {
    if(lr.status === 'pending' ){
      data.push({
        key : i++,
        description : lr.description,
        employeeName : lr.employeeName,
        status : lr.status,
        createdAt : lr.createdAt,
        itemCode : lr.itemCode,
        option :
        <div className = "temp3">
          
        <OverlayTrigger
          placement="top"
          delay={{ show: 100, hide: 200 }}
          overlay={renderTooltip}
          >
          <Button style ={{fontSize :"15px"}}
          onClick={e => FixedFacility(e,'facility report', lr.id, 'fixed', lr.itemCode)}> 
          <i class="uil uil-check"></i></Button>
        </OverlayTrigger>
        <OverlayTrigger
            placement="top"
            delay={{ show: 100, hide: 200 }}
            overlay={renderTooltip2}
            >
            <Button style ={{fontSize :"15px"}} className="btn-danger"
            onClick={e => BrokenFacility(e,'facility report', lr.id, 'unfixed', lr.itemCode)}> 
            <i class="uil uil-times"></i></Button>
        </OverlayTrigger>
        </div>  
      })
    }else{
        data.push({
            key : i++,
            description : lr.description,
            employeeName : lr.employeeName,
            itemCode : lr.itemCode,
            createdAt : lr.createdAt,
            status : lr.status
          })  
    }
  });
  const columns = [
      {
          name : "No",
          selector : (row) => row.key,
          align : "center",
          // cell: row => <div style={{fontSize: 10}}>{row.id}</div>
      },
      {
          name : "Employee Name",
          selector : (row) => row.employeeName,
          align : "center",
          editable : true,
          sortable : true
      },
      {
          name : "Created At",
          selector : (row) => row.createdAt,
          align : "center",
          editable : true,
          sortable : true
      },
      {
        name : "Item Code",
        selector : (row) => row.itemCode,
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
                title = "Facility Report"
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