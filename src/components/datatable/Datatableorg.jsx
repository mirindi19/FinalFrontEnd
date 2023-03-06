import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import './datatableorg.scss'

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import OrganisationForm from '../forms/OrganisationForm';

import { displayOrgAction } from "../../redux/actions/displayOrgAction";
import React, { useContext } from "react";
// import SideBar from "../../components/siderBar/SideBar";
// import "./listtransfer.css";
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
import { color } from "@mui/system";
import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import { usersAction } from "../../redux/actions/usersAction";

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/SearchOffOutlined';
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "../../Assets/images/logo.png";
import AuthContext from '../context';

import PrivatePublicPieChart from"../chart/PrivatePublicPieChart"
import ProvencePieChart from"../chart/ProvencePieChart"
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

const authorizations = [
  {
    value: "Accept",
    label: "Accept",
  },
  {
    value: "Cancel",
    label: "Cancel",
  },
];

const Datatableorg = () => {
const {auth,setAuth}=useContext(AuthContext)
  const dispatch = useDispatch();
  const orgData = useSelector(state=>state.org);
  const [org , setOrg] = useState("");
  const [id, setId]= useState("");
  const [name, setName]= useState("");
  const [message, setMessage]=useState("");
  const [provinceName,setProvinceName]=useState("");
  const [districtName,setDistrictName]=useState("");
  const [status,setStatus]=useState("");
  const [search,setSearch]=useState(false);
  const [results,setResult]=useState({});
  const [limit, setLimit] = useState(10);
  const todaydate=new Date().toISOString().slice(0,10);
 console.log('out put from auth:',auth)
  const [openUpdate, setOpenUpdate]=useState(false)
  const [openDelete, setOpenDelete] = React.useState(false);
  const handleClickOpen = () => {
    setOpenDelete(true);
  };

  const handleClose = () => {
    setOpenDelete(false);
    setOpenUpdate(false);
  };

//Update

const handleUpdate = async() => {
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
    const response =await axios.put(`http://localhost:2345/organisation/updateOrg/${id}`,
    {
      name:name,
      provinceName:provinceName,
      districtName:districtName,
      status:status

    },
    {
        headers: headers,
      })
    .then( async(response) => {

      setName("")
      setProvinceName("")
      setDistrictName("")
      setStatus("")
      setMessage(response.data.message)
      await dispatch(displayOrgAction());
    }
      
        )
    .catch(error => {
        console.error('There was an error!', error);
    });
} catch (error) {
    
}

}




  /////////////////////
  const handleDelete= async() => {
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
        const response =await axios.delete(`http://localhost:2345/organisation/deleteOrg/${id}`,
        {
            headers: headers,
          })
        .then(async(response) => {
          setOpenDelete(false)
          await dispatch(displayOrgAction());
        }
        
            )
        .catch(error => {
            console.error('There was an error!', error);
        });
    } catch (error) {
        
    }

  };

//Search
const trimString = (s) => {
  var l = 0,
    r = s.length - 1;
  while (l < s.length && s[l] == " ") l++;
  while (r > l && s[r] == " ") r -= 1;
  return s.substring(l, r + 1);
};
const compareObjects = (o1, o2) => {
  var k = "";
  for (k in o1) if (o1[k] != o2[k]) return false;
  for (k in o2) if (o1[k] != o2[k]) return false;
  return true;
};
const itemExists = (haystack, needle) => {
  for (var i = 0; i < haystack.length; i++)
    if (compareObjects(haystack[i], needle)) return true;
    return false;
  };
  const searchHandle = async (e) => {
    setSearch(true);
    const searchKey = e.target.value;
    // console.log(e.target.value)
    try {
      var results = [];
      const toSearch = trimString(searchKey); // trim it
      for (var i = 0; i < orgData.data.length; i++) {
        for (var key in orgData.data[i]) {
          if (orgData.data[i][key] != null) {
            if (
              orgData.data[i][key].toString().toLowerCase().indexOf(toSearch) !=
              -1
            ) {
              if (!itemExists(results, orgData.data[i]))
                results.push(orgData.data[i]);
            }
          }
        }
      }
      setResult(results)
    } catch (error) {
      console.log(error);
    }
  };

//print report

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
    "Name",
    "provice name",
    "District name",
    "status",
  ];
  const tableRows = [];

  orgData.data?.map((row) => {
   

    const OrganizationData = [
      row.name,
      row.provinceName,
      row.districtName,
      row.status,
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

const login = useSelector(state => state.login)
useEffect(()=>{
async function fecthData(){
if(!login.loading){{
if(login.data.length!==0){
setAuth({role:login.data.data.role})
}
}}
}
fecthData()
},[login.data])






  useEffect(()=>{
    async function fetchData(){
      await dispatch(displayOrgAction());
  
    }
    fetchData();
  },[])
  useEffect(() => {
    async function fetchData() {
      if (!orgData.loading) {
        if (orgData.data) {
          setOrg(orgData.data);
          
        }
      }
    }
    fetchData();
  }, [!orgData.data]);


  return (
    <div className='container'>
    <Sidebar/>
    <div className='datatableorg'>
    <Navbar/>
    <OrganisationForm displayOrgAction={displayOrgAction}/>

 

    <div className='datatable'>
    <Dialog open={openUpdate} onClose={handleClose}>
    <DialogTitle>Subscribe</DialogTitle>
    <DialogContent>
    {
      message?message:
      <React.Fragment>
      <DialogContentText>
      To subscribe to this website, please enter your email address here. We
      will send updates occasionally.
    </DialogContentText>


    <form>
        <div className="formInput">
            <label>name</label>
            <input type="text" placeholder="enter name" name="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            />
        </div>
        <div className="formInput">
        <label>Province Name</label>
        <input type="email" placeholder="enter Province name" name="provinceName"
        value={provinceName}
        onChange={(e)=>setProvinceName(e.target.value)}/>
    </div>
    <div className="formInput">
    <label>District Name</label>
    <input type="text" placeholder="enter District name" name="districtName"
    value={districtName}
    onChange={(e)=>setDistrictName(e.target.value)}/>
</div>

<div className="formInput">
<label>Status</label>
<input type="text" placeholder="enter status" name="status"
value={status}
onChange={(e)=>setStatus(e.target.value)}/>
</div>
     </form>
      </React.Fragment>
      
    }
      


     
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Ok</Button>
      {
        message?null: <Button onClick={handleUpdate}>update</Button>
      }
     
    </DialogActions>
  </Dialog>



    <Dialog open={openDelete} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Are you sure you want want to delete the user bellow
          {name}?
          </DialogContentText>
          </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
      
      <div className="listtransfer">
        <div className="dateDisplay">
          <div className="rightdatecontent">
         
          <Box sx={{ maxWidth: 300 }} className='boxSearch'>
          <TextField
            fullWidth
            onChange={(e) => searchHandle(e)}
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
       
          <div className='pdff'>
          {
         
        auth && auth.role==='Admin'? null:
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
               }
            </div>
           
          </div>
      
        </div>
        <div className="tableDisplay">
         
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
              <caption>List of transfer to be authorised</caption>
              <TableHead>
                <TableRow>
                  <TableCell>name</TableCell>
                  <TableCell align="center">provinceName</TableCell>
                  <TableCell align="center">districtName</TableCell>
                  <TableCell align="center">status</TableCell>
                  <TableCell align="center">CreatedAt</TableCell>
                  <TableCell align="center">updatedAt</TableCell>
                  {
         
         auth && auth.role==='Admin'? null:
                  <TableCell align="center">Action</TableCell>
}
                </TableRow>
              </TableHead>
              {
                search?(
                  
                 

                    <TableBody>
                    {results.slice(0, limit).map((row) => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="center">{row.provinceName}</TableCell>
                        <TableCell align="center">{row.districtName}</TableCell>
                        <TableCell align="center">{row.status}</TableCell>
                        <TableCell align="center">{row.createdAt}</TableCell>
                        <TableCell align="center">{row.updatedAt}</TableCell>
                        <TableCell align="center">
                          {" "}
    
                          {
         
         auth && auth.role==='Admin'? null:
                          <ButtonGroup variant="text" aria-label="text button group">
                          <Button onClick={()=>{
                            setName(row.name)
                            setId(row.id)
                            setOpenDelete(true)
                            
                          }}><DeleteIcon/></Button>
                          <Button onClick={()=>{
                            setName(row.name)
                            setProvinceName(row.provinceName)
                            setDistrictName(row.districtName)
                            setStatus(row.status)
                            setId(row.id)
                            setOpenUpdate(true)
                          }
                          }><SystemUpdateAltIcon /></Button>
                        </ButtonGroup>
}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>

                  ):
                  
                 ( <TableBody>
                  {orgData.data?.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.provinceName}</TableCell>
                      <TableCell align="center">{row.districtName}</TableCell>
                      <TableCell align="center">{row.status}</TableCell>
                      <TableCell align="center">{row.createdAt}</TableCell>
                      <TableCell align="center">{row.updatedAt}</TableCell>
                      <TableCell align="center">
                        {" "}
  
                        {
         
         auth && auth.role==='Admin'? null:
                        <ButtonGroup variant="text" aria-label="text button group">
                        <Button onClick={()=>{
                          setName(row.name)
                          setId(row.id)
                          setOpenDelete(true)
                          
                        }}><DeleteIcon/></Button>
                        <Button onClick={()=>{
                          setName(row.name)
                          setProvinceName(row.provinceName)
                          setDistrictName(row.districtName)
                          setStatus(row.status)
                          setId(row.id)
                          setOpenUpdate(true)
                        }
                        }><SystemUpdateAltIcon /></Button>
                      </ButtonGroup>
}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>)

                  }



                  
            
            </Table>
          </TableContainer>
        </div>
      </div>
      {
         
         auth && auth.role==='Admin'? null:
 <div className='pieChart'>
<PrivatePublicPieChart/>
<ProvencePieChart/>
</div>

      }

    </div>
       </div>
           </div>
  )
}

export default Datatableorg