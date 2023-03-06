import axios from "axios";
import {
    ORG_REQUEST,
    ORG_SUCCESS,
    ORG_FAILURE,
  } from "../types/displayOrgType";
export const displayOrgAction = () => async (dispatch) => {

  try {
    dispatch(orgRequest());

    const res = await axios.get(
      `http://localhost:2345/organisation//getOrganisation`
    
    );
    const org = await res.data;
    dispatch(orgSuccess(org.data));
    console.log("our organization",org);
  } catch (err) {
    console.log(err);
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(orgFailure(errorMessage));
    } else {
      dispatch(orgFailure("Network  Error"));
    }
  }
};

export const orgRequest = () => {
  return {
    type: ORG_REQUEST,
  };
};

export const orgSuccess = (org) => {
  return {
    type: ORG_SUCCESS,
    payload: org,
  };
};
export const orgFailure = (error) => {
  return {
    type: ORG_FAILURE,
    payload: error,
  };
};