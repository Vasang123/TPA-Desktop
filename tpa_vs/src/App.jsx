import './App.css';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Login from './login/Login.jsx';
import Dashboard from './dashboard/dashboard.jsx'
import CreateEmployee from './employee/createEmployee.jsx'
import ViewEmployee from './employee/viewEmployee.jsx'
import ViewWorkingTime from './employee/workingtime.jsx'
// import Navbar  from './navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  
    // const [employee, setEmployee] = useState([]);
    // const usersCollectionRef = collection(db , "employee");
    // useEffect(() => {
    //   const getEmployee = async () => {
    //     const data = await getDocs(usersCollectionRef);
    //     setEmployee(data.docs.map((doc)=> ({...doc.data(), id: doc.id})));
    //   }
    //   getEmployee();
    // }, []);
    // return (
    // <div className='App'> 
    //   {employee.map((employee) => {
    //     return <div> 
    //       <h1> {employee. Name}</h1> 
    //       <h1> {employee.Age}</h1> 
    //       </div>

    //   })}
      
    // </div>


    
    // );
    return (
    <ProSidebarProvider>
        <BrowserRouter>
        <Routes>
            <Route path='/dashboard' element ={<Dashboard/>}></Route>
            <Route path='/login' element ={<Login/>}></Route>
            <Route path='/create_employee' element ={<CreateEmployee/>}></Route>
            <Route path='/view_employee' element ={<ViewEmployee/>}></Route>
            <Route path='/view_working_time' element ={<ViewWorkingTime/>}></Route>
        </Routes>
        </BrowserRouter>
    </ProSidebarProvider>
        
    )
  
}

export default App;
