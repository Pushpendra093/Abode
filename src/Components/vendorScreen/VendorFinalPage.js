

import { useState,useEffect } from 'react';
import {Button,Grid,Divider, Avatar, TextField} from "@mui/material"
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useStyles } from './VendorFinalPageCss';
import { getData,serverURL } from "../Api/ServerServices"
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { useNavigate,useLocation } from 'react-router-dom';

import { useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useSelector,useDispatch } from 'react-redux';
import VendorNavigation from '../MyComponents/VendorNavigation';
import PrevNext from '../MyComponents/PrevNext';





export default function VendorFinalPage() {
  
     var navigate=useNavigate()
     var location=useLocation()
     var dispatch=useDispatch()

     var vendorExtra=useSelector(state=>state.extraInfo)
     // alert("extra"+JSON.stringify(vendorExtra))

    
     var vendorData=useSelector(state=>state.vendor)
     var vendor=Object.values(vendorData)[0]

    
     var vendorDBData=useSelector(state=>state.vendorDBData)

     var lastInfoData=useSelector(state=>state.lastInfo)
     

     

    
   
  const setData=()=>
    { 
    
     if(JSON.stringify(lastInfoData)!="{}")
     {
      var vendorDB=Object.values(lastInfoData)[0]
      setDescription(vendorDB.placedescription)
      setTitle(vendorDB.title)
      setPrice(vendorDB.price)
      setOfferPrice(vendorDB.offerprice)
     }
     else if(JSON.stringify(vendorDBData)!="{}")
     {
      var vendorDB=Object.values(vendorDBData)[0]
      setDescription(vendorDB.placedescription)
      setTitle(vendorDB.title)
      setPrice(vendorDB.price)
      setOfferPrice(vendorDB.offerprice)
     }

     }
    
     useEffect(function(){
      setData()
     },[])
     
  


     const classes=useStyles()
     const theme = useTheme();
   const sm = useMediaQuery(theme.breakpoints.down('sm'));
   const md = useMediaQuery(theme.breakpoints.down('md'));
   const lg = useMediaQuery(theme.breakpoints.down('lg'));


   const [description,setDescription]=useState('')
   const [title,setTitle]=useState('')
   const [price,setPrice]=useState('')
   const [offerPrice,setOfferPrice]=useState('')
   const [error,setError]=useState({})

   const handleError=(input,value)=>{
      setError((prev)=>({...prev,[input]:value}))
   }

   const validation=()=>{
      var isValid=true

        if(!description)
        {
          handleError('description','plz enter property description')
          isValid=false
        }
        if(!title)
        {
          handleError('title','plz enter property title')
          isValid=false
        }
        if(price <= 1000)
        {
          handleError('price','plz enter minimum property price 1000')
          isValid=false
        }
        if(offerPrice )
        {
          if(offerPrice>=price )
          {
            handleError('offerPrice','offer price never gratter than proerty price')
            isValid=false
          }
          if(offerPrice<1000 )
          {
            handleError('offerPrice','plz enter minimum offer price 1000')
            isValid=false
          }
        }
         return isValid
         }
 

   const handlePay=()=>{
    if(validation())
    {
      var body = {placedescription:description,title:title,price:price,offerprice:offerPrice}
      dispatch({type:'ADD_LASTINFO',payload:[vendor.mobileno,body]})
    }
   }
  

  
   const handleSubmit=()=>{
      var body = {placedescription:description,title:title,price:price,offerprice:offerPrice}
      dispatch({type:'ADD_SELECT_STATE',payload:[vendor.mobileno,body]})
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
        <VendorNavigation  vendorName={vendor.firstname+" "+vendor.lastname} myurl='/addproperties' validation={validation} data={{placedescription:description,title:title,price:price,offerprice:offerPrice,mobileno:vendor.mobileno,opr:"ADD_VENDOR_EXTRA_DETAILS",msg:'plz fill correct info'}}  />
       
        </div>

        <div className={classes.rightMiddle}  >
        <Grid container spacing={3} style={{width:sm?'95%':'55%',padding:'1%'}}>
               
                <Grid item xs={12}>
                 <TextField error={error.title?true:false}  helperText={error.title} onFocus={()=>handleError('title',null)} value={title} fullWidth onChange={(e)=>setTitle(e.target.value)}  variant='outlined'  label='Property Title' />
                </Grid>

                <Grid item xs={12}>
                 <TextField error={error.price?true:false}  helperText={error.price} onFocus={()=>handleError('price',null)} value={price} fullWidth onChange={(e)=>setPrice(e.target.value)}  variant='outlined' label='Price' />
                </Grid>

                <Grid item xs={12}>
                 <TextField error={error.offerPrice?true:false}  helperText={error.offerPrice} onFocus={()=>handleError('offerPrice',null)} value={offerPrice} fullWidth onChange={(e)=>setOfferPrice(e.target.value)}    variant='outlined' label='Offer Price' />
                </Grid>

                <Grid item xs={12}>
                <TextField multiline rows={3} maxRows={4} minRows={3} error={error.description?true:false}  helperText={error.description} onFocus={()=>handleError('description',null)} value={description}  fullWidth onChange={(e)=>setDescription(e.target.value)} variant='outlined'  label='Property Description' />
              
                </Grid>


              

            </Grid>
         </div>
     
         <div className={classes.rightButtom}>
        <PrevNext  backUrl="/vendorpicture" nextUrl="/home" validation={validation}  value={98} data={{placedescription:description,title:title,price:price,offerprice:offerPrice,mobileno:vendor.mobileno,opr:"ADD_VENDOR_EXTRA_DETAILS",msg:'plz fill correct info'}} />
        </div>

        </Grid>
      </Grid>
      
   
  );

}