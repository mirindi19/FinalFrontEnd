import { combineReducers } from "redux";
import registerReducer from "./registerReducer";
import loginReducer from "./loginReducer";
import usersReducer from "./usersReducer";
import displayOrgReducer from"./displayOrgReducer";
import educationCollectionReducer from"./eductionCollectionReducer";
import collectionReducer from"./collectionReducer";
import sinupReducer from"./sinupReducer";
import displaycollectionReducer from"./displaycollectionReducer";
import displayEducationCollectionReducer from"./displayEducationCollectionReducer";
import  orgeducationCollByUserIdReducer from"./organizationEducationByUserIdReducer"
import displayTotallPercOfWomenInOrgReducer from"./displayTotalPercOfWomenInOrgReducer";

const allReducers = combineReducers({
  
    register:registerReducer,
    login:loginReducer,
    users:usersReducer,
    org:displayOrgReducer,
    education:educationCollectionReducer,
    collection:collectionReducer,
    sinup:sinupReducer,
    dcollection:displaycollectionReducer,
    dStudentCollection:displayEducationCollectionReducer,
    orgeducationCollByUserId:orgeducationCollByUserIdReducer,
    totalpercf:displayTotallPercOfWomenInOrgReducer,

});

export default allReducers;