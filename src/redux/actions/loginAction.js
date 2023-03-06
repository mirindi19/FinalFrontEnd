import axios from "axios";
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
  } from "../types/loginTypes";
export const loginAction = (data, history) => async (dispatch) => {

  try {
    dispatch(loginRequest());
    //const token = await localStorage.getItem("x-access-token");
    // let headers;
    // if (token) {
    //   headers = {
    //     "Content-Type": "application/json",
    //     "token": `${token}`,
    //   };
    // } else {
    //   headers = {
    //     "Content-Type": "application/json",
    //   };
    // }
    const res = await axios.post(
      `http://localhost:2345/auth/login`,
      { ...data },
    //   {
    //     headers: headers,
    //   }
    );
    const user = await res.data;
    localStorage.setItem("access-token",user.data.token)
    if(user.data.role=="Admin"){
        history.push('/organisation',{push:true}) 
    }
    else if(user.data.role=="Datascientist"){
      history.push('/dashboard',{push:true}) 
  }
    else if(user.data.role=="OrganizationUser"){
        history.push('/upload',{push:true})
    }
    dispatch(loginSuccess({ data: user.data }));
  } catch (err) {
    console.log(err);
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(loginFailure(errorMessage));
    } else {
      dispatch(loginFailure("Network  Error"));
    }
  }
};

export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

export const loginSuccess = (users) => {
  return {
    type: LOGIN_SUCCESS,
    payload: users,
  };
};
export const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    payload: error,
  };
};