import React from "react";
import "./privatePublicPieChart.scss";
import "chart.js/auto";
import { Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axios from "axios";

function PrivatePublicPieChart() {
  const [data, setData] = useState({ datasets: [] });
  const [employeData,setEmployeData]=useState([])
  const [percetFemale,setPercetFemale]=useState('')
  const [percetMale,setPercetMale]=useState('')

  const [numberOfWowen,setNumberOfWomen]=useState('')
  const [numberOfMan,setNumberOfMan]=useState('')
  const [numberOfPrivateFemale,setNumberOfPrivateFemale]=useState('')
  const [numberOfPublicFemale,setNumberOfPublicFemale]=useState('')
  console.log("rez,...",employeData)
  let maleCounter=0
  let femaleCounter=0
  let percentageFemale=0
  let percentageMale=0

  useEffect(() => {
    async function fetchData() {
      const labelSet = [];
      const dataSet1 = [];
      const dataSet2 = [];
      const genderSetFemale = [];
      const genderSetMale = [];
      await axios.get('http://localhost:2345/organisation/numbertoffemalebasedonsector').then((response)=>{
      setEmployeData(response.data.data);  
        const res = response.data.data;
       
        return res;
    }).then(function(res) {
      
          labelSet.push("Gender");
          setNumberOfPrivateFemale(res[0].tudentCount)
          setNumberOfPublicFemale(res[1].studentCount)
          let total=parseInt(res[0].studentCount) + parseInt(res[1].studentCount);
          percentageFemale=((parseInt(res[0].studentCount)*100)/total).toFixed(2)
          percentageMale=((parseInt(res[1].studentCount)*100)/total).toFixed(2)
          dataSet1.push(percentageFemale)
          dataSet2.push(percentageMale)
            genderSetMale.push("Private")
            genderSetFemale.push("Public")
          
     setData({
      labels: [genderSetFemale,genderSetMale],
      datasets: [
        {
          label: "Percentage of Female compared to Public  and Private Sector",
          data: [dataSet1,dataSet2],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
       borderColor: [
            'rgb(255, 99, 132)',
            'rgb(75, 192, 192)',
            'rgb(255, 205, 86)',
            'rgb(255, 159, 64)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1,
          barThickness: 12,
        },
      ],
      options: {
        layout: {
          padding: 20
      },
        animation: true,
        plugins: {
          legend: {
              labels: {
                  font: {
                      size: 14
                  }
              }
          }
      },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
    });



          
        }     
    ).cacth(err=>{
    console.log(err)}
    )
    }
    fetchData();
  }, []);

  return (
    <div className="empPie">
      <span className="pieChartTitle">
      Percentage of Private and Public 
      </span>
      <Pie data={data}></Pie>
    </div>
  );
}

export default PrivatePublicPieChart;