import "./uploadEmpload.scss";
import * as React from 'react';
import Topbar from "../../components/topbar/Topbar";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { collectionAction } from "../../redux/actions/collectionAction";
import { useDispatch,useSelector } from "react-redux";
import {useState,useEffect} from "react"
import { MenuItem } from "@mui/material";
import UploadEmployeeBtn from "./UploadEmployeeBtn";

import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import EmpUploadFeatured from "../uploadTable and featured/EmpUploadFeatured"
import EmpUploadTable from"../uploadTable and featured/EmpUploadTable"
const genders=[
    {
        value:"Male",
        label:"Male"
    },
    {
        value:"Female",
        label:"Female"
    }
]

const positions=[
    {
        value:"Manager",
        label:"Manager"
    },
    {
        value:"Accountant",
        label:"Accountant"
    },
    {
        value:"Software Developer",
        label:"Software Developer"
    },
    {
        value:"Teacher",
        label:"Teacher"
    }
]
const UploadEmployee = () => {
    const dispatch=useDispatch();
    const addEmployee=useSelector((state)=>state.collection)
    const [open, setOpen] = React.useState(false);
    const [empName,setEmpName]=useState('');
    const [position,setPosition]=useState('')
    const  [age,setAge]=useState('');
    const [salary,setSalary]=useState('')


    //error message
    const [nameErr,setNameErr]=useState('')
    const [positionErr,setPositionErr]=useState('')
    const [ageErr,setAgeErr]=useState('')
    const [salaryErr,setSalaryErr]=useState('')
    const [genderErr,setGenderErr]=useState('')
    const [employeeData,setEmployeeData]=useState('')
    const [gender,setGender]=useState('');
    console.log("success",employeeData)
useEffect(()=>{
async function fetchData(){
if(!addEmployee.loading){
    if(addEmployee.data){
 setEmployeeData(addEmployee.data)
    }
}
}
fetchData();
},[addEmployee.data])
    const handleSubmit=async()=>{
        if(empName==""){
      setNameErr("Employe name is required")
        }
        else if(position==''){
            setPositionErr("position is required")
        }
        else if(age==""){
            setAgeErr("age is required")
        }
        else if(salary==""){
            setSalaryErr("salary is required")
        }  else if(!genderErr==""){
            setGenderErr("Please select gender")
        }
        else{
            setNameErr('')
            setPositionErr('')
            setAgeErr('')
            setSalaryErr('')
            setGenderErr('')
            await dispatch(collectionAction({empName,position,age,salary,gender}))
            setEmpName("")
            setPosition("")
            setAge("")
            setSalary("")
            setGender("")
        }
        if(addEmployee.error){
            setOpen(true)
        }

    }
    const handleClickOpen = () => {
      setOpen(true);
    };
   
  
    const handleClose = () => {
      setOpen(false);
    };
  return (
    <div className='uploadEmployee'>
    <Topbar/>
    <Box
    sx={{
      display: 'flex',
      flexWrap: 'wrap',
      '& > :not(style)': {
        m: 1,
        width: 1828,
        height: 900,
        
      },
    }}
  >
    <Paper elevation={3} >
    <div className="B">
    <Button variant="outlined" onClick={handleClickOpen}>
        Enter one by One
    </Button>
    &nbsp;&nbsp;&nbsp;
    <UploadEmployeeBtn/>
    </div>
    <div className="form-dialog">
    <Dialog open={open} onClose={handleClose}>
       <DialogTitle>Subscribe</DialogTitle>
    <DialogContent>
      <DialogContentText>
       To subscribe to this website, please enter your email address here. We
        will send updates occasionally.
    </DialogContentText>
  
   
    {
        !addEmployee.error? null:
         <Collapse in={open}>
         <Alert
         severity="error"
           action={
             <IconButton
               aria-label="close"
               color="inherit"
               size="small"
               onClick={handleClose}
              //  onClick={() => {
              //    setOpen(false);
              //  }}
             >
               <CloseIcon fontSize="inherit" />
             </IconButton>
           }
           sx={{ mb: 0.2 }}
         >
          {addEmployee.error}
         </Alert>
       </Collapse>
      }
      {
        !employeeData? null:
         <Collapse in={open}>
         <Alert
         severity="success"
           action={
             <IconButton
               aria-label="close"
               color="inherit"
               size="small"
               onClick={handleClose}
              //  onClick={() => {
              //    setOpen(false);
              //  }}
             >
               <CloseIcon fontSize="inherit" />
             </IconButton>
           }
           sx={{ mb: 0.2 }}
         >
          {employeeData}
         </Alert>
       </Collapse>
      }
    <TextField
    autoFocus
    margin="dense"
    id="name"
    value={empName}
    label="Employee Name"
    onChange={(e)=>setEmpName(e.target.value)}
    error={nameErr}
    helperText={nameErr? nameErr:""}
    type="text"
    fullWidth
    variant="standard"
  />

  <TextField
  autoFocus
  margin="dense"
  id="name"
  label="Position"
  value={position}
  onChange={(e)=>setPosition(e.target.value)}
  error={positionErr}
  helperText={positionErr? positionErr:""}
  select
  type="text"
  fullWidth
  variant="standard"
>
{
    positions.map((p)=>(
        <MenuItem key={p.value} value={p.value}>
        {p.label}
        </MenuItem>
    ))
}
</TextField>

<TextField
  autoFocus
  margin="dense"
  id="name"
  label="Gender"
  value={gender}
  onChange={(e)=>setGender(e.target.value)}
  error={genderErr}
  helperText={genderErr? genderErr:""}
  select
  type="text"
  fullWidth
  variant="standard"
>
{
    genders.map((p)=>(
        <MenuItem key={p.value} value={p.value}>
        {p.label}
        </MenuItem>
    ))
}

</TextField>

<TextField
autoFocus
margin="dense"
id="name"
label="age"
type="text"
value={age}
onChange={(e)=>setAge(e.target.value)}
error={ageErr}
 helperText={ageErr? ageErr:""}
fullWidth
variant="standard"
/>

<TextField
autoFocus
margin="dense"
id="name"
label="Salary"
type="text"
value={salary}
onChange={(e)=>setSalary(e.target.value)}
error={salaryErr}
 helperText={salaryErr? salaryErr:""}
fullWidth
variant="standard"
/>



   

</DialogContent>
<DialogActions>
     <Button onClick={handleClose}>Cancel</Button>
     <Stack direction="row" spacing={2}>
       <Button variant="contained" onClick={handleSubmit} endIcon={<SendIcon />}>
         Send
       </Button>
    </Stack>
   </DialogActions>
</Dialog>

 </div>



    
  

    <div className="uploadtable">
  <EmpUploadFeatured/>
  <EmpUploadTable/>
  </div>
    </Paper>
  </Box>
  
    </div>
  )
}

export default UploadEmployee