import React from 'react';
import "./empRadar.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import {totalnumberOfFemale} from '../featured/Featured'
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);
export let data=[]

function RadarChart() {
    const [datas, setDatas] = useState({ datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
     
      let agebetween18and25Counter = 0;
      let agebetween25and35Counter = 0;
      let agebetween35and45Counter = 0;
      let agebetween45and55Counter = 0;
      let ageBetween18and25 = 0;
      let ageBetween25and35 = 0;
      let ageBetween35and45 = 0;
      let ageBetween45and55 = 0;

      let femaleCounter=0
      // const marksBetween50and75=0;
      const nameSet = [];
      const valueSet = [];

      await axios
        .get(`http://localhost:2345/empCollection/collection`)
        .then(function(response) {
          const res = response.data.data;
          return res;
        })
        .then(function(res) {
          res.map((p)=>{
            // let totalMarksmarks = res[key].total;
            // let counter=res[key].AssessmentCount;
            // let percentangeResult=(totalMarksmarks/(counter*100))*100
             let totalNumberStudents = res.length;
          //  if(p.gender=="Female"){
          //  femaleCounter=femaleCounter+1
          //  }
          console.log("rhrhhrh",totalnumberOfFemale.length)
             if (p.gender=="Female" && p.age < 25) {
              agebetween18and25Counter = agebetween18and25Counter + 1;
              ageBetween18and25 =(
                (agebetween18and25Counter /  totalnumberOfFemale.length) * 100
              ).toFixed(2);
              //break;
            } else if (p.gender=="Female" && p.age < 35) {
              agebetween25and35Counter = agebetween25and35Counter + 1;
              ageBetween25and35 =(
                (agebetween25and35Counter / totalnumberOfFemale.length) * 100
              ).toFixed(2);
              //break;
            } else if (p.gender=="Female" && p.age < 45) {
              agebetween35and45Counter =agebetween35and45Counter + 1;
              ageBetween35and45 =(
                (agebetween35and45Counter /totalnumberOfFemale.length) * 100
              ).toFixed(2);
              // break;
            } else if (p.gender=="Female" && p.age < 55) {
              agebetween45and55Counter = agebetween45and55Counter + 1;
              ageBetween45and55 =(
                (agebetween45and55Counter / totalnumberOfFemale.length) * 100
              ).toFixed(2);
              // break;
            }
            else{
              return null;
            }
          })
           data = [
            { name: "Female age between 18-25 ", value: ageBetween18and25 },
            {
              name: "Female age between  25-35",
              value: ageBetween25and35,
            },
            {
              name: "Female age between  35-45",
              value: ageBetween35and45,
            },
            {
              name: "Female age between  45-55",
              value: ageBetween45and55 ,
            },
          ];
          data.map((d) => {
            nameSet.push(d.name);

            valueSet.push(d.value);
            console.log("value bbb", d.value);
          });

          setDatas({
            labels: nameSet,
            datasets: [
              {
                label: "Number of women depending on Age :%",
                data: valueSet,
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
        })

        .catch(function(error) {
          console.log("error", error);
        });
    };
    fetchData();
  }, []);
  return (
    <div className="radarChart">
    <span className="radarChartTitle">Number of women depending on their Age</span>
      
      <Radar 
        data={datas}
        options={{
          tooltips: {
            model: "index",
            callbacks: {
              label: function (toolTipItem) {
                return "Revenue: %" + toolTipItem.data;
              },
            },
          }
          
          }}
        
      ></Radar>
    </div>
  )
}

export default RadarChart