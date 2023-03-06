import { useState } from "react";
import { Pie } from "react-chartjs-2"


const ProvinceGraph=({labels,values})=>{
    //const [data,setData]=useState([])
   const data={
        labels: labels,
        datasets: [
        {
         label: "Percentage of Female compared to Male academic",
         data: values,
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
        };
        
return(
    <Pie data={data}/>
)
}
export default ProvinceGraph