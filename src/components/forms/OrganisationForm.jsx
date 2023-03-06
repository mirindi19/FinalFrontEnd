import "./organisationForm.scss"
import * as React from 'react';
import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { registerAction } from "../../redux/actions/registerAction";
import { useDispatch,useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AuthContext from "../context";
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { MenuItem, TextField } from "@mui/material";
const statuss=[
  {
      value:"Private",
      label:"Private"
  },
  {
      value:"Public",
      label:"Public"
  }
]
const OrganisationForm = ({displayOrgAction}) => {
  const {auth}=React.useContext(AuthContext)
  const history = useHistory();
  const dispatch=useDispatch();
  const register=useSelector(state=>state.register)

    const [open, setOpen] = React.useState(false);
    
    const [openError, setOpenError] = React.useState(false);
    const [fullname, setFullname] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [name, setName] = React.useState("");
    const [status, setStatus] = React.useState("");
    const [provincename, setProvincename] = React.useState("");
    const [districtname, setDistrictname] = React.useState("");

    const [messageErr,setMessageErr]=React.useState('');

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleCloseDiagloError = () => {
      setOpenError(false)
     
    };
    const handleClose = async() => {
      await dispatch(displayOrgAction());
      setOpenError(false)
      setOpen(false);
    };
    const handleSubmit= async()=>{
      if(fullname===''){
        setMessageErr('Full Name is required')
        setOpenError(true)
      }
      else if(email===''){
        setMessageErr('Email is required')
        setOpenError(true)
      }
      else if(name===''){
        setMessageErr('Company Name is required')
        setOpenError(true) 
      }
      else if(status===''){
        setMessageErr('Status is required')
        setOpenError(true) 
      }
      else if(provincename===''){
        setMessageErr('Province name  is required')
        setOpenError(true) 
      }
      else if(districtname===''){
        setMessageErr('District Name is required')
        setOpenError(true) 
      }
      else{
        await dispatch(registerAction({fullname,email,name,status,provincename,districtname},history))
        setFullname("")
        setEmail("")
        setName("")
        setStatus("")
        setProvincename("")
        setDistrictname("")
        setMessageErr('')
        await dispatch(displayOrgAction());
      }
      
    }
  return (
    <div className='organisationForm'>
      {
        auth && auth.role==='Datascientist'?null:
        <Button variant="outlined" onClick={handleClickOpen} className="btn">
        Add Organisation
      </Button>
      }
 
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Registration</DialogTitle>
    <DialogContent>
      <DialogContentText>
      
      </DialogContentText>
      {
                  !messageErr? null:
                   <Collapse in={openError}>
                   <Alert
                   severity="error"
                     action={
                       <IconButton
                         aria-label="close"
                         color="inherit"
                         size="small"
                         onClick={handleCloseDiagloError}
                       >
                         <CloseIcon fontSize="inherit" />
                       </IconButton>
                     }
                     sx={{ mb: 0.2 }}
                   >
                    {messageErr}
                   </Alert>
                 </Collapse>
                }    
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
    <label>Company Name</label>
    <input type="text" placeholder="enter company name" name="name"
    value={name}
    onChange={(e)=>setName(e.target.value)}/>
</div>
<div className="formInput">
    <label>Status</label>
    <TextField type="text" select name="status" 
  fullWidth
  variant="standard"
    value={status}
    onChange={(e)=>setStatus(e.target.value)}>
      {
    statuss.map((p)=>(
        <MenuItem key={p.value} value={p.value}>
        {p.label}
        </MenuItem>
    ))
}
      </TextField>
</div>
<div className="formInput">
<label>province</label>
<input type="text" placeholder="enter province" name="provincename"
value={provincename}
onChange={(e)=>setProvincename(e.target.value)}/>
</div>
<div className="formInput">
    <label>district</label>
    <input type="text" placeholder="enter district" name="districtname"
    value={districtname}
onChange={(e)=>setDistrictname(e.target.value)}/>
</div>
     </form>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={handleSubmit}>{register.loading?"loading":"Add Organisation"}</Button>
    </DialogActions>
  </Dialog>
    
    </div>
  )
}

export default OrganisationForm