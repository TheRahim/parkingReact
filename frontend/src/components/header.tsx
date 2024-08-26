

import { Router, useNavigate } from 'react-router-dom'
import './header.css'



const Header=()=>{
    
    let navigate= useNavigate();

    return(

        <div className='header'>
            <h1>PARKING LOT</h1>
            <button onClick={()=>navigate('/management/') } className="management-button">Management Page</button>
        </div>
    )
}

export default Header