import './navbar.scss'
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ListIcon from '@mui/icons-material/List';
import { Button } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context';
const Navbar = () => {
  const {setAuth}=useContext(AuthContext);
  const history=useHistory()
  const handleLogout=()=>{
    localStorage.removeItem('access-token')
    setAuth({});
    history.push("/",{push:true})
}
  return (
    <div className='navbar'>
     <div className="wrapper">
       <div className="search">
     
   </div>
      <div className="items">
        <div className="item">
        <Button onClick={handleLogout}>
        <ExitToAppIcon className="icon"/>
        <span >Logout</span>
        </Button>
        </div>
      </div>
     </div>
    </div>
  )
}

export default Navbar