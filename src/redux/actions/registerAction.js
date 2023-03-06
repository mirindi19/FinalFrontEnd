import axios from "axios";
import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,
  } from "../types/registerTypes";
export const registerAction = (data, history) => async (dispatch) => {
  const {fullname}=data
  const {email}=data 
  const {name}=data
  const {status}=data
  const {provincename}=data
  const {districtname}=data
  try {
    dispatch(registerRequest());
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

console.log("our data",data)
    const res = await axios.post(
      `http://localhost:2345/auth/add-newuser-organization`,
      { 
    Fullname:fullname,
    email:email,
    name:name,
    status:status,
    provinceName:provincename,
    districtName:districtname,
       },
    //   {
    //     headers: headers,
    //   }
    );
    const org = await res.data;
    dispatch(registerSuccess({ data: org.data }));
    alert("organization successfully");
    
   
  } catch (err) {
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(registerFailure(errorMessage));
    } else {
      dispatch(registerFailure("Network  Error"));
    }
  }
};

export const registerRequest = () => {
  return {
    type: REGISTER_USER_REQUEST,
  };
};

export const registerSuccess = (student) => {
  return {
    type: REGISTER_USER_SUCCESS,
    payload: student,
  };
};
export const registerFailure = (error) => {
  return {
    type: REGISTER_USER_FAILURE,
    payload: error,
  };
};