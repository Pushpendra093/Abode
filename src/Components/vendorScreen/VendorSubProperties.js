

import { useState,useEffect } from 'react';
import {Button,Grid,Divider, Avatar} from "@mui/material"
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useStyles } from './VendorSubPropertiesCss';
import { getData,serverURL,postData } from "../Api/ServerServices"

import { useNavigate,useLocation } from 'react-router-dom';

import { useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useSelector,useDispatch } from 'react-redux';
import VendorNavigation from '../MyComponents/VendorNavigation';

import PrevNext from '../MyComponents/PrevNext';




export default function VendorSubProperties() {
  
     var navigate=useNavigate()
     var location=useLocation()
     var dispatch=useDispatch()
     var vendorData=useSelector(state=>state.vendor)
     var vendor=Object.values(vendorData)[0]
     var mobileNo=Object.keys(vendorData)[0]

     var propertyData=useSelector(state=>state.properties)
     var property=Object.values(propertyData)[0]

     var subPropertyData=useSelector(state=>state.subProperties)
     var subProperty=Object.values(subPropertyData)[0]

     var vendorDBData=useSelector(state=>state.vendorDBData)
     var vendorDB=Object.values(vendorDBData)[0]
   
     var subpropertyid=''
     if(vendorDB.subpropertyid!=null)
     { 
      subpropertyid=vendorDB.subpropertyid 
   
     }

   
     
         try
         {   
             subpropertyid=subProperty.subpropertyid 
            
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
   const [subPropertyList,setSubPropertyList]=useState([])
   const [selectedSubProperty,setSelectedSubProperty]=useState(subpropertyid)

   const [error,setError]=useState({})

   const handleError=(input,value)=>{
      setError((prev)=>({...prev,[input]:value}))
   }

   const validation=()=>{
      var isValid=true

        if(selectedSubProperty)
        {
         return isValid
        }
        else
        {
         handleError('description','plz enter property description')
          isValid=false
        }
        
        
         }

  /* const fetchAllSubProperty2=async()=>{
      var result=await postData('subProperties/search_subproperty_by_propertyid',{propertyid:property.propertyid })
     
      setSubPropertyList(result.data)
    }*/

    const fetchAllSubProperty=async()=>{
      var result=await getData('subProperties/search_subproperty')
     
      setSubPropertyList(result.data)
    }
  
    useEffect(function(){
       fetchAllSubProperty()  
  
    },[])

  const handleShadow=(item)=>{
   setSelectedSubProperty(item.subpropertyid)
   dispatch({type:'ADD_SUB_PROPERTIES',payload:[vendor.mobileno,item]})
 

  }
   

  const fillSubProperties=()=>{
   return subPropertyList.map((item)=>{
      return(
        <div style={{width:sm?'90%':'74%',padding:'3%',margin:sm?'2%':'1%',borderRadius:9.,boxShadow:'0 0px 1px rgba(0,0,0,0.5)',background:'white'}}  className={item.subpropertyid==selectedSubProperty?classes.boxShade:classes.boxShade2} onClick={()=>handleShadow(item)}>
          <div style={{fontSize:17}}>
          {item.subpropertyname}
          </div>
          <div style={{fontSize:13,color:'gray',paddingRight:'11%'}}>
          {item.description}
          </div>
        </div>
      )
   })
  }
  // {item.description}
 // {item.subpropertyname}
  //  const fillSubProperties=()=>{
  // return subPropertyList.map((item)=>{
    //  return(
  return (
    
      <Grid container  sx={{ height: '100vh' }}>
        <CssBaseline />
        {
           !lg?<>
           <Grid item xs={6} sx={{
           background:"linear-gradient(0deg, rgba(192,57,43,100) 0%,rgba(131,58,180,100) 100%) "}}
        >

        <div className={classes.leftDiv}>
           Which of these best <br/>describes your place?
        </div> 

        </Grid>
           </>:''
        }


        


        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square  >
        
        <div className={classes.rightTop}   >
        <VendorNavigation  vendorName={vendor.firstname+" "+vendor.lastname} myurl='/addproperties' validation={validation} data={{subpropertyid:subpropertyid,mobileno:vendor.mobileno,opr:"ADD_VENDOR_SUBPROPERTIES",msg:'plz sub property type'}}  />
        </div>

       <div style={{height:'80vh',width:'100%',overflowY:'auto',display:'flex',flexDirection:'column',paddingLeft:sm?'6%':'19%',background:'#f1f2f6'}}>
        {fillSubProperties()}
       </div>
     
         
          
         
        <div className={classes.rightButtom}>
        <PrevNext data={{subpropertyid:subpropertyid,mobileno:vendor.mobileno,opr:"ADD_VENDOR_SUBPROPERTIES",msg:'plz sub property type'}}  validation={validation} value={14} backUrl="/vendorproperties" nextUrl="/vendorthirdpage" />
        </div>

        </Grid>
      </Grid>
      
   
  );

}

