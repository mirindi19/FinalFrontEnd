import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,
  } from "../types/registerTypes";
  
  const initialState = {
    loading: false,
    data: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case  REGISTER_USER_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case  REGISTER_USER_SUCCESS:
        return {
          loading: false,
          data: action.payload,
          error: "",
        };
      case  REGISTER_USER_FAILURE:
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
  