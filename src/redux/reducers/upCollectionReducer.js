import {
    UPCOLLECTION_REQUEST,
    UPCOLLECTION_SUCCESS,
    UPCOLLECTION_FAILURE,
  } from "../types/upCollectionTypes";
  
  const initialState = {
    loading: false,
    data: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case  UPCOLLECTION_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case  UPCOLLECTION_SUCCESS:
        return {
          loading: false,
          data: action.payload,
          error: "",
        };
      case  UPCOLLECTION_FAILURE:
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
  