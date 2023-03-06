import {
    ORGANIZATIONEDUCATIONBYUSERID_REQUEST,
    ORGANIZATIONEDUCATIONBYUSERID_SUCCESS,
    ORGANIZATIONEDUCATIONBYUSERID_FAILURE,
  } from "../types/organizationEducationByUserIdType";
  
  const initialState = {
    loading: false,
    data: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case   ORGANIZATIONEDUCATIONBYUSERID_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case   ORGANIZATIONEDUCATIONBYUSERID_SUCCESS:
        return {
          loading: false,
          data: action.payload,
          error: "",
        };
      case   ORGANIZATIONEDUCATIONBYUSERID_FAILURE:
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
  