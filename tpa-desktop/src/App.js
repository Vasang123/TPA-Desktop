// import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Login from './login/Login.jsx';
import Dashboard from './dashboard/dashboard.jsx'
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
        <BrowserRouter>
        <Routes>
            <Route path='/login' element ={<Login/>}></Route>
            <Route path='/dashboard' element ={<Dashboard/>}></Route>
        </Routes>
        </BrowserRouter>
        
    )
  
}

export default App;
