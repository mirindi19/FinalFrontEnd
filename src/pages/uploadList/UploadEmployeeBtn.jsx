import React,{useState,useEffect}from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { upCollectionAction} from "../../redux/actions/upCollectionAction";
import { useDispatch,useSelector } from "react-redux";


import * as XLSX from 'xlsx';
const UploadEmployeeBtn = () => {
  const dispatch=useDispatch();
    const [open, setOpen] = React.useState(false);
   

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const [selectedFile, setSelectedFile] = useState();
      const changeHandler = (event) => {
        setSelectedFile(event.target.files);
      };
      
      const handleUpload=async()=>{
        let files = selectedFile, f = files[0];
        let reader = new FileReader();
        reader.onload = function (e) {
            var data = e.target.result;
            let readedData = XLSX.read(data, {type: 'binary'});
            const wsname = readedData.SheetNames[0];
            const ws = readedData.Sheets[wsname];
            const dataParse = XLSX.utils.sheet_to_json(ws);
            dataParse?.map(async(p)=>{
              console.log("empName:",p.empName);
            console.log("position:",p.position);
            console.log("age",p.age)
            console.log("salary",p.salary)
            console.log("gender",p.gender)
           
           // await addAllApi({firstname:p.Firstname,lastname:p.Lastname});
           await dispatch(upCollectionAction({empName:p.empName,position:p.position,age:p.age,salary:p.salary,gender:p.gender}))
            })
          
        };
        reader.readAsBinaryString(f)
      }

  return (
    <div className='UploadEmployee'>
    <Button variant="outlined" onClick={handleClickOpen}>
    Upload List
</Button>
     <Dialog open={open} onClose={handleClose}>
       <DialogTitle>Subscribe</DialogTitle>
       <DialogContent>
         <DialogContentText>
       To subscribe to this website, please enter your email address here. We
           will send updates occasionally.
         </DialogContentText>
         <TextField
           autoFocus
           margin="dense"
           id="name"
           label="upload file"
           type="file"
           fullWidth
          variant="standard"
          name="file"
          onChange={changeHandler}
        />
       </DialogContent>
       <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
       <Button onClick={(e)=>handleUpload(e)}>Upload</Button>
     </DialogActions>
     </Dialog>
    </div>
  )
}

export default UploadEmployeeBtn