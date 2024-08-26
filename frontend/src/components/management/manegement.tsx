import React, { useEffect, useState } from "react";
import Header from "../header";
import TimeElapsed from "./timeElapsed";
import "./management.css"
import { useNavigate } from "react-router-dom";


function Management(){

    interface Spot{
        "_id": string,
        "spot": number,
        "licensePlate": string,
        "entryTime": Date,
        "exitTime": string,
        "__v": number
    }

    const [licensePlate,setLicensePlate]= useState('')
    const [inputError, setInputError] = useState('');
    const [loading, setLoading] = useState<boolean>(true);
    const [spots, setSpots] = useState<Spot[]>([]);
    const [showDialog, setShowDialog] = useState<boolean>(false);


    let navigate =useNavigate()

    const now= new Date();
    const nowTime = now.toString()
    
    const enterLicense = async () => {
        if (licensePlate.trim() === '') {
            setInputError('License plate cannot be empty.');
            return;
        }
        if (licensePlate.length != 6 ) {
            setInputError('License plate must be 6 characters.');
            return;
        }
        else{
            const response= await fetch('http://localhost:3000/parking/checkLicensePlate?licensePlate='+licensePlate)
            if (response.ok) {
                const data = await response.json();
                if (data){
                    setShowDialog(true);
                    console.log('abre dialog');
                    setInputError('');
                    return;
        
                }
                else{
                    setInputError('License plate must exist');
                    return;
                }
              } else {
                console.error('Error at the fetch:', inputError);
                return null
              }
            
        }
        
    
      };
      const exitCar = async(licensePlate: string)=>{
        try {
            const response = await fetch('http://localhost:3000/parking/exitCar', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    licensePlate,
                }),
            });
            if (response.ok) {
                setShowDialog(false)
                fetchSpots()
                const data = await response.json();
                return data;
            } else {
                console.error('Error en la api',Error);
                return null;
            }
        } catch (error) {
            console.error('Fetch error:', error);
            return null;
        }
   };

    const fetchSpots = async () => {
        try {
            const response = await fetch('http://localhost:3000/parking/getSpots');
            const data= await response.json() as Spot[];
            //console.log(data)
            setSpots(data); 
        } catch (error) {
            console.error('Error fetching spots:', error);
        } 
        setLoading(false);
    };
    
    useEffect(() => {
        fetchSpots();
    },[]);

    return(
        <div>
            <header>
                <button onClick={()=>navigate('/') } className="gate-button">Parking Gate</button>
                <Header/>
                
            </header>
            <div>
                    {loading ? (
                    <p>Loading...</p>
                            ) : spots.length > 0 ? (
                    <div className="spots-container">{spots.map((spot)=>{
                        return <div className="spot">
                                    <a className="spotnumber">Spot {spot.spot}</a>
                                    <a>{spot.licensePlate}</a>
                                    <a><TimeElapsed entryTime={spot.entryTime}/> </a>
                                    
                                </div>})}
                    </div>
                    ) : (<p>Parking is empty.</p>)}
            </div>
            <div className="input-container">
                    <div className="label-container">
                        <label htmlFor="licenseInput">License Plate:</label>
                        <input id="licenseInput" type="text" placeholder="Enter the license plate" value={licensePlate} onChange={(e) => setLicensePlate(e.target.value.toUpperCase())} maxLength={6}  />
                        {inputError && <p className="error-message">{inputError}</p>}
                    </div>
                    <button onClick={enterLicense}>Enter</button>
                </div>

                {showDialog && (
                     <div className="dialog-overlay">
                     <div className="dialog-content">
                        <div>

                        </div>
                       <h2>PayCheck</h2>
                       <h3>License Plate:{licensePlate}</h3>
                       <div className="footer-dialog">
                            <button onClick={() => setShowDialog(false)}>Close</button>
                            <button onClick={() => exitCar(licensePlate)}>Pay and Exit</button>
                       </div>
                     </div>
                   </div>
                )}

        </div>
    )

}
export default Management;
//<a><TimeElapsed entryTime={spot.entryTime} /></a>