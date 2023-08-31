

import { useState,useEffect } from 'react';
import {Button,Grid,Divider, Avatar} from "@mui/material"
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useStyles } from './VendorThirdPageCss';
import { getData,serverURL } from "../Api/ServerServices"

import { useNavigate,useLocation } from 'react-router-dom';

import { useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useSelector,useDispatch } from 'react-redux';

import VendorNavigation from '../MyComponents/VendorNavigation';
import PrevNext from '../MyComponents/PrevNext';





export default function VendorThirdPage() {
  
     var navigate=useNavigate()
     var location=useLocation()
     var dispatch=useDispatch()
     var vendorData=useSelector(state=>state.vendor)
     var vendor=Object.values(vendorData)[0]
    

     var descriptionData=useSelector(state=>state.description)
     var _discription=Object.values(descriptionData)[0]

     var vendorDBData=useSelector(state=>state.vendorDBData)
     var vendorDB=Object.values(vendorDBData)[0]
     var id=''
     if(vendorDB.propertystatus!=null)
     { 
      id=vendorDB.propertystatus
      
    
     }

  
         try
         {   
             id=_discription.id
         }
         catch(e)
         {

         }
     
     //console.log("Vendor Data",vendor)


     const classes=useStyles()
     const theme = useTheme();
   const sm = useMediaQuery(theme.breakpoints.down('sm'));
   const md = useMediaQuery(theme.breakpoints.down('md'));
   const lg = useMediaQuery(theme.breakpoints.down('lg'));


   const [selectedDescriptionId,setSelectedDescriptionId]=useState(id)

 
   const [error,setError]=useState({})

   const handleError=(input,value)=>{
      setError((prev)=>({...prev,[input]:value}))
   }

   const validation=()=>{
      var isValid=true

        if(selectedDescriptionId)
        {
         return isValid
        }
        else
        {
         handleError('description','plz enter property description')
          isValid=false
        }
        
        
         }

  
    const description=[
        {id:1,description:'An entire place'},
        {id:2,description:'An private place'},
        {id:3,description:'An shared place'},
     
      ]
     

  const handleShadow=(item)=>{
   setSelectedDescriptionId(item.id)
   dispatch({type:'ADD_PROPERTY_DESCRIPTION',payload:[vendor.mobileNo,item]}) 

  }
   

  const fillDescription=()=>{
   return description.map((item)=>{
      return(
         <div style={{display:'flex',justifyContent:'center',height:'auto',marginTop:'2%'}}>
            <div style={{borderRadius:9,width:sm?'85%':'60%',boxShadow:'0 0px 2px rgba(0,0,0,0.5)',background:'#fff'}} className={item.id==selectedDescriptionId?classes.boxShade:classes.boxShade2}  onClick={()=>handleShadow(item)}>
             <div style={{padding:'10%',paddingRight:'13%',height:'auto'}}>
              
                  <div style={{fontSize:13,fontSize:'18'}}>
                  {item.description}
                  </div>
               
             </div>
            </div>
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
           What kind of space will <br/>guest have ?
        </div> 

        </Grid>
           </>:''
        }


        


        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square  >
        
        <div className={classes.rightTop}  >
        <VendorNavigation  vendorName={vendor.firstname+" "+vendor.lastname} myurl='/addproperties' validation={validation} data={{propertystatus:id,mobileno:vendor.mobileno,opr:"ADD_VENDOR_PROPERTY_STATUS",msg:'plz what kind of space'}}  />
        </div>

        <div className={classes.rightMiddle}>
          <div style={{height:'100%',width:'100%',display:'flex',flexDirection:'column'}}>
          <div style={{width:'100%',height:"100%",overflowY:'scroll',paddingTop:'8%',background:'#f1f2f6'}}>
          {fillDescription()}
          </div>
          </div>
         </div>
     
         
          
         
         <div className={classes.rightButtom}>
        <PrevNext data={{propertystatus:id,mobileno:vendor.mobileno,opr:"ADD_VENDOR_PROPERTY_STATUS",msg:'plz what kind of space'}} validation={validation} value={28} backUrl="/vendorsubproperties" nextUrl="/vendoraddress" />
        </div>

        </Grid>
      </Grid>
      
   
  );

}