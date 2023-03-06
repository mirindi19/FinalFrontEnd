import {
    DCOLLECTIONEMP_REQUEST,
    DCOLLECTIONEMP_SUCCESS,
    DCOLLECTIONEMP_FAILURE,
  } from "../types/displayCollectionTypes";
    
  const initialState = {
    loading: false,
    data: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case  DCOLLECTIONEMP_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case  DCOLLECTIONEMP_SUCCESS:
        return {
          loading: false,
          data: action.payload,
          error: "",
        };
      case  DCOLLECTIONEMP_FAILURE:
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
  