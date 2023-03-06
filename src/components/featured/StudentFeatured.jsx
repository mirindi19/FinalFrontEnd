import "./studentFeatured.scss"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useEffect,useState } from "react";
import axios from "axios";
const StudentFeatured = () => {
  const [academicData,setAcademicData]=useState([])
  const [percetFemale,setPercetFemale]=useState('')

  const [numberOfWowen,setNumberOfWomen]=useState('')
  console.log("rez,...",academicData)
  let maleCounter=0
  let femaleCounter=0
  useEffect(()=>{
    async function fetchData(){
      await axios.get('http://localhost:2345/educationCollection/educationCollection').then((response)=>{
          setAcademicData(response.data.data);  
           response.data.data.map((p)=>{
            if(p.gender=="Male"){
              maleCounter=maleCounter+1
            }
            else{
              femaleCounter=femaleCounter+1
            }
            const total=maleCounter+femaleCounter
            const percentageFemale=((femaleCounter*100)/total).toFixed(2)
            console.log("wommm",numberOfWowen)
            setNumberOfWomen(femaleCounter)
             setPercetFemale(percentageFemale)
           
            console.log("male female",maleCounter,femaleCounter)
           })
            
          }     
      ).cacth(err=>{
      console.log(err)}
      )
      }
      fetchData();
  },[])
  return (
    <div className="studentfeatured">
        <div className="top">
          <h1 className="title">Academic</h1>
          <MoreVertIcon fontSize="small"/>
        </div>
        <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={percetFemale} text={percetFemale+"%"} strokeWidth={5}/>
        </div>
        <p className="title">Total women registered</p>
        <p className="Total">{numberOfWowen}</p>
        {/* <p className="desc">Total Number of man</p>
        {percetFemale}  */}
        <div className="summary">
        
         
       
        </div>
        </div>
    </div>
  )
}

export default StudentFeatured