import React from "react";
import "./empPieChart.scss";
import "chart.js/auto";
import { Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axios from "axios";

function EmpPieChart() {
  const [data, setData] = useState({ datasets: [] });
  const [employeData,setEmployeData]=useState([])
  const [percetFemale,setPercetFemale]=useState('')
  const [percetMale,setPercetMale]=useState('')

  const [numberOfWowen,setNumberOfWomen]=useState('')
  const [numberOfMan,setNumberOfMan]=useState('')
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
      await axios.get('http://localhost:2345/empCollection/collection').then((response)=>{
        setEmployeData(response.data.data);  
        const res = response.data.data;
        return res;
    }).then(function(res) {
          labelSet.push("Gender");
          console.log("response res ...",res )
          res.map((p)=>{
            if(p.gender=="Male"){
              maleCounter=maleCounter+1
              setNumberOfMan(maleCounter)
            }
            else{
              femaleCounter=femaleCounter+1
              setNumberOfWomen(femaleCounter)
            }
            let total=maleCounter+femaleCounter;
          percentageFemale=((femaleCounter*100)/total).toFixed(2)
          percentageMale=((maleCounter*100)/total).toFixed(2)
          console.log("dataset 1 and 2",percentageFemale,percentageMale)
          })
          dataSet1.push(percentageFemale)
          dataSet2.push(percentageMale)
            genderSetMale.push("Male")
            genderSetFemale.push("Female")
          
     setData({
      labels: [genderSetFemale,genderSetMale],
      datasets: [
        {
          label: "Percentage of Female compared to Male jimmm",
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


    console.log("arrData", dataSet1, dataSet2, labelSet)
          
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
      Percentage of Female compared to Male 
      </span>
      <Pie data={data}></Pie>
    </div>
  );
}

export default EmpPieChart;