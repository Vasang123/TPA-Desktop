import { useNavigate } from "react-router-dom";
import { db } from '../firebase'
import {Button, OverlayTrigger} from 'react-bootstrap';
import {collection, getDocs} from 'firebase/firestore'
import { useState, useEffect, useMemo } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import Tooltip from 'react-bootstrap/Tooltip';
import FilterComponent from "../FilterComponent";
import Navbar from '../navbar.jsx'
import {Accept, Reject} from '../controller/optionController.jsx'
// import './viewFacility.scss'
import {QRCodeSVG} from 'qrcode.react';

export default function ViewFundRequest(){
    let i = 1;
    let datas = [];
    const [filterText, setFilterText] = useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [fund, setFund] = useState([]);
    const CollectionRef = collection(db , "purchase request");
    const [pending, setPending] = useState(true);
    const [rows, setRows] = useState();
    useEffect(() => {
        const getFund = async () => {
        const data = await getDocs(CollectionRef);
        setFund(data.docs.map((doc)=> ({...doc.data(), id: doc.id})));
        }
        getFund();
        const timeout = setTimeout(() => {
			setRows(datas);
			setPending(false);
		}, 2000);
		return () => clearTimeout(timeout);


    }, []);
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
    fund.map((data) => {
        if(data.status1 === 'pending'){
            datas.push({
                key : i++,
                date : data.date,
                employeeId : data.employeeId,
                employeeName : data.employeeName,
                price : `Rp. ${data.price}`,
                fund : `Rp. ${data.fund}`,
                quantity : data.quantity,
                status1 : data.status1,
                status2 : data.status2,
                option :
                <div className = "temp3">
          
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 100, hide: 200 }}
                  overlay={renderTooltip}
                  >
                  <Button style ={{fontSize :"15px"}}
                  onClick={e => Accept(e,'purchase request', data.id, 'accepted')}> 
                  <i class="uil uil-check"></i></Button>
                </OverlayTrigger>
                <OverlayTrigger
                    placement="top"
                    delay={{ show: 100, hide: 200 }}
                    overlay={renderTooltip2}
                    >
                    <Button style ={{fontSize :"15px"}} className="btn-danger"
                    onClick={e => Reject(e,'purchase request', data.id, 'rejected')}> 
                    <i class="uil uil-times"></i></Button>
                </OverlayTrigger>
                </div>
            })
        }else{
            datas.push({
                key : i++,
                date : data.date,
                employeeId : data.employeeId,
                employeeName : data.employeeName,
                price : `Rp. ${data.price}`,
                fund : `Rp. ${data.fund}`,
                quantity : data.quantity,
                status1 : data.status1,
                status2 : data.status2,
            })
        }
    });
    const navigate = useNavigate();


    const filteredItems = datas.filter(
        item => item.date && item.date.toLowerCase().includes(filterText.toLowerCase())
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
    const changeToUpdate= (event, id, name, price, quantity, fund, status1, status2, description) =>{
        navigate('/purchase_item', {
            state : {
                id : id,
                name : name,
                price : price,
                quantity : quantity,
                fund : fund,
                status1 : status1,
                status2 : status2,
                description : description
            }
        });
    };
    // console.log(employee);
    const columns = [
        {
            name : "No",
            selector : (row) => row.key,
            align : "center",
            // cell: row => <div style={{fontSize: 10}}>{row.id}</div>
        },
        {
            name : "Request Date",
            selector : (row) => row.date,
            align  : "center",
            width : "220px",
            editable : true,
            sortable : true
        },
        {
            name : "Employee Name",
            selector : (row) => row.employeeName,
            align  : "center",
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
            name : "Price/item",
            selector : (row) => row.price,
            align : "center",
            editable : true,
            sortable : true
        },
        {
            name : "Fund",
            selector : (row) => row.fund,
            align : "center",
            editable : true,
            sortable : true
        },
        {
            name : "Status 1",
            selector : (row) => row.status1,
            align : "center",
            editable : true,
            sortable : true
        },
        {
            name : "Status 2",
            selector : (row) => row.status2,
            align : "center",
            editable : true,
            sortable : true
        },
        {
            name : "Option",
            selector : (row) => row.option,
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
        <div className="view-data" >  
        <Navbar />
        <main className ="p-4">
            <DataTable 
                title = "Fund Request List"
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




