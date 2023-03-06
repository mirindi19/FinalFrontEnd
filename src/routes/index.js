import React, { Component } from 'react'
import {  Switch, Route } from "react-router-dom";
import List from '../pages/list/List';
import Home from '../pages/home/Home'
import Login from '../pages/login/Login';
// import DashboardRoute from "./Dashboard.routes";
import Hero from '../pages/hero/Hero';
import Datatableorg from '../components/datatable/Datatableorg'
import Register from '../pages/register/Register';
import Upload from '../pages/uploadList/Upload';
import Collectiondatatable from '../components/datatable/Collectiondatatable';
import UploadAcademic from '../pages/uploadList/UploadAcademic';
import UploadEmployee from '../pages/uploadList/UploadEmployee';
import EducationCollectionDatatable from"../components/datatable/EducationCollectionDatatable";
// import Reportuser from '../pages/list/Reportuser'
// import TotalPercWomen from "../pages/percForm/TotalPercWomen"
// import DashboardRoute from './Dashboard.routes';
import  Reportuser from"../pages/list/Reportuser"





export default class index extends Component {
    render() {
        return (
            <Switch>
         <Route exact path="/" component={Hero}/>
         <Route path="/login">
          <Route index component={Login}/>
          </Route>
          
          <Route path="/users">
         <Route index component={List}/>
       </Route>
       <Route path="/dashboard">
       <Route index component={Home}/>
     </Route>
       <Route path="/organisation">
       <Route index component={Datatableorg}/>
     </Route>
     <Route path="/register">
       <Route index component={Register}/>
     </Route>
     <Route path="/upload">
       <Route index component={Upload}/>
     </Route>
     <Route path="/collection">
     <Route index component={Collectiondatatable }/>
   </Route>
   <Route path="/uploadAcademic">
   <Route index component={UploadAcademic }/>
 </Route>
 <Route path="/uploadEmployee">
 <Route index component={UploadEmployee }/>
</Route>

<Route path="/Category">
 <Route index component={Reportuser}/>
</Route>


<Route path="/academic">
<Route index component={EducationCollectionDatatable }/>
</Route>


            </Switch>
        )
    }
}