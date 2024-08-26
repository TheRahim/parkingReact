
import { useEffect, useState } from 'react';
import './App.css'
import Menu from './components/menu';



//let carPlate: String = "CSX 931"

function App() {
  
/*
  useEffect(()=>{
    fetch('http://localhost:3000/parking/getSpots')
      .then(response => response.json())
      .then(res => console.log(res))
      .catch(err => console.log(err))
  },[])
*/
  return (
    
  <div className="body">
    <Menu/>
  </div>
  );
}

export default App;
