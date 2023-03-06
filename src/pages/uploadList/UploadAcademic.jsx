import "./uploadAcademic.scss"
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
import * as React from 'react';
import { educationCollectionAction } from "../../redux/actions/educationCollectionAction";
import { useDispatch,useSelector } from "react-redux";
import {useState,useEffect} from "react"
import { MenuItem } from "@mui/material";
import UploadAcademicBtn from"./UploadAcademicBtn";
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AcademicUploadFeatured from "../uploadTable and featured/AcademicUploadFeatured";
import AcademicUploadTable from"../uploadTable and featured/AcademicUploadTable";
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
const UploadAcademic = () => {
    const [open, setOpen] = React.useState(false);

    const dispatch=useDispatch();
    const addstudent=useSelector((state)=>state.education)
    const [studentName,setStudentName]=useState('')
    const  [age,setAge]=useState('')
    const [subject,setSubject]=useState('')
    const [level,setLevel]=useState('')
    const [gender,setGender]=useState('')
        //error message
        const [nameErr,setNameErr]=useState('')
        const [ageErr,setAgeErr]=useState('')
        const [genderErr,setGenderErr]=useState('')
        const [levelErr,setLevelErr]=useState('')
        const [studentData,setStudentData]=useState('')
        const [subjectErr,setSubjectErr]=useState('')

        console.log("success",studentData)
        useEffect(()=>{
        async function fetchData(){
        if(!addstudent.loading){
            if(addstudent.data){
         setStudentData(addstudent.data)
            }
        }
        }
        fetchData();
        },[addstudent.data])
            const handleSubmit=async()=>{
                if(studentName==""){
              setNameErr("student name is required")
                }
                else if(subject==''){
                    setSubjectErr("subject is required")
                }
                else if(age==""){
                    setAgeErr("age is required")
                }
                else if(level==""){
                    setLevelErr("level is required")
                }  else if(!genderErr==""){
                    setGenderErr("Please select gender")
                }
                else{
                    setNameErr('')
                    setLevelErr('')
                    setAgeErr('')
                    setSubjectErr('')
                    setGenderErr('')
                    await dispatch(educationCollectionAction({studentName,level,age,subject,gender}))
                    setStudentName("")
                    setAge("")
                    setLevel("")
                    setSubject("")
                    setGender("")
                }
                if(addstudent.error){
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
  
    <div className='uploadAcademic'>
    <Topbar/>
    <Box
    sx={{
      display: 'flex',
      flexWrap: 'wrap',
      '& > :not(style)': {
        m: 1,
        width: 1828,
        height: 668,
      },
    }}
  >
    <Paper elevation={3} >
    <div className="B">
    <Button variant="outlined" onClick={handleClickOpen}>
        Enter one by One
    </Button>
    &nbsp;&nbsp;&nbsp;
    <UploadAcademicBtn/>
    </div>
    <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Academic Detail</DialogTitle>
    <DialogContent>
      <DialogContentText>
     insert one student one by one or go to upload a list
    </DialogContentText>
    {
      !addstudent.error? null:
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
        {addstudent.error}
       </Alert>
     </Collapse>
    }
    {
      !studentData? null:
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
        {studentData}
       </Alert>
     </Collapse>
    }
    <TextField
    autoFocus
    margin="dense"
    id="name"
    value={studentName}
    onChange={(e)=>setStudentName(e.target.value)}
    error={nameErr}
    helperText={nameErr? nameErr:""}
    label="Student Name"
    type="text"
    fullWidth
    variant="standard"
  />
 <br></br>
  <TextField
  autoFocus
  margin="dense"
  id="name"
  label="age"
  value={age}
    onChange={(e)=>setAge(e.target.value)}
    error={ageErr}
    helperText={ageErr? ageErr:""}
  type="text"
  fullWidth
  variant="standard"
/>
<br></br>


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
<br></br>

<TextField
autoFocus
margin="dense"
id="name"
label="Subject"
value={subject}
    onChange={(e)=>setSubject(e.target.value)}
    error={subjectErr}
    helperText={subjectErr? subjectErr:""}
type="text"
fullWidth
variant="standard"
/>
<br></br>
<TextField
autoFocus
margin="dense"
id="name"
label="level"
value={level}
    onChange={(e)=>setLevel(e.target.value)}
    error={levelErr}
    helperText={levelErr? levelErr:""}
type="text"
fullWidth
variant="standard"
/>
<br></br>
</DialogContent>
<DialogActions>
<Stack direction="row" spacing={2}>
<Button onClick={handleClose}>Cancel</Button>
      <Button variant="contained" onClick={handleSubmit} endIcon={<SendIcon />}>
        Send
      </Button>
    </Stack>
    </DialogActions>

   

    
    </Dialog>

    <div className="uploadtable">
      <AcademicUploadFeatured/>
      <AcademicUploadTable/>
    </div>
    </Paper>
  </Box>
    </div>
  )
}

export default UploadAcademic