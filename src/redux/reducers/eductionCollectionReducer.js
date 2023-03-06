import {
    REGISTER_EDUCTIONCOLLECTION_REQUEST,
    REGISTER_EDUCTIONCOLLECTION_SUCCESS,
    REGISTER_EDUCTIONCOLLECTION_FAILURE,
  } from "../types/educationCollectionTypes";
  
  const initialState = {
    loading: false,
    data: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case  REGISTER_EDUCTIONCOLLECTION_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case  REGISTER_EDUCTIONCOLLECTION_SUCCESS:
        return {
          loading: false,
          data: action.payload,
          error: "",
        };
      case  REGISTER_EDUCTIONCOLLECTION_FAILURE:
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
  