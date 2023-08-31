import { useState,useEffect } from 'react';
import {Button,Grid,Divider, Avatar} from "@mui/material"
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useStyles } from './VendorPropertiesCss';
import { getData,postData,serverURL } from "../Api/ServerServices"

import { useNavigate,useLocation, json } from 'react-router-dom';

import LinearProgress from '@mui/material/LinearProgress';
import { useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useSelector,useDispatch } from 'react-redux';
import VendorNavigation from '../MyComponents/VendorNavigation';
import PrevNext from '../MyComponents/PrevNext';




export default function VendorProperties() {
  
     var navigate=useNavigate()
     var location=useLocation()
     var dispatch=useDispatch()

     var vendorData=useSelector(state=>state.vendor)
     var vendor=Object.values(vendorData)[0]

     var propertyData=useSelector(state=>state.properties)
     var property=Object.values(propertyData)[0]

     var vendorDBData=useSelector(state=>state.vendorDBData)
     var vendorDB=Object.values(vendorDBData)[0]
  
     var propertyid=''
     if(vendorDB.propertyid!=null)
     { 
      propertyid=vendorDB.propertyid 
    
     }
    
  
   
         try
         {  
             propertyid=property.propertyid 
         }
         catch(e)
         {

         }


     const classes=useStyles()
     const theme = useTheme()

   const sm = useMediaQuery(theme.breakpoints.down('sm'));
   const md = useMediaQuery(theme.breakpoints.down('md'));
   const lg = useMediaQuery(theme.breakpoints.down('lg'));

   const [propertyList,setPropertyList]=useState([])
   const [selectedProperty,setSelectedProperty]=useState(propertyid)
  
   const [error,setError]=useState({})

   const handleError=(input,value)=>{
      setError((prev)=>({...prev,[input]:value}))
   }

   const validation=()=>{
      var isValid=true

        if(selectedProperty)
        {
         return isValid
        }
        else
        {
         handleError('description','plz enter property description')
          isValid=false
        }
        
        
         }
   
   const fetchAllProperty=async()=>{
    var result=await getData('properties/displayallproperty')
    setPropertyList(result.data)
  }

  useEffect(function(){
     fetchAllProperty()  

  },[])
  

  const handleShadow=(item)=>{
  
   setSelectedProperty(item.propertyid)
   dispatch({type:'ADD_PROPERTIES',payload:[vendor.mobileno,item]})
 
  }

 
   

  const fillProperty=()=>{
   return propertyList.map((item)=>{
      return(
         <div style={{display:'flex',justifyContent:'center',height:'18%',marginTop:'1%'}}>
            <div style={{borderRadius:9,width:sm?'85%':'60%',boxShadow:'0 0px 1px rgba(0,0,0,0.5)'}} className={item.propertyid==selectedProperty?classes.boxShade:classes.boxShade2}  onClick={()=>handleShadow(item)}>
             <div style={{display:'flex',flexDirection:'row',height:'100%',borderRadius:6,background:'white'}}>
               <div style={{width:'78%',height:'100%',alignItems:'center',display:'flex',padding:'6%',fontSize:18}}>
                  {item.propertytype}
                  </div>
               <div style={{width:sm?'45%':'22%',height:'100%',padding:'3%'}}>
               <Avatar variant='square' src={`${serverURL}/images/${item.propertyicon}`}  style={{width:'100%',height:'100%',borderRadius:9}}/>
     
               </div>
             </div>
            </div>
         </div>
      )
   })
  }
  


  return (
    
      <Grid container  sx={{ height: '100vh' }} >
        <CssBaseline />
        {
           !lg?<>
           <Grid item xs={6} md={6} sx={{
           background:"linear-gradient(0deg, rgba(192,57,43,100) 0%,rgba(131,58,180,100) 100%) "}}
        >

        <div className={classes.leftDiv}>
           What kind of place will <br/> you host?
        </div> 

        </Grid>
           </>:''
        }


        


        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square  >
        
        <div className={classes.rightTop}  >
          <VendorNavigation vendorName={vendor.firstname+" "+vendor.lastname} myurl='/addproperties' validation={validation} data={{propertyid:propertyid,mobileno:vendor.mobileno,opr:'ADD_VENDOR_PROPERTIES',msg:'plz select property type'}}/>
        </div>

        <div className={classes.rightMiddle}>
          <div style={{height:'100%',width:'100%',display:'flex',flexDirection:'column'}}>
          <div style={{width:'100%',height:"100%",overflowY:'scroll',paddingBottom:'1%',background:'#f1f2f6'}}>
          {fillProperty()}
          </div>
          </div>
         </div>
     
         
          
         
        <div className={classes.rightButtom}>
           <PrevNext backUrl="/home" nextUrl='/vendorsubproperties'  validation={validation} value={2} data={{propertyid:propertyid,mobileno:vendor.mobileno,opr:'ADD_VENDOR_PROPERTIES',msg:'plz select property type'}}/>
        </div>

        </Grid>
      </Grid>
      
   
  );

}