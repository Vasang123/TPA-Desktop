
import Navbar from '../navbar.jsx';
import './movie.scss'
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

export default function ViewMovieDetails() {
  const [movieDetail, setMovieDetail] = useState([]);
  const usersCollectionRef = collection(db , "movie producer");
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
      const getMovieDetail = async () => {
      const data = await getDocs(usersCollectionRef);
      setMovieDetail(data.docs.map((doc)=> ({...doc.data(), id: doc.id})));
      }
      getMovieDetail();
      const timeout = setTimeout(() => {
    setRows(data);
    setPending(false);
  }, 2000);
  return () => clearTimeout(timeout);
  }, []);

  let i = 1;
  const data = movieDetail.map((lr) => ({
      key : i++,
      duration: lr.duration,
      movieName : lr.movieName,
      producer : lr.producer,  
      registeredAt : lr.registeredAt,
      releaseDate : lr.releaseDate,
      status : lr.status,
      option :
      <div className = "temp3">
        
      <OverlayTrigger
        placement="top"
        delay={{ show: 100, hide: 200 }}
        overlay={renderTooltip}
        >
        <Button style ={{fontSize :"15px"}}
        onClick={e => Accept(e,'movie producer', lr.id, 'active')}> 
        <i class="uil uil-check"></i></Button>
      </OverlayTrigger>
      <OverlayTrigger
          placement="top"
          delay={{ show: 100, hide: 200 }}
          overlay={renderTooltip2}
          >
          <Button style ={{fontSize :"15px"}} className="btn-danger"
          onClick={e => Reject(e,'movie producer', lr.id, 'inactive')}> 
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
          name : "Duration (minutes)",
          selector : (row) => row.duration,
          align  : "center",
          editable : true,
          sortable : true
      },
      {
          name : "Movie Name",
          selector : (row) => row.movieName,
          align : "center",
          editable : true,
          sortable : true
      },
      {
          name : "Producer",
          selector : (row) => row.producer,
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
          name : "Release Date",
          selector : (row) => row.releaseDate,
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
                title = "Movie List"
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
             <Button onClick={changeScene} style ={{fontSize : "13px"}}>Add Movie</Button>
        </main>
      </div>  
    );
}