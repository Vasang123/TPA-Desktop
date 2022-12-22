import {Table, Button} from 'react-bootstrap';
import './view.scss';
import {CreateButton, EmployeeData} from '../controller/EmployeeController';
import Navbar from '../navbar.jsx';
function View_Employee (){
    let i = 1;
    return (
        <div className = "View-Employee">
            <Navbar/>
            <main className ="p-4">
            {/* <Table striped bordered hover className="mw-100">
            <thead>
                <tr>
                <th>No</th>
                <th>Full Name</th>
                <th>Gender</th>
                <th>Department</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Salary</th>
                </tr>
            </thead>
            <EmployeeData/>
            </Table> */}
            <EmployeeData/>

            <CreateButton/>
            </main>
        </div>
    );
};

export default View_Employee;