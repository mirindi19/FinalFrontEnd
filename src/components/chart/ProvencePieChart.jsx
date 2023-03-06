import React from "react";
import "./provencePieChart.scss";
import "chart.js/auto";
import { Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axios from "axios";
import ProvinceGraph from "./ProvinceGraph";

function ProvencePieChart() {
  const [data, setData] = useState({ datasets: [] });
  const [employeData,setEmployeData]=useState([])
  const [percetFemale,setPercetFemale]=useState('')
  const [percetMale,setPercetMale]=useState('')
  const [numberOfWowen,setNumberOfWomen]=useState('')
  const [numberOfMan,setNumberOfMan]=useState('')

  // provinces
  const [kigali,setKigali]=useState(0)
  const [west,setWest]=useState(0)
  const [east,setEast]=useState(0)
  const [nouth,setNouth]=useState(0)
  const [south,setSouth]=useState(0)
  console.log("rez,...",employeData)
  let maleCounter=0
  let femaleCounter=0
  let percentageFemale=0
  let percentageMale=0
  let percentageKigali=0
  let percentageWesten=0
  let percentageEast=0
  let percentageSouth=0
  let pecenatgeNounth=0
  const labelSet = [];
  const dataSet1 = [];
  const dataSet2 = [];
  const genderSetFemale = [];
  const genderSetMale = [];
const [response,setResponse]=useState([])

  useEffect(() => {
    async function fetchData() {
     
      await axios.get('http://localhost:2345/organisation/numberoffemalebasedonprovince').then((response)=>{
        setEmployeData(response.data.data);  
       const res = response.data.data;
        setResponse(res)
        return res;
    }).then(function(res) {
      labelSet.push("Gender");
      console.log('all data...:',res)
      
          res.forEach((p)=>{
            console.log('aaaaaaaaaaaaaaaaaaaa')
            if(p.provinceName==="Kigali"){
              console.log('================')
              setKigali(parseInt(p.numberofFemale))
            }
            else if(p.provinceName==="Nouth"){
              console.log('========+++++========')
              setNouth(parseInt(p.numberofFemale))
            }
            else if(p.provinceName==="Westen"){
              console.log('========uuuuuuuuuuu========')
              setWest(parseInt(p.numberofFemale))
            }
            else if(p.provinceName==="South"){
              setSouth(parseInt(p.numberofFemale))
            }
            else if(p.provinceName==="East"){
              setEast(parseInt(p.numberofFemale))
            }
         

          })
          
        }     
    ).cacth(err=>{
    console.log(err)}
    )
    }
    fetchData();
  }, []);
  let total=kigali+west+east+nouth+south;
  let labels=[]
  let values=[]
  
 response.forEach(p=>{
  let perc=(parseInt(p.numberofFemale)*100)/total
labels.push(p.provinceName)
values.push(perc)
 })

 console.log('percentage ',response)
//   percentageFemale=((femaleCounter*100)/total).toFixed(2)
//   percentageMale=((maleCounter*100)/total).toFixed(2)
//  console.log("dataset 1 and 2",percentageFemale,percentageMale)
//  console.log('all province :..',kigali,west,east,nouth,south)
//  dataSet1.push(percentageFemale)
//  dataSet2.push(percentageMale)
//    genderSetMale.push("Kigali")
//    genderSetFemale.push("West")
 


//console.log("arrData", dataSet1, dataSet2, labelSet)
  
         
   console.log('all province useEff :..',kigali,west,east,nouth,south)
  return (
    <div className="empPie">
      <span className="pieChartTitle">
      Percentage of Province
      </span>
      <ProvinceGraph labels={labels} values={values} ></ProvinceGraph>
    </div>
  );
}

export default ProvencePieChart;