import {
    USERS_REQUEST,
    USERS_SUCCESS,
    USERS_FAILURE,
  } from "../types/usersTypes";
  
  const initialState = {
    loading: false,
    data: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case  USERS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case  USERS_SUCCESS:
        return {
          loading: false,
          data: action.payload,
          error: "",
        };
      case  USERS_FAILURE:
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
  