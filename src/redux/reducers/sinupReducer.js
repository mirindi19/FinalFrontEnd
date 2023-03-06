import {
    SINUP_REQUEST,
    SINUP_SUCCESS,
    SINUP_FAILURE,
  } from "../types/sinupTypes";
  
  const initialState = {
    loading: false,
    data: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case  SINUP_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case  SINUP_SUCCESS:
        return {
          loading: false,
          data: action.payload,
          error: "",
        };
      case  SINUP_FAILURE:
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
  