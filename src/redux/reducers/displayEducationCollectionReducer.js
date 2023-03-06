import {
    DCOLLECTIONSTD_REQUEST,
    DCOLLECTIONSTD_SUCCESS,
    DCOLLECTIONSTD_FAILURE,
  } from "../types/displayEducationCollectionTypes";
    
  const initialState = {
    loading: false,
    data: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case  DCOLLECTIONSTD_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case  DCOLLECTIONSTD_SUCCESS:
        return {
          loading: false,
          data: action.payload,
          error: "",
        };
      case  DCOLLECTIONSTD_FAILURE:
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
  