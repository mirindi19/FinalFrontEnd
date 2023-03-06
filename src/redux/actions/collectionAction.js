import axios from "axios";
import {
    COLLECTION_REQUEST,
    COLLECTION_SUCCESS,
    COLLECTION_FAILURE,
  } from "../types/collectionTypes";
export const collectionAction = (data) => async (dispatch) => {
 
  const {empName}=data 
  const {position}=data
  const {age}=data
  const {salary}=data
  const {gender}=data
  try {
    dispatch(collectionRequest());
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
    const res = await axios.post(`http://localhost:2345/empCollection/collection`,
    {
      Fullname:empName,
      position:position,
      age:age,
      salary:salary,
      gender:gender
    },
     {
      headers: headers,
    });
    const collection = await res.data;
    dispatch(collectionSuccess( collection.message));
    alert("Enployee created successfully");
    window.location.reload()
   
  } catch (err) {
    console.log(err);
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(collectionFailure(errorMessage));
    } else {
      dispatch(collectionFailure("Network  Error"));
    }
  }
};

export const collectionRequest = () => {
  return {
    type: COLLECTION_REQUEST,
  };
};

export const collectionSuccess = (collection) => {
  return {
    type: COLLECTION_SUCCESS,
    payload: collection,
  };
};
export const collectionFailure = (error) => {
  return {
    type: COLLECTION_FAILURE,
    payload: error,
  };
};