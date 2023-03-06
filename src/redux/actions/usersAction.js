import axios from "axios";
import {
    USERS_REQUEST,
    USERS_SUCCESS,
    USERS_FAILURE,
  } from "../types/usersTypes";
export const usersAction = () => async (dispatch) => {

  try {
    dispatch(usersRequest());

    const res = await axios.get(
      `http://localhost:2345/auth/users`
    
    );
    const users = await res.data;
    dispatch(usersSuccess(users.data));
    console.log("our users",users);
  } catch (err) {
    console.log(err);
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(usersFailure(errorMessage));
    } else {
      dispatch(usersFailure("Network  Error"));
    }
  }
};

export const usersRequest = () => {
  return {
    type: USERS_REQUEST,
  };
};

export const usersSuccess = (users) => {
  return {
    type: USERS_SUCCESS,
    payload: users,
  };
};
export const usersFailure = (error) => {
  return {
    type: USERS_FAILURE,
    payload: error,
  };
};