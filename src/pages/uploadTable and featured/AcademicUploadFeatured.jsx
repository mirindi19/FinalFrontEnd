import "./academicUploadFeatured.scss"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useEffect,useState } from "react";
import axios from "axios";
const AcademicUploadFeatured = () => {
  const [employeData,setEmployeData]=useState([])
  const [percetFemale,setPercetFemale]=useState('')
  const [numberOfMan,setNumberOfMan]=useState('')
  const [numberOfWowen,setNumberOfWomen]=useState('')
  const [orgData,setOrgData]=useState([]);
  console.log("rez,...",employeData)
  let maleCounter=0
  let femaleCounter=0



  const getOrginizatonCollectionByUderId=async()=>{
    try {
      const token = await localStorage.getItem("access-token");
          let headers;
          if (token) {
            headers = {
              "Content-Type": "application/json",
              token: `${token}`,
            };
          } else {
            headers = {
              "Content-Type": "application/json",
            };
          }
          const res = await axios.get(`http://localhost:2345/organisation/educationCollectionbyOrgId`,
           {
            headers: headers,
          });
          const collection = await res.data;
          setOrgData(collection.data.educationCollections) 

          collection.data.educationCollections.map((p)=>{
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
           setNumberOfMan(maleCounter)
            console.log("male female",maleCounter,femaleCounter)
           })

    } catch (error) {
      console.log("error response",error)
    }
     }
    
      useEffect(()=>{
    getOrginizatonCollectionByUderId();
      },[])






  // useEffect(()=>{
  //   async function fetchData(){
  //     await axios.get('http://localhost:2345/empCollection/collection').then((response)=>{
  //         setEmployeData(response.data.data);  
  //          response.data.data.map((p)=>{
  //           if(p.gender=="Male"){
  //             maleCounter=maleCounter+1
  //           }
  //           else{
  //             femaleCounter=femaleCounter+1
  //           }
  //           const total=maleCounter+femaleCounter
  //           const percentageFemale=((femaleCounter*100)/total).toFixed(2)
  //           console.log("wommm",numberOfWowen)
  //           setNumberOfWomen(femaleCounter)
  //            setPercetFemale(percentageFemale)
           
  //           console.log("male female",maleCounter,femaleCounter)
  //          })
            
  //         }     
  //     ).cacth(err=>{
  //     console.log(err)}
  //     )
  //     }
  //     fetchData();
  // },[])
  return (
    <div className="semifeatured">
        <div className="top">
          <h1 className="title">Total Women</h1>
          <MoreVertIcon fontSize="small"/>
        </div>
        <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={percetFemale} text={percetFemale+"%"} strokeWidth={5}/>
        </div>
        <p className="title">Total women registered</p>
        <p className="Total">{numberOfWowen}</p>
        <p className="desc">Total Number of man</p>
        <p className="Total">{numberOfMan}</p>
        
        
        </div>
    </div>
  )
}

export default AcademicUploadFeatured