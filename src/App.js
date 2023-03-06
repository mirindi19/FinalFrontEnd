import Home from"./pages/home/Home"
import List from "./pages/list/List"
import {
  BrowserRouter,
  Route,
  Switch
} from "react-router-dom";
import Login from "./pages/login/Login";
import Routes from './routes/index';
function App() {
  return (
 
    <BrowserRouter>
    <Routes/>
  </BrowserRouter>
   

  
//     <div className="App">

// <BrowserRouter>
//     <Switch>
//       <Route path="/">
//       <Route index element={<Home/>}/>
//       <Route path="users">
//         <Route index element={<List/>}/>
//       </Route>
//       </Route>
//     </Switch>
//   </BrowserRouter>
//     </div>

  );
}

export default App;
