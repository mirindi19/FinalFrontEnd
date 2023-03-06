import {
    TOTALFEMALEORG_REQUEST,
    TOTALFEMALEORG_SUCCESS,
    TOTALFEMALEORG_FAILURE,
  } from "../types/displayTotalPercOfWomenInOrgTypes";
    
  const initialState = {
    loading: false,
    data: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case  TOTALFEMALEORG_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case  TOTALFEMALEORG_SUCCESS:
        return {
          loading: false,
          data: action.payload,
          error: "",
        };
      case  TOTALFEMALEORG_FAILURE:
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
  