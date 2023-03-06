import "./userForm.scss"
import * as React from 'react';
import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const  UserForm = () => {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
 

  return (
    <div className='userform'>
     <Button variant="outlined" onClick={handleClickOpen} className="btn">
        Add User
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
         <form>
            <div className="formInput">
                <label>Fullname</label>
                <input type="text" placeholder="enter Fullname"/>
            </div>
            <div className="formInput">
            <label>E-mail</label>
            <input type="email" placeholder="enter E-mail"/>
        </div>
        <div className="formInput">
        <label>password</label>
        <input type="password" placeholder=""/>
    </div>
    <div className="formInput">
    <label>organisation</label>
    <input type="text" placeholder="enter organisation"/>
</div>
         </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add User</Button>
        </DialogActions>
      </Dialog>
   
    </div>
  )
}

export default  UserForm