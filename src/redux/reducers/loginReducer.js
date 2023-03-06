import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
  } from "../types/loginTypes";
  
  const initialState = {
    loading: false,
    data: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case  LOGIN_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case  LOGIN_SUCCESS:
        return {
          loading: false,
          data: action.payload,
          error: "",
        };
      case  LOGIN_FAILURE:
        return {
          loading: false,
          data: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  