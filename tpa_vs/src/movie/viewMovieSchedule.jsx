
import Navbar from '../navbar.jsx';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { db } from '../firebase'
import {collection, getDocs} from 'firebase/firestore'
import { useState, useEffect, useMemo } from 'react';
import DataTable from 'react-data-table-component';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import {Button}  from 'react-bootstrap';
import moment from "moment";
import {Accept, Reject} from '../controller/optionController.jsx'
import FilterComponent from "../FilterComponent";

export default function ViewMovieSchedule() {
  const [employee, setEmployee] = useState([]);
  const [movieDetail, setMovieDetail] = useState([]);
  const usersCollectionRef = collection(db , "movie schedule");
  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState([]);
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Overlapping Schedule
    </Tooltip>
  );
  const renderTooltip2 = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Order Ticket
    </Tooltip>
  );
  let i = 1;
  let data = [];
  let time = moment().format("YYYY-MM-DD")
  useEffect(() => {
      const getMovieDetail = async () => {
      const data = await getDocs(usersCollectionRef);
      setMovieDetail(data.docs.map((doc)=> ({...doc.data(), id: doc.id})));
      }
      getMovieDetail();
      const timeout = setTimeout(() => {
    setRows(data);
    setPending(false);
    const employee = JSON.parse(sessionStorage.getItem('employee'));
    setEmployee(employee);
  }, 2000);
  return () => clearTimeout(timeout);
  }, []);
  const getMovieData = async () => {
    movieDetail.map((lr) => {
      if(lr.status === 'active'){
          movieDetail.map((lr2) => {
            if(employee.department === 'Schedule Division'){
              if(lr.id != lr2.id){
                  if(lr.shift == lr2.shift && lr.roomNumber == lr2.roomNumber && lr.date == lr2.date ){
                      data.push({
                          key : i++,
                          movieName : lr.movieName,
                          shift : lr.shift,  
                          date : lr.date,
                          status : lr.status,
                          roomNumber : lr.roomNumber,
                          image : lr.image,
                          price : `Rp. ${lr.price}`,
                          seat : lr.seat,
                          option :
                          <div className = "temp3">
                              <OverlayTrigger
                              placement="top"
                              delay={{ show: 100, hide: 200 }}
                              overlay={renderTooltip}
                              >
                              <Button style ={{fontSize :"15px"}} className="btn-danger" 
                              onClick={event => updateSchedule(event, lr.id, lr.shift, lr.date, lr.roomNumber)}> 
                              <i class="uil uil-exclamation-circle"></i></Button>
                              </OverlayTrigger>
                          
                          </div>
                        })
                  }
              }else{
                  data.push({
                      key : i++,
                      movieName : lr.movieName,
                      shift : lr.shift,  
                      date : lr.date,
                      image : lr.image,
                      status : lr.status,
                      price : `Rp. ${lr.price}`,
                      roomNumber : lr.roomNumber,
                      seat : lr.seat
                    })
              }
  
            }else if (employee.department === 'Movie Front Office Division'){
              if(lr.id == lr2.id && lr2.seat > 0){
                data.push({
                  key : i++,
                  movieName : lr.movieName,
                  shift : lr.shift,  
                  date : lr.date,
                  image : lr.image,
                  status : lr.status,
                  roomNumber : lr.roomNumber,
                  price : `Rp. ${lr.price}`,
                  seat : lr.seat,
                  option :
                  <div className = "temp3">
                      <OverlayTrigger
                      placement="top"
                      delay={{ show: 100, hide: 200 }}
                      overlay={renderTooltip2}
                      >
                      <Button style ={{fontSize :"15px"}} className="btn-success" 
                      onClick={event => orderTicket(event,lr.id,lr.shift,lr.date, lr.roomNumber, lr.price)}> 
                      <i class="uil uil-plus-circle"></i></Button>
                      </OverlayTrigger>
                  
                  </div>
                })
              }
            }
          });
      }
    });
  }
  getMovieData();
  const updateSchedule = (event, id, shift,date, roomNumber) =>{
        navigate('/update_movie_schedule', {
            state : {
                id : id,
                shift : shift,
                date : date,
                roomNumber : roomNumber
            }
        });
    };
  const orderTicket = (event, id, shift,date, roomNumber, price) =>{
      navigate('/create_movie_order', {
          state : {
              id : id,
              shift : shift,
              date : date,
              roomNumber : roomNumber,
              price : price
          }
      });
  };
  const ExpandedComponent = (data) => {
    return (<div className ="data-expand">
        <img src={data["data"].image} />
        <p>Movie Title : {data["data"].movieName} </p>
        <p>Shift : {data["data"].shift} </p>
        <p>Room Number : {data["data"].roomNumber} </p>
        <p>Date : {data["data"].date} </p>
        <p>Ticket Price : {data["data"].price} </p>
    </div>);
};
  const columns = [
      {
          name : "No",
          selector : (row) => row.key,
          align : "center",
          width : "50px"
          // cell: row => <div style={{fontSize: 10}}>{row.id}</div>
      },
      {
          name : "Movie Name",
          selector : (row) => row.movieName,
          align : "center",
          editable : true,
          sortable : true
      },
      {
          name : "Seat",
          selector : (row) => `${row.seat} seat(s)`,
          align : "center",
          editable : true,
          sortable : true
      },
      {
          name : "Date",
          selector : (row) => row.date,
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
        sortable : true
    },
  ];
  const [filterText, setFilterText] = useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredItems = data.filter(
        item => item.movieName && item.movieName.toLowerCase().includes(filterText.toLowerCase())
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
        navigate('/create_movie');
    };
    return (
      <div className="view-movie-details">  
        <Navbar />
        <main className ="p-4">
            <DataTable 
                title = "Movie Schedule"
                columns = {columns}
                pagination
                bordered
                striped
                progressPending={pending}
                data={filteredItems}
                defaultSortField="name"
                subHeader
                subHeaderComponent={subHeaderComponent}
                expandableRows 
                expandableRowsComponent={ExpandedComponent}
            />
        </main>
      </div>  
    );
}