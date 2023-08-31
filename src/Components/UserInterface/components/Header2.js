import { AppBar,Toolbar,useMediaQuery,Badge, Avatar } from "@mui/material";
import { useState } from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import FormControl from '@mui/material/FormControl';
import { useTheme } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import { useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import UserIntroduction from "./UserIntroduction";


export default function Header2(props){
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const lg = useMediaQuery(theme.breakpoints.up('lg'));
    const navigate=useNavigate()
    const [text,setText]=useState('')
    
    

  const handleSeacch=()=>{
    
  }

  
  const handleMenu=()=>{
    props.setOpen(true)
  }

   
    return(
    <div style={{width:'100wv'}}>
         <AppBar variant='outlined' position='sticky' style={{background:'#fff',width:'100%',height:sm?60:80,display:'flex',justifyContent:'center'}}>
            <Toolbar >
                <div style={{display:'flex',flexDirection:'row'}}>

            <div onClick={()=>{navigate('/home')}} style={{cursor:'pointer',alignItems:'center',color:'#000',fontFamily:'Poppins',fontSize:27,fontWeight:'bolder',display:'flex',flexDirection:'row'}}>
             <div><Avatar src={`/assets/abodeLogo.png`} style={{width:45,height:45}} /></div> 
             <div >bode </div>
            </div>
             
            <div onClick={()=>{ navigate('/vendorscreen')}} style={{color:'#fff',background:'#E31C5F',border:'1px solid',height:matches?35:50,borderRadius:9,display:'flex',alignItems:'center',justifyContent:'center',width:matches?`17%`:'10%',fontSize:13,fontWeight:'bold',fontFamily:'Poppins',cursor:'pointer'}}>
           { matches?'Host':'Become a host'}
            </div>
           
           <div style={{color:'#000',width:'10%',height:'100%',display:'flex',justifyContent:matches?'flex-end':'center',paddingLeft:matches?0:'5%',paddingRight:props.paddingRight}}>
           
           {matches?<div><PersonIcon   onClick={handleMenu} style={{cursor:'pointer'}}/></div>:
            <Avatar onClick={handleMenu} style={{width:70,borderRadius:20,background:'#fff',color:'#000',border:'1px solid grey'}} variant='rounded' ><MenuIcon/>&nbsp;<PersonIcon   style={{cursor:'pointer'}}/></Avatar>
          
           }</div>

            </div>
            </Toolbar>
        </AppBar>
    </div>)

}
