import { Sidebar, Menu, MenuItem , sidebarClasses  } from 'react-pro-sidebar';
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

import {Button} from 'react-bootstrap';
function Navbar(){
  const [employee, setEmployee] = useState([]);
  const navigate  = useNavigate();
  const auth = getAuth();
  const signOutHandle = (e) => {
    e.preventDefault();
    signOut(auth).then(() => {
      sessionStorage.clear();
      navigate('/login');
    }).catch((error) => {
      // An error happened.
    });
  }
  useEffect(() => {
    const employee = JSON.parse(sessionStorage.getItem('employee'));
    setEmployee(employee);
  }, [])  
  // console.log(employee.department)
    return (
            <Sidebar
            rootStyles={{
                [`.${sidebarClasses.container}`]: {
                  backgroundColor: `rgb(250, 241, 230)`
                },
              }}>
                <Menu>
                <MenuItem ><b> Stuck In The Movie </b></MenuItem>
                <MenuItem routerLink={<Link to="/dashboard" />}> <i className="uil uil-estate"></i> Home </MenuItem>
                {(() => {
                  if (employee.department === 'HRD') {
                    return (
                      <div>
                        <MenuItem routerLink={<Link to="/view_employee" />}> <i className="uil uil-users-alt"></i> View Employee </MenuItem>
                        <MenuItem routerLink={<Link to="/view_warning_letter"/>}> <i className="uil uil-file-edit-alt"></i> View Warning Letter </MenuItem> 
                        <MenuItem routerLink={<Link to="/view_working_time"/>}> <i className="uil uil-clock"></i> View Employee Working Time </MenuItem> 
                        <MenuItem routerLink={<Link to="/view_leave_request"/>}> <i className="uil uil-clock"></i> View Leave Request </MenuItem> 
                      </div>
                    )
                  } else if (employee.department === 'Manager') {
                    return (
                      <div>
                        
                      </div>
                    )
                  } else if (employee.department === 'Cafe Front Office Department') {
                    return (
                      <div>
                        <MenuItem > <i className="uil uil-crockery"></i> Create Food Order </MenuItem>
                        
                      </div>
                    )
                  }else if (employee.department === 'Movie Front Office Division') {
                    return (
                      <div>
                        {/* <MenuItem > <i className="uil uil-crockery"></i> Create Food Order </MenuItem> */}
                        <MenuItem > <i className="uil uil-film"></i> Create Movie Order </MenuItem>
                        
                      </div>
                    )
                  }else if (employee.department === 'External Department') {
                    return (
                      <div>
                        {/* <MenuItem > <i className="uil uil-crockery"></i> Create Food Order </MenuItem> */}
                        <MenuItem > <i class="uil uil-comment-alt-lines"></i> Record Communication </MenuItem>
                        <MenuItem routerLink={<Link to="/view_movie_details" />}> <i class="uil uil-film"></i> Movie Producers </MenuItem>
                        <MenuItem routerLink={<Link to="/view_supplier" />}> <i class="uil uil-utensils-alt"></i> Food And Beverages Supplier </MenuItem>
                        <MenuItem routerLink={<Link to="/view_advertising" />}> <i class="uil uil-lottiefiles"></i> Advertising Partners </MenuItem>
                        <MenuItem > <i class="uil uil-file-medical-alt"></i> External Report </MenuItem>
                        
                      </div>
                    )
                  }else {
                    return (
                      <div></div>
                    )
                  }
                })()}
                    <MenuItem routerLink={<Link to="/personal_working_time"/>}> <i className="uil uil-schedule"></i> View My Schedule </MenuItem>
                    <MenuItem routerLink={<Link to="/create_fund_request"/>}> <i className="uil uil-file-edit-alt"></i> Create Fund Request </MenuItem>
                    <MenuItem routerLink={<Link to="/create_leave_request"/>}> <i className="uil uil-file-edit-alt"></i> Create Leave Request </MenuItem>
                    <MenuItem routerLink={<Link to="/create_resign_request"/>}> <i className="uil uil-file-edit-alt"></i> Create Resignation Request </MenuItem>
                    <MenuItem routerLink={<Link to="/create_facility_report"/>}> <i className="uil uil-file-edit-alt"></i> Create Facility Report </MenuItem>
                    <MenuItem >  <Button onClick={signOutHandle} className = "btn-danger">Sign Out</Button> </MenuItem>
                </Menu>
            </Sidebar>
    );
};

export default Navbar;