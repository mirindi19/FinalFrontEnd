import './upload.css';
import Topbar from "../../components/topbar/Topbar";
import * as React from 'react';
import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SendIcon from '@mui/icons-material/Send';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';




const Upload = () => {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
  
 <div className='hero'>
 <Topbar/>
 <div className='hero-imageupload'>

   <div className='hero-text'>
     <h2>Upload Employee list</h2>
     
      <p>By uploading the list work of the company your helping us to <br></br> to empower women who work in your company and those woman who still need to be <br></br>empower.</p>
      <Stack spacing={2} direction="row" className='button-upload'>
      <Link to="/uploadAcademic" style={{ textDecoration:"none"}}>
      <Button variant="contained" style={{background:'#F9842C'}}>Academic</Button>
      </Link>
      <Link to="/uploadEmployee" style={{ textDecoration:"none"}}>
      <Button variant="contained" style={{background:'#F9842C'}}>Capacity</Button>
      </Link>
    </Stack>
   </div>
 </div>

 </div>

  )
}

export default Upload