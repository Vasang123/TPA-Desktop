import { useState, useEffect } from 'react';
import { db } from './firebase'
import {collection, getDocs} from 'firebase/firestore'
import './App.css';

function App() {
  
    const [employee, setEmployee] = useState([]);
    const usersCollectionRef = collection(db , "employee");
    useEffect(() => {
      const getEmployee = async () => {
        const data = await getDocs(usersCollectionRef);
        setEmployee(data.docs.map((doc)=> ({...doc.data(), id: doc.id})));
      }
      getEmployee();
    }, []);
    return (
    <div className='App'> 
      {employee.map((employee) => {
        return <div> 
          <h1> {employee. Name}</h1> 
          <h1> {employee.Age}</h1> 
          </div>

      })}
      
    </div>


    
    );
  
}

export default App;
