import axios from "axios";
import {
    DCOLLECTIONSTD_REQUEST,
    DCOLLECTIONSTD_SUCCESS,
    DCOLLECTIONSTD_FAILURE,
  } from "../types/displayEducationCollectionTypes";
export const displayEducationCollectionAction = () => async (dispatch) => {

  try {
    dispatch( dStudentCollectionRequest());

    const res = await axios.get(
      `http://localhost:2345/educationCollection/educationCollection`
    
    );
    const  dStudentCollection = await res.data;
    dispatch( dStudentCollectionSuccess( dStudentCollection.data));
    console.log("our Student Collection", dStudentCollection);
  } catch (err) {
    console.log(err);
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch( dStudentCollectionFailure(errorMessage));
    } else {
      dispatch( dStudentCollectionFailure("Network  Error"));
    }
  }
};

export const  dStudentCollectionRequest = () => {
  return {
    type: DCOLLECTIONSTD_REQUEST,
  };
};

export const  dStudentCollectionSuccess = ( dStudentCollection) => {
  return {
    type: DCOLLECTIONSTD_SUCCESS,
    payload:  dStudentCollection,
  };
};
export const  dStudentCollectionFailure = (error) => {
  return {
    type: DCOLLECTIONSTD_FAILURE,
    payload: error,
  };
};