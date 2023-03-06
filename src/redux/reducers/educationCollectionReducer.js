import {
    ORG_REQUEST,
    ORG_SUCCESS,
    ORG_FAILURE,
  } from "../types/displayOrgType";
    
  const initialState = {
    loading: false,
    data: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case  ORG_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case  ORG_SUCCESS:
        return {
          loading: false,
          data: action.payload,
          error: "",
        };
      case  ORG_FAILURE:
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
  