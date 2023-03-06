import './widget.scss'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import {useEffect,useState} from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
const Widget = ({type}) => {
    let data;

    const [numberofUser,setNumberofUser] = useState('')
    const [numberofOrganization,setNumberofOrganization] = useState('')
    const [numberofAcademic,setNumberofAcademic]=useState('')
    const [numberofEmpWomen,setNumberofEmpWomen]=useState('')
    console.log("my data" , numberofUser)
    useEffect(()=>{
        async function fetchData(){
        await axios.get('http://localhost:2345/auth/users').then((response)=>{
            
            setNumberofUser(response.data.data.length)
        }
       
            
        ).cacth(err=>{
        console.log(err)}
        )
        }

        async function fetchDataOrganisation(){
            await axios.get('http://localhost:2345/organisation/getOrganisation').then((response)=>{
                
                setNumberofOrganization(response.data.data.length)
            }
           
                
            ).cacth(err=>{
            console.log(err)}
            )
            }

            async function fetchDataEducationCollection(){
                await axios.get('http://localhost:2345/educationCollection/educationCollection').then((response)=>{
                    
                    setNumberofAcademic(response.data.data.length)
                }
               
                    
                ).cacth(err=>{
                console.log(err)}
                )
                }
                async function fetchDataCollectionEmp(){
                    await axios.get('http://localhost:2345/empCollection/collection').then((response)=>{
                        
                        setNumberofEmpWomen(response.data.data.length)
                    }
                   
                        
                    ).cacth(err=>{
                    console.log(err)}
                    )
                    }
        fetchData();
        fetchDataOrganisation();
        fetchDataEducationCollection();
        fetchDataCollectionEmp();
        },[])

  

        

    //temporary

 
    const diff=20;


    switch (type) {
        case "user":
        data = {
           
            title: "USERS",
            number:numberofUser,
               
            link:"See All users",
            
            icon: <PersonOutlineIcon className="icon" 
            style={{
                color:"crimson",
                backgroundColor:"rgba(255, 0, 0, 0.2)",
            }}
            />,
            

        };
        break;
        case "organisation":
            data = {
                title: "Organisation",
                number:numberofOrganization,
                link:"View all organisation",
                icon: <ShoppingCartIcon className="icon" 
                style={{
                    color:"purple",
                    backgroundColor:" rgba(168, 0, 0, 0.2)",
                }}
                
                />,
    
            };
            break;
            case "academic":
                data = {
                    title: "academic",
                    number:numberofAcademic,
                    link:"View all academic",
                    icon: <MonetizationOnIcon className="icon"
                    style={{
                        color:"green",
                        backgroundColor:"rgba(120, 120, 0, 0.2)",
                    }}
                    />,
        
                };
                break;
                case "employee":
                    data = {
                        title: "Employee",
                        number:numberofEmpWomen,
                        link:"See Employee",
                        icon: <AccountBalanceWalletIcon className="icon"
                        style={{
                            color:"yellow",
                            backgroundColor:"rgba(230, 0, 0, 0.2)",
                        }}
                        />,
            
                    };
                    break;
        default:
        break;
    }
  return (
    <div className='widget'>
        <div className="left">
            <span className="title">{data.title}</span>
            <span className="counter">
               {data.number}
            </span>
            <span className="link">{data.link}</span>
        </div>
        
        <div className="right">
            <div className="percentage positive">
                <KeyboardArrowUpIcon/>
                {diff}%
            </div>
            {data.icon}
        </div>
    </div>
  )
}

export default Widget