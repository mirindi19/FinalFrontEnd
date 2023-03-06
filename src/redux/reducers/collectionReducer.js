import {
    COLLECTION_REQUEST,
    COLLECTION_SUCCESS,
    COLLECTION_FAILURE,
  } from "../types/collectionTypes";
  
  const initialState = {
    loading: false,
    data: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case  COLLECTION_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case  COLLECTION_SUCCESS:
        return {
          loading: false,
          data: action.payload,
          error: "",
        };
      case  COLLECTION_FAILURE:
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
  