import React, { useEffect, useState } from "react";
import './menu.css'
import Header from './header'
import { useNavigate } from "react-router-dom";



const Menu= ()=>{

const [licensePlate,setLicensePlate]= useState('')
const [inputError, setInputError] = useState('');
const [isFullError, setIsFullError] = useState('');



let navigate = useNavigate()

const fetchCheckLicense=async(licensePlate : string)=>{
    const response= await fetch('http://localhost:3000/parking/checkLicensePlate?licensePlate='+licensePlate);
    
    if (response.ok) {
        const data = await response.json();
        return data;
        //console.log(data);
      } else {
        console.error('Error at the fetch:', inputError);
        return null
      }
}

const fetchIsFull=async()=>{
    const response= await fetch('http://localhost:3000/parking/isFull');
    if (response.ok) {
        const data = await response.json();
        return data;
        //console.log(data);
      } else {
        console.error('Error at the fetch:', inputError);
        return null
      }
}

const enterLicense = async () => {
    if (licensePlate.trim() === '') {
        setInputError('License plate cannot be empty.');
        return;
    }
    if (licensePlate.length != 6 ) {
        setInputError('License plate must be 6 characters.');
        return;
    }
    const isFull= await fetchIsFull();
    if(isFull == true){
        setInputError('');
        setIsFullError("Parking is full")
        return;
    }
    else{
        const checkLicense= await fetchCheckLicense(licensePlate);
        
        if (checkLicense== false){
            console.log(checkLicense)
            console.log('entra');
            navigate('/parking/',{ state: { licensePlate } });
            setInputError('');
            setIsFullError('');
            return;

        }
        else{
            setIsFullError('License plate already in the parking');
            return;

        }
    }
    

  };

    return(
    <div>
        <Header/>
        <div className="container">
            <img src="/resources/images/parkingGate.png" alt="Parking Gate" className="parking-image" />
            <div className="input-container-error">
                <div className="input-container">
                    <div className="label-container">
                        <label htmlFor="licenseInput">License Plate:</label>
                        <input id="licenseInput" type="text" placeholder="Enter the license plate" value={licensePlate} onChange={(e) => setLicensePlate(e.target.value.toUpperCase())} maxLength={6}  />
                        {inputError && <p className="error-message">{inputError}</p>}
                    </div>
                    <button onClick={enterLicense}>Enter</button>
                </div>
                {isFullError && <p className="isFullError-message">{isFullError}</p>}
            </div>
        </div>
        <div className="parking-fee-card">
            <h2>Parking Lot Capacity and Pricing</h2>
                <p>
                    <strong>Capacity:</strong> 5 parking spots
                </p>
                <p>
                    <strong>Pricing:</strong>
                    First 3 hours: €0.50 per starting 10 minutes<br />
                    Subsequent hours: €0.30 per starting 10 minutes
                </p>
        </div>
    </div>
    );
}

export default Menu