import axios from "axios";
import {
    DCOLLECTIONEMP_REQUEST,
    DCOLLECTIONEMP_SUCCESS,
    DCOLLECTIONEMP_FAILURE,
  } from "../types/displayCollectionTypes";
export const displaycollectionAction = () => async (dispatch) => {

  try {
    dispatch(dcollectionRequest());

    const res = await axios.get(
      `http://localhost:2345/empCollection/collection`
    
    );
    const dcollection = await res.data;
    dispatch(dcollectionSuccess(dcollection.data));
    console.log("our organization",dcollection);
  } catch (err) {
    console.log(err);
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(dcollectionFailure(errorMessage));
    } else {
      dispatch(dcollectionFailure("Network  Error"));
    }
  }
};

export const dcollectionRequest = () => {
  return {
    type: DCOLLECTIONEMP_REQUEST,
  };
};

export const dcollectionSuccess = (dcollection) => {
  return {
    type: DCOLLECTIONEMP_SUCCESS,
    payload: dcollection,
  };
};
export const dcollectionFailure = (error) => {
  return {
    type: DCOLLECTIONEMP_FAILURE,
    payload: error,
  };
};