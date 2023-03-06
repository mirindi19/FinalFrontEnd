import axios from "axios";
import {
    SINUP_REQUEST,
    SINUP_SUCCESS,
    SINUP_FAILURE,
  } from "../types/sinupTypes";
export const sinupAction = (data, history) => async (dispatch) => {
  const {username}=data
  const {registrationCode}=data 
  const {password}=data
  
  try {
    dispatch(sinupRequest());
    // const token = await localStorage.getItem("access-token");
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
      `http://localhost:2345/auth/sinup`,
      { 
    username:username,
    registrationCode:registrationCode,
    password:password,
       },
    //   {
    //     headers: headers,
    //   }
    );
    const sinup = await res.data;
    dispatch(sinupSuccess({ data: sinup.data }));
    alert("account created successfully");
    
   
  } catch (err) {
    console.log(err);
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(sinupFailure(errorMessage));
    } else {
      dispatch(sinupFailure("Network  Error"));
    }
  }
};

export const sinupRequest = () => {
  return {
    type: SINUP_REQUEST,
  };
};

export const sinupSuccess = (sinup) => {
  return {
    type: SINUP_SUCCESS,
    payload: sinup,
  };
};
export const sinupFailure = (error) => {
  return {
    type: SINUP_FAILURE,
    payload: error,
  };
};