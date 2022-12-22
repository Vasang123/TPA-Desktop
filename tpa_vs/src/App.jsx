import './App.css';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Login from './login/Login.jsx';
import Dashboard from './dashboard/dashboard.jsx'
import CreateEmployee from './employee/createEmployee.jsx'
import ViewEmployee from './employee/viewEmployee.jsx'
import ViewWorkingTime from './employee/workingtime.jsx'
import UpdateWorkingTime from './employee/updateWorkingTime.jsx'
import CreateWarningLetter from './employee/warningLetter.jsx'
import ViewWarningLetter from './employee/viewWarningLetter.jsx'
import CreateLeaveRequest from './employee/leaveRequest.jsx'
import CreateFundRequest from './employee/createFundRequest.jsx'
import CreateFacilityReport from './employee/createFacilityReport.jsx'
import CreateResignRequest from './employee/createResignRequest.jsx'
import ViewLeaveRequest from './employee/viewLeaveRequest.jsx'
import PersonalWorkingTime from './employee/personalWorkingSchedule.jsx'
import AdjustSalary from './employee/adjustSalary.jsx'
import ViewMovieDetails from './external/movie.jsx'
import CreateMovie from './external/createMovie.jsx'
import ViewSupplierDetails from './external/foodAndBeverage.jsx'
import CreateSupplier from './external/createSupplier.jsx'
import ViewAdvertisingDetails from './external/advertising.jsx'
import CreateAdvertising from './external/createAdvertising.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
    return (
    <ProSidebarProvider>
        <BrowserRouter>
        <Routes>
            <Route path='/dashboard' element ={<Dashboard/>}></Route>
            <Route path='/login' element ={<Login/>}></Route>
            <Route path='/create_employee' element ={<CreateEmployee/>}></Route>
            <Route path='/view_employee' element ={<ViewEmployee/>}></Route>
            <Route path='/view_working_time' element ={<ViewWorkingTime/>}></Route>
            <Route path='/update_working_time' element ={<UpdateWorkingTime/>}></Route>
            <Route path='/create_warning_letter' element ={<CreateWarningLetter/>}></Route>
            <Route path='/view_warning_letter' element ={<ViewWarningLetter/>}></Route>
            <Route path='/create_leave_request' element ={<CreateLeaveRequest/>}></Route>
            <Route path='/view_leave_request' element ={<ViewLeaveRequest/>}></Route>
            <Route path='/personal_working_time' element ={<PersonalWorkingTime/>}></Route>
            <Route path='/create_fund_request' element ={<CreateFundRequest/>}></Route>
            <Route path='/create_resign_request' element ={<CreateResignRequest/>}></Route>
            <Route path='/create_facility_report' element ={<CreateFacilityReport/>}></Route>
            <Route path='/adjust_salary' element ={<AdjustSalary/>}></Route>
            <Route path='/view_movie_details' element ={<ViewMovieDetails/>}></Route>
            <Route path='/create_movie' element ={<CreateMovie/>}></Route>
            <Route path='/view_supplier' element ={<ViewSupplierDetails/>}></Route>
            <Route path='/create_supplier' element ={<CreateSupplier/>}></Route>
            <Route path='/view_advertising' element ={<ViewAdvertisingDetails/>}></Route>
            <Route path='/create_advertising' element ={<CreateAdvertising/>}></Route>
        </Routes>
        </BrowserRouter>
    </ProSidebarProvider>
        
    )
  
}

export default App;
