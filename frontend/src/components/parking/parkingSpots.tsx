import React, { useEffect, useState } from "react";
import Header from "../header";
import "./parkingSpots.css"
import { useLocation, useNavigate } from "react-router-dom";


function Parking(){
    

    const [inputError,setInputError]=useState('');
    const [inputValidation,setInputValidation]=useState('');
    const [spot, setSpot]=useState<number | "">("")

    const [freeSpots, setFreeSpots] = useState<number[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const location = useLocation();
    const { licensePlate } = location.state || {}; 

    let navigate = useNavigate()

    

    const fetchSpots = async () => {
        try {
            const response = await fetch('http://localhost:3000/parking/checkSpots');
            const data: number[] = await response.json();
            setFreeSpots(data); 
        } catch (error) {
            console.error('Error fetching spots:', error);
        } 
        setLoading(false);
    };
    useEffect(() => {
        fetchSpots();
    });

    const parkCar = async (spot: number, licensePlate: string, ) => {
        const entryTime = new Date();
       // const entryTime = now.toISOString().split('T')[1].split('.')[0];
        if(!spot){
            setInputError('Spot number cannot be empty.');
            return;
        }
        if(spot==0){
            setInputError('Spot number cannot be 0');
            return;
        }
        if(!freeSpots.includes(spot)){
            setInputError('Spot number must be a empty spot');
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/parking/parkCar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    spot,
                    licensePlate,
                    entryTime
                }),
            });
            if (response.ok) {
                setInputError('');
                navigate('/')
                setInputValidation('Car parked succesfully');
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

    return(
        <div>
            <header>
                <button onClick={()=>navigate('/') } className="gate-button">Parking Gate</button>
                <Header/>
            </header>
            <div className="licensePlate-container">
                <h2 className="licensePlate-h2"> {licensePlate} </h2>
                <h3> Empty spots in the parking </h3>
            </div>
            <div className="spots-input">
                <div>
                    {loading ? (
                        <p>Loading...</p>
                    ) : freeSpots.length > 0 ? (
                        <div className="squares-container">
                            {freeSpots.map(spot => (    <div className="square"><a>Spot</a><div key={spot} >{spot}</div> </div>   ))}
                        </div>
                    ) : (<p>No spots available.</p>)}
                </div>

                <div className="input-container">
                    <div className="label-container">
                        <label className="spot-label">Spot to park:</label>
                            
                        <input id="spot-input" type="number" inputMode="numeric" placeholder="Enter the spot number" value={spot} onChange={(e) => setSpot(Number(e.target.value) || "")}/>
                        {inputError && <p className="error-message">{inputError}</p>}
                        {inputValidation && <p className="validation-message">{inputValidation}</p>}
                    </div>
                        
                        <button onClick={()=>parkCar(Number(spot),licensePlate)}>Enter</button>
                </div>
            </div>
            
        </div>
    )

}
//<button onClick={parkCar(Number(spot),{licensePlate})}>Enter</button>
export default Parking;