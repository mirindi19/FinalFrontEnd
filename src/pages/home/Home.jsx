import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import"./home.scss"
import Widget from "../../components/widget/Widget"
import Featured from "../../components/featured/Featured"
import Chart from "../../components/chart/Chart"
import EmpRadar from"../../components/radar/EmpRadar"
import EmpPieChart from "../../components/chart/EmpPieChart"
import StudentFeatured from "../../components/featured/StudentFeatured"
import StudentChart from "../../components/chart/StudentChart"
import AcademicPieChart from"../../components/chart/AcademicPieChart"
import AcademicRadar from "../../components/radar/AcademicRadar"
import { useContext, useEffect } from "react"
import  AuthContext  from "../../components/context"
import { useSelector } from "react-redux"

const Home =() => {
  const {auth,setAuth}=useContext(AuthContext)
  const login = useSelector(state => state.login)
  useEffect(()=>{
async function fecthData(){
if(!login.loading){{
  if(login.data.length!==0){
setAuth({role:login.data.data.role})
  }
}}
}
fecthData()
  },[login.data])

  return (
    <div className="home">
       <Sidebar/>
       <div className='homeContainer'>
        <Navbar/>
        <div className="widgets">
        <Widget type="user"/>
        <Widget type="organisation"/>
        <Widget type="academic"/>
        <Widget type="employee"/>
        </div>
        <div className="charts">
          <Featured/>
           <Chart/>
        </div>
        <div className="empChartt">
          <EmpPieChart/>
          <EmpRadar/>
         </div>
         
        <div className="studentChart">
        <StudentFeatured/>
        {/* <StudentChart/> */}
        <AcademicPieChart/>
        </div>

        <div className="academicPieRadar">
        
        <AcademicRadar/>
        </div>

        </div>
      </div>
  )
}

export default Home