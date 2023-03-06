import './totalPercWomen.scss'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Stack from "@mui/material/Stack";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/SearchOffOutlined';
import TextField from "@mui/material/TextField";
import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
 import {displayTotalPercOfWomenInOrgAction} from"../../redux/actions/displayTotalPercOfWomenInOrgAction"
 import jsPDF from "jspdf";
 import "jspdf-autotable";
 import logo from "../../Assets/images/logo.png";

 const TotalPercWomen = () => {

  // function createData(
  //   name: string,
  //   calories: number,
  //   fat: number,
  //   carbs: number,
  //   protein: number,
  // ) {
  //   return { name, calories, fat, carbs, protein };
  // }
  
  // const rows = [
  //   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  //   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  //   createData('Eclair', 262, 16.0, 24, 6.0),
  //   createData('Cupcake', 305, 3.7, 67, 4.3),
  //   createData('Gingerbread', 356, 16.0, 49, 3.9),
  // ];
  const dispatch = useDispatch();
  const totalPerc = useSelector(state=>state.totalpercf);
  const [totalpercf, setTotalPerc] = useState("");
  const todaydate=new Date().toISOString().slice(0,10);

/////////////Serach////////////
// const trimString = (s) => {
//   var l = 0,
//     r = s.length - 1;
//   while (l < s.length && s[l] == " ") l++;
//   while (r > l && s[r] == " ") r -= 1;
//   return s.substring(l, r + 1);
// };
// const compareObjects = (o1, o2) => {
//   var k = "";
//   for (k in o1) if (o1[k] != o2[k]) return false;
//   for (k in o2) if (o1[k] != o2[k]) return false;
//   return true;
// };
// const itemExists = (haystack, needle) => {
//   for (var i = 0; i < haystack.length; i++)
//     if (compareObjects(haystack[i], needle)) return true;
//     return false;
//   };
//   const searchHandle = async (e) => {
//     setSearch(true);
//     const searchKey = e.target.value;
//     // console.log(e.target.value)
//     try {
//       var results = [];
//       const toSearch = trimString(searchKey); // trim it
//       for (var i = 0; i < usersData.data.length; i++) {
//         for (var key in usersData.data[i]) {
//           if (usersData.data[i][key] != null) {
//             if (
//               usersData.data[i][key].toString().toLowerCase().indexOf(toSearch) !=
//               -1
//             ) {
//               if (!itemExists(results, usersData.data[i]))
//                 results.push(usersData.data[i]);
//             }
//           }
//         }
//       }
//       setResult(results)
//     } catch (error) {
//       console.log(error);
//     }
//   };

useEffect(()=>{
  async function fetchData(){
    await dispatch(displayTotalPercOfWomenInOrgAction());

  }
  fetchData();
},[])
useEffect(() => {
  async function fetchData() {
    if (!totalPerc.loading) {
      if (totalPerc.data) {
        setTotalPerc(totalPerc.data);
        
      }
    }
  }
  fetchData();
}, [!totalPerc.data]);
console.log('TotalPerc ....:',totalPerc)


const generateListOfAllOrganization = () => {
  const doc = new jsPDF();
  doc.addImage(logo, "png", 20, 5, 40, 40);
  doc.setFont("Helvertica", "normal");
  doc.text("The Ministry of Gender and Family Promotion (MIGEPROF) ", 20, 50);
  // doc.text(`organisation Name: ${name}`, 20, 55);
  doc.text("Email: info@migeprof.gov.rw", 20, 60);
  doc.setFont("Helvertica", "normal");
  doc.text(`Date ${todaydate}`, 140, 65);
  doc.setFont("Helvertica", "bold");
  doc.text("organization Report", 70, 75);
  const tableColumn = [
    "organisation name",
    "Female",
    "Male"
 
  ];
  const tableRows = [];

  totalPerc.data?.map((row) => {
   

    const OrganizationData = [
      row.organizationName,
      row.female,
      row.male,
      

      // format(new Date(student.updated_at), "yyyy-MM-dd")
    ];
    
      tableRows.push(OrganizationData);

  });

  doc.autoTable(tableColumn, tableRows, {
    startY: 80,
    theme: "striped",
    margin: 10,
    styles: {
      font: "courier",
      fontSize: 12,
      overflow: "linebreak",
      cellPadding: 3,
      halign: "center",
    },
    head: [tableColumn],
    body: [tableRows],
  });
  const date = Date().split(" ");
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

  doc.save(`report_${dateStr}.pdf`);

};



  return (
    <div className='totalPer'>

      <div className='btnn'>

      <Box sx={{ maxWidth: 300, maxHeight:100 }} className='boxSearchUser'>
        <TextField
          fullWidth
          // onChange={(e) => searchHandle(e)}
          InputProps={{
            startAdornment: (
              <InputAdornment   position="start">
         
                  <SearchIcon/>
             
              </InputAdornment>
            ),
          }}
          placeholder="Search Student"
          variant="outlined"
        />
      </Box>

    
      <Box component="div" sx={{ display: "inline" }}>
              <Box className="pdfbnt">
                <div className="datecontent">
                  <Stack component="form" noValidate spacing={3}>
                  <ButtonGroup variant="text" aria-label="text button group">
                <Button onClick={generateListOfAllOrganization}>Generate PDF</Button>
              </ButtonGroup>
                  </Stack>
                </div>
              </Box>
            </Box>
      </div>


       <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Organization Name</TableCell>
            <TableCell align="right">Number of Female</TableCell>
            <TableCell align="right">Number of Male</TableCell>
            <TableCell align="right">Percentage of Female</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {totalPerc.data?.map((row) => (
            <TableRow
              key={row.organizationName
              }
              // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
           
              <TableCell >{row.organizationName}</TableCell>
              <TableCell align="right">{row.female}</TableCell>
              <TableCell align="right">{row.male}</TableCell>
              <TableCell align="right">{row.femalePercenatege?row.femalePercenatege:0}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </div>
  )
}

export default TotalPercWomen