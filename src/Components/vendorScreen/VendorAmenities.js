import { useState,useEffect } from 'react';
import {Button,Grid,Divider, Avatar} from "@mui/material"
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useStyles } from './VendorAmenitiesCss';
import { getData,serverURL } from "../Api/ServerServices"
import { useNavigate,useLocation, json } from 'react-router-dom';
import { useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useSelector,useDispatch } from 'react-redux';

import VendorNavigation from '../MyComponents/VendorNavigation';
import PrevNext from '../MyComponents/PrevNext';





export default function VendorAmenities() {
  
     var navigate=useNavigate()
     var dispatch=useDispatch()

     var vendorData=useSelector(state=>state.vendor)
     var vendor=Object.values(vendorData)[0]
    
     var amenitiesData=useSelector(state=>state.amenities)
     var amenitiesDatas=Object.values(amenitiesData)[0]


 
     var vendorDBData=useSelector(state=>state.vendorDBData)
     var vendorDB=Object.values(vendorDBData)[0]
     console.log(JSON.stringify(vendorDB.amenities))

   // alert(JSON.stringify(vendorDB.amenities))
   var amenitiesValues={}
   console.log(JSON.stringify(vendorDB.amenities))
     try
     {  
      amenitiesValues=vendorDB.amenities
     }
     catch(e)
     {

     }
     
     
    
  if(amenitiesDatas==undefined)
  {
    amenitiesValues={}
  } 
  else
  {
    amenitiesValues=amenitiesDatas
  }
     
       
 


     const classes=useStyles()
     const theme = useTheme();
   const sm = useMediaQuery(theme.breakpoints.down('sm'));
   const md = useMediaQuery(theme.breakpoints.down('md'));
   const lg = useMediaQuery(theme.breakpoints.down('lg'));


   const [amenitiesOptionList,setAmenitiesOptionList]=useState([])
   const [selectedAmenities,setSelectedAmenities]=useState(amenitiesValues)

   const [error,setError]=useState({})

   const handleError=(input,value)=>{
      setError((prev)=>({...prev,[input]:value}))
   }

   const validation=()=>{
         var isValid=true
        
         if(vendorDB.amenities!='{}')
         {
          isValid=true
          return isValid
         }

        if(amenitiesDatas==undefined  )
        { 
          isValid=false
        }
       
        return isValid
        
         }
  

  const fetchAllAmenitiesOption=async()=>{
    var result=await getData('amenitiesOption/displayallamenities_vendor')
    setAmenitiesOptionList(result.data)
   }

   useEffect(function(){
   fetchAllAmenitiesOption()
   },[])
   

  const displayallamenities=(item)=>{
   return amenitiesOptionList.map((item)=>{
      return(
         <div className={classes.box1}>
             <div className={classes.box2}>
             <div >
               {item.amenities}
             </div>
             <div className={classes.box3}>
               {displayOptions(JSON.parse('['+item.optionlist+']'))}
             </div>
            </div>
         </div>
          )
        })
      }

   const handleAmenitiesClick=(item)=>{
      
    var options=selectedAmenities

    if(options[item.optionid]==undefined)
    {
      options[item.optionid]=item
      setSelectedAmenities({...options})
      handleError('amenities','hii')
     }
     else
     {
      delete options[item.optionid]
      setSelectedAmenities({...options})
     }
     dispatch({type:'ADD_AMENITIES',payload:[vendor.mobileno,options]})
     
 
   }

   const setClass=(item)=>{
      try
     { 
      var values=Object.values(selectedAmenities)
      if(values.length>0)
      {
         var result=false
         for(var i=0;i<values.length;i++)
         {
           // alert(JSON.stringify(selectedAmenities[i])+","+JSON.stringify(item))
            //console.log(selectedAmenities[i].optionid+","+item.optionid)
            if(values[i].optionid==item.optionid)
            {
               result=true
               break
            }
         }
         return result
      }
      else
      { return false }
   }
   catch(e)
   {
      return false
   }
   }
 
  const displayOptions=(list)=>{
    return list.map((item)=>{
       return(
             <Paper elevation={3} style={{borderRadius:9,  width:sm?170:216,height:sm?'20vh':'24vh',}} className={setClass(item)?classes.boxSub1Shadow:classes.boxSub1} onFocus={()=>handleError('amenities','hii')} onClick={()=>handleAmenitiesClick(item)}>
                 <div className={classes.boxSub2}>
                 <Avatar variant='square' src={`${serverURL}/images/${item.icon}`}  style={{width:sm?80:'45%',height:sm?80:'140%'}}/>
                 </div>
                 <div style={{height:'27%',textAlign:'center',fontSize:16}}>
                 {item.optionname} 
                 </div>
             </Paper>
             )
           })
         }


  
  return (
    
      <Grid container  sx={{ height: '100vh' }} >
        <CssBaseline />
        {!lg?<>
           <Grid item xs={6} sx={{ background:"linear-gradient(0deg, rgba(192,57,43,100) 0%,rgba(131,58,180,100) 100%) "}}>
             <div className={classes.leftDiv}>
                Let guest's know what<br/>
                your place has to offer
             </div> 
        </Grid>
           </>:'' }





        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square  >
        
        <div className={classes.rightTop}  >
        <VendorNavigation  vendorName={vendor.firstname+" "+vendor.lastname} myurl='/addproperties' validation={validation} data={{amenities:JSON.stringify(selectedAmenities),mobileno:vendor.mobileno,opr:"ADD_VENDOR_AMENITIES",msg:'plz chose an options'}}  />
        </div>

         <div className={classes.rightMiddle} >
          <div className={classes.bigBox}>
          {displayallamenities()}
          </div>
         </div>

         <div className={classes.rightButtom}>
           <PrevNext backUrl="/vendorguest" nextUrl='/vendorpicture' validation={validation} value={70} data={{amenities:JSON.stringify(selectedAmenities),mobileno:vendor.mobileno,opr:'ADD_VENDOR_AMENITIES',msg:'plz chose an options'}}/>
        </div>
  
        </Grid>
      </Grid>
      
   
  );}

