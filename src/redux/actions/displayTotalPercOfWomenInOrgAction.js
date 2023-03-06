import axios from "axios";
import {
    TOTALFEMALEORG_REQUEST,
    TOTALFEMALEORG_SUCCESS,
    TOTALFEMALEORG_FAILURE,
  } from "../types/displayTotalPercOfWomenInOrgTypes";
    
export const displayTotalPercOfWomenInOrgAction = () => async (dispatch) => {

  try {
    dispatch(totalpercfRequest());

    const res = await axios.get(
      `http://localhost:2345/organisation/total`
    
    );
    const totalpercf = await res.data;
    dispatch(totalpercfSuccess(totalpercf.data));
    console.log("our organization",totalpercf);
  } catch (err) {
    console.log(err);
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(totalpercfFailure(errorMessage));
    } else {
      dispatch(totalpercfFailure("Network  Error"));
    }
  }
};

export const totalpercfRequest = () => {
  return {
    type: TOTALFEMALEORG_REQUEST,
  };
};

export const totalpercfSuccess = (totalpercf) => {
  return {
    type: TOTALFEMALEORG_SUCCESS,
    payload: totalpercf,
  };
};
export const totalpercfFailure = (error) => {
  return {
    type: TOTALFEMALEORG_FAILURE,
    payload: error,
  };
};