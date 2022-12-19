import { Sidebar, Menu, MenuItem , sidebarClasses  } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
function Navbar(){
    return (
            <Sidebar
            rootStyles={{
                [`.${sidebarClasses.container}`]: {
                  backgroundColor: `rgb(250, 241, 230)`
                },
              }}>
                <Menu>
                    <MenuItem routerLink={<Link to="/dashboard" />}> <i className="uil uil-estate"></i> Home </MenuItem>
                    <MenuItem routerLink={<Link to="/view_employee" />}> <i className="uil uil-users-alt"></i> View Employee </MenuItem>
                    <MenuItem > <i className="uil uil-file-edit-alt"></i> Create Warning Letter </MenuItem>
                    <MenuItem routerLink={<Link to="/view_working_time"/>}> <i className="uil uil-clock"></i> View Employee Working Time </MenuItem>
                </Menu>
            </Sidebar>
    );
};

export default Navbar;