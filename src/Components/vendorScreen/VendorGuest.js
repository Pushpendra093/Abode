import { useState,useEffect } from 'react';
import {Button,Grid,Divider, Avatar} from "@mui/material"
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useStyles } from './VendorGuestCss';
import { getData,serverURL } from "../Api/ServerServices"
import { useNavigate,useLocation } from 'react-router-dom';
import { useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useSelector,useDispatch } from 'react-redux';
import PlusMinus from '../MyComponents/PlusMinus';

import VendorNavigation from '../MyComponents/VendorNavigation';
import PrevNext from '../MyComponents/PrevNext';





export default function VendorGuest() {
  
    var navigate=useNavigate()
    var location=useLocation()
    var dispatch=useDispatch()
    var vendorData=useSelector(state=>state.vendor)
    var vendor=Object.values(vendorData)[0]

    var  guestJsonData=useSelector(state=> state.guest)
    var  guest=Object.values(guestJsonData)[0]

    var vendorDBData=useSelector(state=>state.vendorDBData)
    var vendorDB=Object.values(vendorDBData)[0]
    

    



    const classes=useStyles()
    const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const md = useMediaQuery(theme.breakpoints.down('md'));
  const lg = useMediaQuery(theme.breakpoints.down('lg'));

  const [guestSubmit,setGuestSubmit]=useState({})
   const [error,setError]=useState({})

   const handleError=(input,value)=>{
      setError((prev)=>({...prev,[input]:value}))
   }

   const validation=()=>{
      var isValid=true

        if(guestSubmit)
        {
         return isValid
        }
        else
        {
         handleError('description','plz enter property description')
          isValid=false
        }
        
        
         }
  

 
   const guestJson=[
       {id:1,option:'Guest',value:1},
       {id:2,option:'Beds',value:1},
       {id:3,option:'bedroom',value:1},
       {id:4,option:'Bothroom',value:1},
    
     ]
    


 const handleGuest=(index,value)=>{

    guestJson[index].value=value
    dispatch({type:'ADD_GUEST',payload:[vendor.mobileno,guestJson]})
    setGuestSubmit({...guestJson})
 }


 const fillGuestJson=()=>{
  return guestJson.map((item,index)=>{
     return(
        <div style={{display:'flex',justifyContent:'center',height:'auto',marginTop:'1%'}}>
            <Paper  variant='outlined' style={{borderRadius:9,width:sm?'90%':'70%'}}  >
             <div style={{padding:'4%',paddingRight:'7%',height:'auto',display:'flex',justifyContent:'space-between'}}>
               <div style={{fontSize:19,display:'flex',alignItems:'center'}}>
                  {item.option}
                  </div>
                  <div style={{fontSize:13,color:'gray'}}>
                  <PlusMinus  onChange={(value)=>handleGuest(index,value)}/>
                  </div>
             </div>
            </Paper>
         </div>
     )
  })
 }
 


  
  return (
    
      <Grid container  sx={{ height: '100vh' }}>
        <CssBaseline />
        {
           !lg?<>
           <Grid item xs={6} sx={{
           background:"linear-gradient(0deg, rgba(192,57,43,100) 0%,rgba(131,58,180,100) 100%) "}}
        >

        <div className={classes.leftDiv}>
           Let guests know what<br/>
            your place has to offer
        </div> 

        </Grid>
           </>:''
        }


        


        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square  >
        
        <div className={classes.rightTop}  >
        <VendorNavigation  vendorName={vendor.firstname+" "+vendor.lastname} myurl='/addproperties' validation={validation} data={{placeoffer:JSON.stringify(guestSubmit),mobileno:vendor.mobileno,opr:"ADD_VENDOR_PLACEOFFER",msg:'fill quantity of guest, beds, bedrooms '}}  />
        </div>

        <div className={classes.rightMiddle}>
          <div style={{height:'100%',width:'100%',display:'flex',flexDirection:'column'}}>
          <div style={{width:'100%',height:"100%",paddingTop:'12%',background:'#f1f2f6'}}>
          {fillGuestJson()}
          </div>
          </div>
         </div>
     
     
         <div className={classes.rightButtom}>
           <PrevNext backUrl="/vendoraddress" nextUrl='/vendoramenities' value={56} validation={validation} data={{placeoffer:JSON.stringify(guestSubmit),mobileno:vendor.mobileno,opr:'ADD_VENDOR_PLACEOFFER',msg:'fill quantity of guest, beds, bedrooms '}}/>
        </div>

        </Grid>
      </Grid>
      
   
  );

}