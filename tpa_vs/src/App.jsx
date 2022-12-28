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
import CreateCommunication from './external/createCommunication.jsx'
import ViewMember from './voucher/viewMember.jsx'
import ViewVoucher from './voucher/viewVoucher.jsx'
import CreateVoucher from './voucher/createVoucher.jsx'
import ViewFacility from './storage/viewFacility.jsx'
import ViewFund from './storage/viewFund.jsx'
import PurchaseItem from './storage/purchaseItem.jsx'
import ViewFacilityReport from './storage/facilityReport.jsx'
import ViewMovieContract from './movie/viewMovieContract.jsx'
import CreateSchedule from './movie/createSchedule.jsx'
import ViewMovieSchedule from './movie/viewMovieSchedule.jsx'
import UpdateMovieSchedule from './movie/updateMovieSchedule.jsx'
import ViewSalaryAdjustment from './finance/viewSalaryAdjustment.jsx'
import ViewFundRequest from './finance/viewFundRequest.jsx'
import ViewPurchaseReport from './finance/viewPurchaseReport.jsx'
import CreateMovieOrder from './movie/createMovieOrder.jsx'
import CheckOutOrder from './movie/checkOutOrder.jsx'
import UseVoucher from './movie/useVoucher.jsx'
import UseMember from './movie/useMember.jsx'
import ChoosePayment from './movie/choosePayment.jsx'
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
            <Route path='/create_communication' element ={<CreateCommunication/>}></Route>
            <Route path='/view_member' element ={<ViewMember/>}></Route>
            <Route path='/view_promo' element ={<ViewVoucher/>}></Route>
            <Route path='/create_voucher' element ={<CreateVoucher/>}></Route>
            <Route path='/view_facility' element ={<ViewFacility/>}></Route>
            <Route path='/view_fund' element ={<ViewFund/>}></Route>
            <Route path='/purchase_item' element ={<PurchaseItem/>}></Route>
            <Route path='/view_facility_report' element ={<ViewFacilityReport/>}></Route>
            <Route path='/view_movie_contract' element ={<ViewMovieContract/>}></Route>
            <Route path='/create_schedule' element ={<CreateSchedule/>}></Route>
            <Route path='/view_schedule' element ={<ViewMovieSchedule/>}></Route>
            <Route path='/update_movie_schedule' element ={<UpdateMovieSchedule/>}></Route>
            <Route path='/view_salary_adjustment' element ={<ViewSalaryAdjustment/>}></Route>
            <Route path='/view_fund_request' element ={<ViewFundRequest/>}></Route>
            <Route path='/view_purchase_report' element ={<ViewPurchaseReport/>}></Route>
            <Route path='/create_movie_order' element ={<CreateMovieOrder/>}></Route>
            <Route path='/check_out_movie' element ={<CheckOutOrder/>}></Route>
            <Route path='/use_voucher' element ={<UseVoucher/>}></Route>
            <Route path='/use_member' element ={<UseMember/>}></Route>
            <Route path='/choose_payment' element ={<ChoosePayment/>}></Route>
            
        </Routes>
        </BrowserRouter>
    </ProSidebarProvider>
        
    )
  
}

export default App;
