import "./chart.scss"
import {  XAxis, CartesianGrid, Tooltip, AreaChart, Area,ResponsiveContainer } from 'recharts';
import { useEffect,useState } from "react";
import axios from "axios";
import { totalnumberOfFemale } from "../featured/Featured";
// const data = [
//   {
//     "name": "Page A",
//     "uv": 4000,
//     "pv": 2400,
//     "amt": 2400
//   },
//   {
//     "name": "Page B",
//     "uv": 3000,
//     "pv": 1398,
//     "amt": 2210
//   },
//   {
//     "name": "Page C",
//     "uv": 2000,
//     "pv": 9800,
//     "amt": 2290
//   },
//   {
//     "name": "Page D",
//     "uv": 2780,
//     "pv": 3908,
//     "amt": 2000
//   },
//   {
//     "name": "Page E",
//     "uv": 1890,
//     "pv": 4800,
//     "amt": 2181
//   },
//   {
//     "name": "Page F",
//     "uv": 2390,
//     "pv": 3800,
//     "amt": 2500
//   },
//   {
//     "name": "Page G",
//     "uv": 3490,
//     "pv": 4300,
//     "amt": 2100
//   },
//   {
//     "name": "Page y",
//     "uv": 3490,
  
//   }
// ]
const Chart = () => {
  const [datas, setDatas] = useState({ datasets: [] });
console.log("datas ",datas)
  useEffect(() => {
    const fetchData = async () => {
     
      let salarybetween100and300Counter = 0;
      let salarybetween300and600Counter = 0;
      let salarybetween600and900Counter = 0;
      let salaryabove900Counter = 0;

      let salarybetween100and300 = 0;
      let salarybetween300and600 = 0;
      let salarybetween600and900 = 0;
      let salaryabove900 = 0;
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
           
             let totalNumberStudents = res.length;
         
          console.log("rhrhhrh",totalnumberOfFemale.length)
             if (p.gender=="Female" && p.salary < 300000) {
              salarybetween100and300Counter = salarybetween100and300Counter + 1;
              salarybetween100and300 =(
                (salarybetween100and300Counter /  totalnumberOfFemale.length) * 100
              ).toFixed(2);
              //break;
            } else if (p.gender=="Female" && p.salary < 600000) {
              salarybetween300and600Counter = salarybetween300and600Counter + 1;
              salarybetween300and600 =(
                (salarybetween300and600Counter / totalnumberOfFemale.length) * 100
              ).toFixed(2);
              //break;
            } else if (p.gender=="Female" && p.salary < 900000) {
              salarybetween600and900Counter =salarybetween600and900Counter + 1;
              salarybetween600and900 =(
                (salarybetween600and900Counter /totalnumberOfFemale.length) * 100
              ).toFixed(2);
              // break;
            } else if (p.gender=="Female" && p.salary > 900000) {
              salaryabove900Counter = salaryabove900Counter + 1;
              salaryabove900 =(
                (salaryabove900Counter / totalnumberOfFemale.length) * 100
              ).toFixed(2);
              // break;
            }
            else{
              return null;
            }
          })
          let data = [
            { name: "Salary between 100S-300S Rwf", value:salarybetween100and300 },
            {
              name: "Salary between 300S-600S Rwf",
              value: salarybetween300and600,
            },
            {
              name: "Salary between 600S-900S Rwf",
              value: salarybetween600and900,
            },
            {
              name: "Salary abovr 900 000 Rwf",
              value:salaryabove900 ,
            },
          ];
          data.map((d) => {
            nameSet.push(d.name);

            valueSet.push(d.value);
            console.log("value bbb", d.value);
          });

          setDatas(data);
        })

        .catch(function(error) {
          console.log("error", error);
        });
    };
    fetchData();
  }, []);
  
  return (
    
    <div className="chart">
    <div className="title">Woman (chart)</div>
    <ResponsiveContainer width="100%" aspect={2 / 1}>
    <AreaChart width={730} height={250} data={datas}
  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
  <defs>
    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
    </linearGradient>
    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
    </linearGradient>
  </defs>
  <XAxis dataKey="name" />
  <CartesianGrid strokeDasharray="3 3" />
  <Tooltip />
  <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
  <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
</AreaChart>
  </ResponsiveContainer>
    </div>
  )
}

export default Chart