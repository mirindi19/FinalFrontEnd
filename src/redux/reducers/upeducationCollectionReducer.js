import {
    UPREGISTER_EDUCTIONCOLLECTION_REQUEST,
    UPREGISTER_EDUCTIONCOLLECTION_SUCCESS,
    UPREGISTER_EDUCTIONCOLLECTION_FAILURE,
  } from "../types/upeducationCollectionTypes";
  
  const initialState = {
    loading: false,
    data: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case  UPREGISTER_EDUCTIONCOLLECTION_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case  UPREGISTER_EDUCTIONCOLLECTION_SUCCESS:
        return {
          loading: false,
          data: action.payload,
          error: "",
        };
      case  UPREGISTER_EDUCTIONCOLLECTION_FAILURE:
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
  