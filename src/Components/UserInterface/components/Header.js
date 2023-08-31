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


export default function Header(props){
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const lg = useMediaQuery(theme.breakpoints.up('lg'));
    const navigate=useNavigate()
    const [text,setText]=useState('')
    
    

  const handleSeacch=()=>{
    
  }

  const handleVenderScreen=()=>{
   
    navigate('/vendorscreen')
  }

  
  const handleMenu=()=>{
    props.setOpen(true)
  }

   
    return(
    <div style={{width:'100wv'}}>
        <AppBar elevation={props.elevation} style={{background:'#fff',width:'100%'}}>
            <Toolbar >

            <div style={{display:'flex',alignItems:'center',width:'100%',height:'100%',paddingRight:props.paddingRight}}>
            <div onClick={()=>{navigate('/home')}} style={{cursor:'pointer',color:'#000',fontFamily:'Poppins',fontSize:24,width:matches?`10%`:'20%',fontWeight:'bolder',paddingLeft:matches?'':props.paddingLeft,display:'flex',flexDirection:'row'}}>
             <div><Avatar src={`/assets/abodeLogo.png`} style={{width:30,height:30,paddingTop:3}} /></div> 
             <div>{matches?`D`:`bode`} </div>
           </div>
            
            <div style={{display:'flex',justifyContent:'center',width:'60%'}}>
            <FormControl sx={{ m: 1, width:matches?`60%`:`80%`}} variant="filled">
          <OutlinedInput
            id="filled-adornment-weight"
            endAdornment={<InputAdornment onClick={handleSeacch} position="end"><IconButton style={{background:'#E31C5F',width:matches?30:'',height:matches?30:''}} ><SearchIcon style={{color:'#fff'}} /></IconButton></InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            onChange={(e)=>setText(e.target.value)}
            inputProps={{
              'aria-label': 'weight',
            }}
            style={{
              borderRadius:30,
              background:'#fff',
              height:matches?40:''
            }}
          />
          </FormControl>
            </div>
  
            <div onClick={handleVenderScreen} style={{color:'#fff',background:'#E31C5F',border:'1px solid',height:matches?35:50,borderRadius:9,display:'flex',alignItems:'center',justifyContent:'center',width:matches?`17%`:'10%',fontSize:13,fontWeight:'bold',fontFamily:'Poppins',cursor:'pointer'}}>
            { matches?'Host':'Become a host'}
            </div>
           
           <div style={{color:'#000',width:'10%',height:'100%',display:'flex',justifyContent:matches?'flex-end':'center',paddingLeft:matches?0:'5%',paddingRight:props.paddingRight}}>
           
           {matches?<div><PersonIcon   onClick={handleMenu} style={{cursor:'pointer'}}/></div>:
            <Avatar onClick={handleMenu} style={{width:70,borderRadius:20,background:'#fff',color:'#000',border:'1px solid grey'}} variant='rounded' ><MenuIcon/>&nbsp;<PersonIcon   style={{cursor:'pointer'}}/></Avatar>
          
           }
          
         
            </div>
           </div>

            </Toolbar>
           
        </AppBar>
       
       
    </div>)

}