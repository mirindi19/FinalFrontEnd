import React from "./reportuser.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import TotalPercWomen from "../percForm/TotalPercWomen"

const Reportuser = () => {
  return (
    <div className="listreport">  
       <Sidebar/>
        
        <div className="listContainerreport">
        <Navbar/>
        <div className="total">
        <TotalPercWomen/>
        </div>
        </div>
    </div>
  )
}

export default Reportuser