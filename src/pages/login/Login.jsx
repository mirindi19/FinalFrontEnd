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
  import { loginAction } from "../../redux/actions/loginAction";
  import { useHistory } from "react-router-dom";
  import { useDispatch,useSelector } from "react-redux";


import {Link} from "react-router-dom"
import "./login.scss"
import TopNav from "../../components/topNav/TopNav";
import Topbar from "../../components/topbar/Topbar";
import IMAGES from "../../Assets/images";
  export default function Login() {
   
    const history = useHistory();
    const dispatch =useDispatch();
    const login = useSelector(state => state.login)
    console.log(window)
    const avatarStyle = {
      backgroundColor: "#FFFF",
      margin: "6px 0px",
    };
    const btnStyle = {
     backgroundColor: "#F9842C",
      //backgroundColor: "#3D426B",
      margin: "6px 0px",
      color:"#FFFF",
    };
    const createStyle = {
      color:"#7451f8",
      textDecoration:"none",
    };
    const textStyle = {
      margin: "30px 0px",
    };
    const forgotStyle = {
      color:"#3D426B",
      textDecoration: "none",
    };
    const initialValues = {
      email: "",
      password: "",
     
    };
    const validationSchema = Yup.object().shape({
      email: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    });
    const onSubmit = async(values, props) => {
      console.log("hhhh:v",values)
      await dispatch(loginAction(values,history))
     
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
            <LoginIcon  className="topAvatarLogin"/>
          

            </Avatar>
            <h2>Sign In</h2>
            
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
                    label="email"
                    name="email"
                    placeholder="Enter email"
                    variant="standard"
                    fullWidth
                    required
                    helperText={<ErrorMessage name="email" />}
                  />
                 
                  <Field
                    as={TextField}
                    label="Password"
                    name="password"
                    placeholder="Enter Pin"
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
                  {login.loading?"loading": "sign in"}  
                  </Button>
                </Form>
    )}
            </Formik>
            <Typography>
              <Link to="/forgot-pin" style={forgotStyle}>
                Forgot password?
              </Link>
                &nbsp;
              <Link to="/register" style={createStyle}>
                Create account
              </Link>
            </Typography>
          </Grid>
        </Paper>
      </Grid>
    );
                }   