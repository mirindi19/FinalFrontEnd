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
import axios from "axios";
import './usersList.scss';

import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "../../Assets/images/logo.png";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/SearchOffOutlined';
import AuthContext from "../context";

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

const UsersList = () => {

    const dispatch = useDispatch();
    const usersData = useSelector(state=>state.users);
    const [users , setUsers] = useState("");
    const [fullname, setFullname]= useState("");
    const [id, setId]= useState("");
    const [email, setEmail]=useState("")
    const [username, setUsername]=useState("")
    const [openUpdate, setOpenUpdate]=useState(false)
    const [message, setMessage]=useState("")
    const todaydate=new Date().toISOString().slice(0,10);
    const [search,setSearch]=useState(false);
  const [results,setResult]=useState({});
  const [limit, setLimit] = useState(10);
 const {auth,setAuth}=useContext(AuthContext)

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
console.log('hello...HH',auth)
    //handleUpdate

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
        const response =await axios.put(`http://localhost:2345/auth/updateUser/${id}`,
        {
          Fullname:fullname,
          email:email,
          username:username

        },
        {
            headers: headers,
          })
        .then( async(response) => {

          setUsername("")
          setFullname("")
          setEmail("")
          setMessage(response.data.message)
          await dispatch(usersAction());
        }
          
            )
        .catch(error => {
            console.error('There was an error!', error);
        });
    } catch (error) {
        
    }

    }






    //handleDelete

    const [openDelete, setOpenDelete] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDelete(true);
  };

  const handleClose = () => {
    setMessage('')
    setOpenDelete(false);
    setOpenUpdate(false);
  };

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
        const response =await axios.delete(`http://localhost:2345/auth/deleteUser/${id}`,
        {
            headers: headers,
          })
        .then( async(response)=> {
          setOpenDelete(false)
           await dispatch(usersAction())
        } )
        .catch(error => {
            console.error('There was an error!', error);
        });
    } catch (error) {
        
    }

  };

    useEffect(()=>{
        async function fetchData(){
          await dispatch(usersAction());
      
        }
        fetchData();
      },[])
      useEffect(() => {
        async function fetchData() {
          if (!usersData.loading) {
            if (usersData.data) {
              setUsers(usersData.data);
              
            }
          }
        }
        fetchData();
      }, [!usersData.data]);


  const [authorization, setAuthorization] = useState("Select ...");
  // const [date,setDate]=useState( new Date().toISOString().slice(0, 10))
  const date = new Date().toISOString().slice(0, 10);

  const handleChange = (event) => {
    setAuthorization(event.target.value);
  };
  // useEffect(()=>{
  //  function fetchDate(){
  //    getCurrentDate()
  //  }
  //  fetchDate()
  // },[])

// Generete pdf
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
    "FullName",
    "Email",
    "Username",
    "CreatedAt",
  ];
  const tableRows = [];

  usersData.data?.map((row) => {
   

    const OrganizationData = [
      row.Fullname,
      row.email,
      row.username,
      row.createdAt,
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

///////// Search //////////////
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
      for (var i = 0; i < usersData.data.length; i++) {
        for (var key in usersData.data[i]) {
          if (usersData.data[i][key] != null) {
            if (
              usersData.data[i][key].toString().toLowerCase().indexOf(toSearch) !=
              -1
            ) {
              if (!itemExists(results, usersData.data[i]))
                results.push(usersData.data[i]);
            }
          }
        }
      }
      setResult(results)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>

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
            <label>Fullname</label>
            <input type="text" placeholder="enter Fullname" name="Fullname"
            value={fullname}
            onChange={(e)=>setFullname(e.target.value)}
            />
        </div>
        <div className="formInput">
        <label>E-mail</label>
        <input type="email" placeholder="enter E-mail" name="email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}/>
    </div>
    <div className="formInput">
    <label>Username</label>
    <input type="text" placeholder="enter username name" name="username"
    value={username}
    onChange={(e)=>setUsername(e.target.value)}/>
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
          {fullname}?
          </DialogContentText>
          </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
      
      <div className="listtransfer">
        <div className="dateDisplay">
        

        <Box sx={{ maxWidth: 300 }} className='boxSearchUser'>
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

      {
         
         auth && auth.role==='Admin'? null:
          <div className="rightdateconten">
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
}
        </div>
        <div className="tableDisplay">
         
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
              <caption>List of transfer to be authorised</caption>
              <TableHead>
                <TableRow>
                  <TableCell>Fullname</TableCell>
                  <TableCell align="center">email</TableCell>
                  <TableCell align="center">username</TableCell>
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
                      {row.Fullname}
                    </TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.username}</TableCell>
                    <TableCell align="center">{row.createdAt}</TableCell>
                    <TableCell align="center">{row.updatedAt}</TableCell>
                    <TableCell align="center">
                      {" "}
                      {
         
         auth && auth.role==='Admin'? null:
                      <ButtonGroup variant="text" aria-label="text button group">
                      <Button onClick={()=>{
                        setFullname(row.Fullname)
                        setId(row.id)
                        setOpenDelete(true)
                        
                      }}><DeleteIcon/></Button>
                      <Button onClick={()=>{
                        setFullname(row.Fullname)
                        setEmail(row.email)
                        setUsername(row.username)
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
               (
                <TableBody>
                {usersData.data?.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.Fullname}
                    </TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.username}</TableCell>
                    <TableCell align="center">{row.createdAt}</TableCell>
                    <TableCell align="center">{row.updatedAt}</TableCell>
                    <TableCell align="center">
                      {" "}
                      {
         
         auth && auth.role==='Admin'? null:
                      <ButtonGroup variant="text" aria-label="text button group">
                      <Button onClick={()=>{
                        setFullname(row.Fullname)
                        setId(row.id)
                        setOpenDelete(true)
                        
                      }}><DeleteIcon/></Button>
                      <Button onClick={()=>{
                        setFullname(row.Fullname)
                        setEmail(row.email)
                        setUsername(row.username)
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
               )}
            </Table>
          </TableContainer>
        </div>
      </div>
   
    </>
  );
};

export default UsersList;