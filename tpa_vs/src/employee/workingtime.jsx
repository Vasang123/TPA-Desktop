import Navbar from '../navbar.jsx';
import {Button} from 'react-bootstrap';
import {EmployeeWorkingTimeData} from '../controller/EmployeeWorkingTimeController.jsx';
import './working.scss'
function View_Working_Time(){

    return(
        
        <div className = 'View_Employee_Working_Time'>
            <Navbar/>
            <main className="p-4">
                <EmployeeWorkingTimeData/>
            </main>
        </div>
    );

};

export default View_Working_Time