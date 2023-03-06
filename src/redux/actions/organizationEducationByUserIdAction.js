import axios from "axios";
import {
    ORGANIZATIONEDUCATIONBYUSERID_REQUEST,
    ORGANIZATIONEDUCATIONBYUSERID_SUCCESS,
    ORGANIZATIONEDUCATIONBYUSERID_FAILURE,
  } from "../types/organizationEducationByUserIdType";
export const organizationCollectionAction = () => async (dispatch) => {
 
  try {
    dispatch(msdRequest());
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
    const token = await localStorage.getItem("access-token");
    let headers;
    if (token) {
      headers = {
        "Content-Type": "application/json",
        token: `${token}`,
      };
    } else {
      headers = {
        "Content-Type": "application/json",
      };
    }
    const res = await axios.get(`http://localhost:2345/organisation/educationCollectionbyOrgId`,
     {
      headers: headers,
    });
    const collection = await res.data;
    dispatch(msdSuccess( collection));
  } catch (err) {
    
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(msdFailure(errorMessage));
    } else {
      dispatch(msdFailure("Network  Error"));
    }
  }
};

export const msdRequest = () => {
  return {
    type: ORGANIZATIONEDUCATIONBYUSERID_REQUEST,
  };
};

export const msdSuccess = (data) => {
  return {
    type: ORGANIZATIONEDUCATIONBYUSERID_SUCCESS,
    payload: data,
  };
};
export const msdFailure = (error) => {
  return {
    type: ORGANIZATIONEDUCATIONBYUSERID_FAILURE,
    payload: error,
  };
};