
import Navbar from '../navbar.jsx';
import './movie.scss'
import { Link, useNavigate } from "react-router-dom";
import { db , storage} from '../firebase'
import {collection, getDocs} from 'firebase/firestore'
import { useState, useEffect, useMemo } from 'react';
import DataTable from 'react-data-table-component';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import {Button}  from 'react-bootstrap';
import moment from "moment";
import {Accept, Reject} from '../controller/optionController.jsx'
import FilterComponent from "../FilterComponent";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
export default function ViewMovieDetails() {
  const [movieDetail, setMovieDetail] = useState([]);
  const usersCollectionRef = collection(db , "movie producer");
  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState([]);
  const [files, setFiles] = useState();
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
  }, 2000);
  return () => clearTimeout(timeout);



  }, []);
  let i = 1;
  let data = [];
  let starsRef;
  
  movieDetail.map((lr) => {
    // if(lr.endDate > time){
      data.push({
        key : i++,
        duration: `${lr.duration} minutes`,
        movieName : lr.movieName,
        image : lr.image,
        producer : lr.producer,  
        registeredAt : lr.registeredAt,
        releaseDate : lr.releaseDate,
        endDate : lr.endDate,
        description : lr.description,
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
      })
    // }
  });
  const ExpandedComponent = (data) => {
    return (<div className ="data-expand">
        <img src={data["data"].image} />
        <p>Duration : {data["data"].duration} </p>
        <p>Movie Title : {data["data"].movieName} </p>
        <p>Producer : {data["data"].producer} </p>
        <p>Release Date : {data["data"].releaseDate} </p>
        <p>End Date : {data["data"].endDate} </p>
        <p>Description : {data["data"].description} </p>
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
          name : "Registered At",
          selector : (row) => row.registeredAt,
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
                expandableRows 
                expandableRowsComponent={ExpandedComponent}
            />
             <Button onClick={changeScene} style ={{fontSize : "13px"}}>Add Movie</Button>
        </main>
      </div>  
    );
}