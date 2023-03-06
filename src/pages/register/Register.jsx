import React from "react";
import {
    Avatar,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Paper,
    TextField,
    Typography,
  } from "@mui/material";
  import Alert from '@mui/material/Alert';
  import Stack from '@mui/material/Stack';
  import LoginIcon from '@mui/icons-material/Login';
  import { Formik, Form, Field, ErrorMessage } from "formik";
  import * as Yup from "yup";
  
  import { useHistory } from "react-router-dom";


import {Link} from "react-router-dom"
import "./register.scss"
import TopNav from "../../components/topNav/TopNav";
import Topbar from "../../components/topbar/Topbar";

import {sinupAction} from"../../redux/actions/sinupAction";
import { useDispatch,useSelector } from "react-redux";

  export default function Register() {
   
    const history = useHistory();
    const dispatch=useDispatch();
    const sinup=useSelector(state=>state.sinup)
    console.log(window)
    const avatarStyle = {
      backgroundColor: "#FFFF",
      margin: "6px 0px",
    };
    const btnStyle = {
     backgroundColor: "#F9842C",
      margin: "6px 0px",
      color:"#FFFF",
    };
    const textStyle = {
      margin: "30px 0px",
    };
    const forgotStyle = {
      color:"#7451f8",
      textDecoration: "none",
    };
    const initialValues = {
      Fullname:"",
      email: "",
      password: "",
     
    };
    const validationSchema = Yup.object().shape({
      username: Yup.string().required("Required"),
      registrationCode: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    });
    const  onSubmit = async(values, props) => {
      console.log("hhhh:v",values)
      await dispatch(sinupAction(values,history))
    
    };
    return (
      <Grid>
   
        <Topbar/>
      
        <Paper elevation={4}
         sx={{
          p: 4,
          margin: '50px auto',
          maxWidth: 250,
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        }}
        >
          <Grid item xs={12} align="center">
            <Avatar style={avatarStyle}>
            <LoginIcon className="topAvatarLogin"/>
            </Avatar>
            <h2>Sign Up</h2>
          </Grid>
          <Grid style={textStyle}>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              {(props) => (
                <Form>
                <Field
                as={TextField}
                label="Username"
                name="username"
                placeholder="Enter Username"
                variant="standard"
                fullWidth
                required
                helperText={<ErrorMessage name="username" />}
              />
                  <Field
                    as={TextField}
                    label="Registration Code"
                    name="registrationCode"
                    placeholder="Enter registrationCode"
                    variant="standard"
                    fullWidth
                    required
                    helperText={<ErrorMessage name="registrationCode" />}
                  />
                 
                  <Field
                    as={TextField}
                    label="Password"
                    name="password"
                    placeholder="Enter Password"
                    type="password"
                    variant="standard"
                    fullWidth
                    required
                    helperText={<ErrorMessage name="password" />}
                  />
                  {/* {
                    !userLogin.error? null:
                    <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert variant="filled" severity="error">
                    {userLogin.error}
                     </Alert>
                     </Stack>
                  }
                   {/* <p>{userLogin.error}</p>
                  */} 
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    fullWidth
                    style={btnStyle}
                    // disabled={props.isSubmitting}
                  >   
                    {sinup.loading?"loading":"Sign Up"}
                  </Button>
                </Form>
    )}
            </Formik>
            <Typography>
              <Link to="/login" style={forgotStyle}>
                Already have an account?
              </Link>
            </Typography>
            <Typography>
              
            </Typography>
          </Grid>
        </Paper>
      </Grid>
    );
                }   