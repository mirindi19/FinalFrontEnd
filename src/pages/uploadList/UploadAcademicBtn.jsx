import React,{useState} from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as XLSX from 'xlsx';
import { useDispatch,useSelector } from "react-redux";
import { upeducationCollectionAction } from "../../redux/actions/upeducationCollectionAction";

const UploadAcademicBtn = () => {
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
              console.log("studentName:",p.studentName);
            console.log("Age",p.Age)
            console.log("gender",p.gender)
            console.log("subject:",p.subject);
            console.log("level:",p.level);
           // await addAllApi({firstname:p.Firstname,lastname:p.Lastname});
           await dispatch(upeducationCollectionAction({studentName:p.studentName,age:p.age,gender:p.gender,subject:p.subject,level:p.level}))
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

export default UploadAcademicBtn