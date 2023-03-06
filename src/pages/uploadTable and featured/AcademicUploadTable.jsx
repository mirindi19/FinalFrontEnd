import './empUploadTable.scss'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import { displayEducationCollectionAction} from "../../redux/actions/displayEducationCollectionAction";
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
import React from "react";
import axios from "axios"
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText'
import SearchIcon from '@mui/icons-material/SearchOffOutlined';
import InputAdornment from '@mui/material/InputAdornment';
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

const AcademicUploadTable = () => {

  const dispatch = useDispatch();
  const [orgData,setOrgData]=useState([])
  const [org , setOrg] = useState("");
  const [studentName,setStudentName]=useState("")
  const [id, setId]= useState("");
  const [age, setAge]= useState("");
  const [gender, setGender]= useState("");
  const [subject, setSubject]= useState("");
  const [level, setLevel]= useState("");
  const [openUpdate, setOpenUpdate]=useState(false)
  const [message, setMessage]=useState("")
  const [search,setSearch]=useState(false);
  const [results,setResult]=useState({});
  const [limit, setLimit] = useState(10);

  const handleClose = () => {
    setOpenDelete(false);
    setOpenUpdate(false);
  };



   const getOrginizatonCollectionByUderId=async()=>{
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
      const res = await axios.get(`http://localhost:2345/organisation/educationCollectionbyOrgId`,
       {
        headers: headers,
      });
      const collection = await res.data;
      setOrgData(collection.data.educationCollections) 
} catch (error) {
  console.log("error response",error)
}
 }

  useEffect(()=>{
getOrginizatonCollectionByUderId();
  },[])

  const [openDelete, setOpenDelete] = React.useState(false);
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
        const response =await axios.delete(`http://localhost:2345/educationCollection/deleteEducation/${id}`,
        {
            headers: headers,
          })
        .then(response => 
            setOpenDelete(false)
            )
        .catch(error => {
            console.error('There was an error!', error);
        });
    } catch (error) {
        
    }

  };

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
      const response =await axios.put(`http://localhost:2345/educationCollection/updateEdColletion/${id}`,
      {
        studentName:studentName,
        age:age,
        gender:gender,
        subject:subject,
        level:level


      },
      {
          headers: headers,
        })
      .then( async(response) => {
console.log(response.data)
        setStudentName("")
        setAge("")
        setGender("")
        setSubject("")
        setLevel("")
        setMessage(response.data.message)
        await dispatch(displayEducationCollectionAction());
      }
        
          )
      .catch(error => {
          console.error('There was an error!', error);
      });
  } catch (error) {
      
  }

  }

/////// Search ////////
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
        for (var i = 0; i < orgData.length; i++) {
          for (var key in orgData[i]) {
            if (orgData[i][key] != null) {
              if (
                orgData[i][key].toString().toLowerCase().indexOf(toSearch) !=
                -1
              ) {
                if (!itemExists(results, orgData[i]))
                  results.push(orgData[i]);
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
    <div className='container'>
    <div className='datatableorg'>
    <div className='datatable'>


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
            <label>Student name</label>
            <input type="text" placeholder="enter Student name" name="studentName"
            value={studentName}
            onChange={(e)=>setStudentName(e.target.value)}
            />
        </div>
        <div className="formInput">
        <label>Age</label>
        <input type="email" placeholder="enter age" name="age"
        value={age}
        onChange={(e)=>setAge(e.target.value)}/>
    </div>
    <div className="formInput">
    <label>Gender</label>
    <input type="text" placeholder="enter Gender" name="gender"
    value={gender}
    onChange={(e)=>setGender(e.target.value)}/>
</div>
<div className="formInput">
    <label>Sudject</label>
    <input type="text" placeholder="enter subject" name="subject"
    value={subject}
    onChange={(e)=>setSubject(e.target.value)}/>
</div>
<div className="formInput">
    <label>level</label>
    <input type="text" placeholder="enter Level" name="level"
    value={level}
    onChange={(e)=>setLevel(e.target.value)}/>
</div>
     </form>
      </React.Fragment>
      
    }
      


     
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      {
        message?null: <Button onClick={handleUpdate}>update</Button>
      }
     
    </DialogActions>
  </Dialog>


    <Dialog open={openDelete} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Are you sure you want want to delete the user bellow &nbsp;
          {studentName}?
          </DialogContentText>
          </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>


    <div className="listtransfer">
    <div className="tableDisplay">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <caption>List of transfer to be authorised</caption>
          <TableHead>
            <TableRow>
              <TableCell>studentName</TableCell>
              <TableCell align="center">Age</TableCell>
              <TableCell align="center">gender</TableCell>
              <TableCell align="center">subject</TableCell>
              <TableCell align="center">level</TableCell>
              <TableCell align="center">CreatedAt</TableCell>
              <TableCell align="center">updatedAt</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>

          {
                search?(

          <TableBody>
            {results.slice(0, limit).map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.studentName}
                </TableCell>
                <TableCell align="center">{row.age}</TableCell>
                <TableCell align="center">{row.gender}</TableCell>
                <TableCell align="center">{row.subject}</TableCell>
                <TableCell align="center">{row.level}</TableCell>
                <TableCell align="center">{row.createdAt}</TableCell>
                <TableCell align="center">{row.updatedAt}</TableCell>
                <TableCell align="center">
                  {" "}
                  <ButtonGroup variant="text" aria-label="text button group">
                  <Button onClick={()=>{
                    setStudentName(row.studentName)
                    setId(row.id)
                    setOpenDelete(true)
                    
                  }} 
                  ><DeleteIcon/></Button>
                  <Button onClick={()=>{
                    setStudentName(row.studentName)
                    setAge(row.age)
                    setGender(row.gender)
                    setSubject(row.subject)
                    setLevel(row.level)
                    setId(row.id)
                    setOpenUpdate(true)
                  }

                  }
                  ><SystemUpdateAltIcon /></Button>
                </ButtonGroup>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
             ):
             
             (<TableBody>
              {orgData?.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.studentName}
                  </TableCell>
                  <TableCell align="center">{row.age}</TableCell>
                  <TableCell align="center">{row.gender}</TableCell>
                  <TableCell align="center">{row.subject}</TableCell>
                  <TableCell align="center">{row.level}</TableCell>
                  <TableCell align="center">{row.createdAt}</TableCell>
                  <TableCell align="center">{row.updatedAt}</TableCell>
                  <TableCell align="center">
                    {" "}
                    <ButtonGroup variant="text" aria-label="text button group">
                    <Button onClick={()=>{
                      setStudentName(row.studentName)
                      setId(row.id)
                      setOpenDelete(true)
                      
                    }} 
                    ><DeleteIcon/></Button>
                    <Button onClick={()=>{
                      setStudentName(row.studentName)
                      setAge(row.age)
                      setGender(row.gender)
                      setSubject(row.subject)
                      setLevel(row.level)
                      setId(row.id)
                      setOpenUpdate(true)
                    }
  
                    }
                    ><SystemUpdateAltIcon /></Button>
                  </ButtonGroup>
  
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

             )
             }
       
        </Table>
      </TableContainer>
    </div>
  </div>
    </div>
       </div>
           </div>
  )
}

export default AcademicUploadTable