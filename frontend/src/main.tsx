import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './main.css'

import Management from './components/management/manegement';
import Parking from "./components/parking/parkingSpots"
import {createBrowserRouter,RouterProvider,Route} from "react-router-dom";


const Router = createBrowserRouter([
  {
      path:"/",
      element:<App/>

  },
  {
    path:"/parking",
    element:<Parking/>
},
{
  path:"/management",
  element:<Management/>
}
])




ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={Router} />
  </React.StrictMode>,
);
