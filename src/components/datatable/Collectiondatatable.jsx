import "./collectiondatatable.scss"
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import * as React from 'react';
// import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import DeleteIcon from '@mui/icons-material/Delete';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "../../Assets/images/logo.png";


import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import { displaycollectionAction} from "../../redux/actions/displaycollectionAction";

function createData(date, service, amount, banktransaction, authorisation) {
  return { date, service, amount, banktransaction, authorisation };
}


const rows = [
  createData("2020-04-04", "CBHI collection", 500, 134, "Cancel"),
  createData("2021-05-03", "Tax Collecton", 1000, "xxxx", "Accept"),
  createData("2022-03-03", "CBH Collection", 16.0, "XXXX", "Accept"),
  createData("2022-03-06", "CBH Collection", 16.0, "XXXX", "Accept"),
  createData("2022-03-07", "CBH Collection", 16.0, "XXXX", "Accept"),
  createData("2022-06-08", "CBH Collection", "xxxx", "XXXX", "Accept"),
  createData("2022-06-07", "CBH Collection", 16.0, "XXXX", "Cancel"),
  createData("2022-06-08", "CBH Collection", "xxxx", "XXXX", "Accept"),
  createData("2020-04-04", "CBHI collection", 500, 134, "Cancel"),
  createData("2021-05-03", "Tax Collecton", 1000, "xxxx", "Accept"),
  createData("2022-03-03", "CBH Collection", 16.0, "XXXX", "Accept"),
  createData("2022-03-06", "CBH Collection", 16.0, "XXXX", "Accept"),
];

 
const Collectiondatatable = () => {
    const dispatch = useDispatch();
    const dcollectionData = useSelector(state=>state.dcollection);
    const [dcollection , setOrg] = useState("");
    const todaydate=new Date().toISOString().slice(0,10);
    console.log("all data ", dcollection);
    useEffect(()=>{
      async function fetchData(){
        await dispatch(displaycollectionAction());
    
      }
      fetchData();
    },[])
    useEffect(() => {
      async function fetchData() {
        if (!dcollectionData.loading) {
          if (dcollectionData.data) {
            setOrg(dcollectionData.data);
            
          }
        }
      }
      fetchData();
    }, [!dcollectionData.data]);
  
  
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
        "Fullname",
        "Age",
        "Gender",
        "Position",
        "Salary",
      ];
      const tableRows = [];
    
      dcollectionData.data?.map((row) => {
       
    
        const OrganizationData = [
          row.Fullname,
          row.age,
          row.gender,
          row.position,
          row.salary,
          // format(new Date(student.updated_at), "yyyy-MM-dd")
        ];
          if(row.gender ==="Female")
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
    <div className='container'>
    <Sidebar/>
    <div className='datatableorg'>
    <Navbar/>
    <div className='datatable'>
    

    <div className="listtransfer">
    <div className="dateDisplay">
    
      <div className="rightdatecontent">
      <Box component="div" sx={{ display: "inline" }}>
          <Box>
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
    </div>
    <div className="tableDisplay">
   
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <caption>List of transfer to be authorised</caption>
          <TableHead>
            <TableRow>
              <TableCell>Fullname</TableCell>
              <TableCell align="center">position</TableCell>
              <TableCell align="center">age</TableCell>
              <TableCell align="center">salary</TableCell>
              <TableCell align="center">gender</TableCell>
              <TableCell align="center">createdAt</TableCell>
              <TableCell align="center">updatedAt</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dcollectionData.data?.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.Fullname}
                </TableCell>
                <TableCell align="center">{row.position}</TableCell>
                <TableCell align="center">{row.age}</TableCell>
                <TableCell align="center">{row.salary}</TableCell>
                <TableCell align="center">{row.gender}</TableCell>
                <TableCell align="center">{row.createdAt}</TableCell>
                <TableCell align="center">{row.updatedAt}</TableCell>
                <TableCell align="center">
                  {" "}
                
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  </div>




    </div>
    </div>
    </div>
  )
}

export default Collectiondatatable