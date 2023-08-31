

import { useState,useEffect } from 'react';
import {Avatar, Button,Grid} from "@mui/material"
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import { useStyles } from './VendorPictureCss';
import { getData,serverURL,postData } from "../Api/ServerServices"

import { useNavigate,useLocation, json } from 'react-router-dom';
import {DropzoneArea, DropzoneDialog} from 'material-ui-dropzone'
import { useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useSelector,useDispatch } from 'react-redux';

import VendorNavigation from '../MyComponents/VendorNavigation';
import PrevNext from '../MyComponents/PrevNext';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Swal from "sweetalert2";
import { Alarm } from '@mui/icons-material';

import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';





export default function VendorThirdPage() {
  
     var navigate=useNavigate()
     var location=useLocation()
     var dispatch=useDispatch()
     
     var vendorData=useSelector(state=>state.vendor)
     var vendor=Object.values(vendorData)[0]
    
     var vendorDBData=useSelector(state=>state.vendorDBData)
     var vendorDB=Object.values(vendorDBData)[0]

     //console.log(JSON.stringify(vendorDB.pictures.split(",").length))

     var pictureDB=useSelector(state=>state.picture)
     var picture=Object.values(pictureDB)[0]
     
 
    //alert("picture:"+JSON.stringify(pictureDB))

     var pictures={}
    
     
     const setPicture=()=>{ 

   if(vendorDB.pictures!=null)
     { 
      
      pictures=JSON.parse(vendorDB.pictures) 
       setCount(Object.keys(pictures).length)
       //setCountPic(Object.keys(pictures).length)
       setTempPicture(pictures)

     }

   }
    



     const classes=useStyles()
     const theme = useTheme();
   const sm = useMediaQuery(theme.breakpoints.down('sm'));
   const md = useMediaQuery(theme.breakpoints.down('md'));
   const lg = useMediaQuery(theme.breakpoints.down('lg'));


   const [getFiles,setFiles]=useState([])
   const [tempPicture,setTempPicture]=useState({})
   const [message,setMessage]=useState('NO message')
   const [count,setCount]=useState(0)
   const [countPic,setCountPic]=useState(0)
   const [error,setError]=useState({})

   const handleError=(input,value)=>{
      setError((prev)=>({...prev,[input]:value}))
   }

   const validation=()=>{
      var isValid=false
      if(vendorDB.pictures!=null)
      {
        if(countPic!=0)
        {
          isValid=true
        }
      }
      else if(countPic!=0)
      {
        isValid=true
       
      }
     return isValid
        
        
         }
  


   const handlePictureDelete=(index)=>{
    
    var P=tempPicture
    delete P[index]
    setCount(Object.keys(P).length)
    //setCountPic(Object.keys(P).length)
    setTempPicture({...P}) 

   }

   useEffect(function(){
    setPicture()
   },[])
     
   const showPictures=()=>{
    return Object.values(tempPicture).map((item,index)=>{
      return(<div style={{width:120,height:100,padding:'2%',display:'flex'}}>
        <Avatar onClick={()=>{handlePictureDelete(index)}} sx={{ cursor:'pointer',width: 25, height: 25,background:'white' }}  style={{position:'relative',left:25,top:2}}><DeleteForeverIcon style={{color:'black'}} /></Avatar>
        <img src={`${serverURL}/images/${item}`} style={{width:'100%',height:'100%',borderRadius:7,}} />
      </div>)
    })
   }
   
   
   
    
   const handleNext=async(item)=>{
   
    if(validation())
   { var formData=new FormData()
    formData.append('mobileno',vendor.mobileno)
    formData.append('oldpicture',JSON.stringify(tempPicture))

    getFiles.map((item,index)=>{
     
        formData.append('picture'+index,item)
    })

    console.log(JSON.stringify(formData))
   // dispatch({type:'ADD_PICTURE',payload:[vendor.mobileno,formData]})

    dispatch({type:'ADD_PICTURE',payload:[vendor.mobileno,getFiles]})
    var result=await postData('vendor/update_vendor_properties_picture',formData)
    if(result.status)
  {   
    if(item==2)
    {navigate('/home')}
    else
    {navigate('/vendorfinalpage')}
  }
  else
  {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'plz uplode 5 images',
      showConfirmButton: false,
      timer: 1500
    })
  }}
  else
  {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title:'insert 5 picture',
      showConfirmButton: false,
      timer: 1500
  })
  }
  
}

const handleFiles=(files)=>{
  setFiles(files)
  setCountPic(files. length)
}

/*
<Grid item xs={12} style={{display:'flex',flexDirection:'row', flexWrap:'wrap',justifyContent:'flex-start'}}>
         {showPictures()}
         </Grid>
         */


  
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
        
        <div style={{display:'flex',justifyContent:'space-between',flexDirection:'row',paddingTop:sm?'5%':'2%', paddingLeft:'2%',paddingRight:'2%'}} className={classes.rightTop}>
        <Paper style={{  display:'flex',alignItems:'center',width:'auto',padding:'2%',height:'5vh',marginLeft:'2%',borderRadius:15,fontWeight:'bold',fontSize:15,fontFamily:'revert',borderRadius:9}} variant="outlined"   >
            {vendor.firstname} {vendor.lastname}
           </Paper>
           
           <Paper onClick={()=>handleNext(2)} variant="outlined" style={{  display:'flex',alignItems:'center',width:'auto',padding:'2%',height:'5vh',marginLeft:'2%',borderRadius:15,fontWeight:'bold',fontSize:15,fontFamily:'revert',borderRadius:9,marginRight:'3%'}}  >
            Save  &  Exit
           </Paper>
       </div>

        <div className={classes.rightMiddle}>
          
         <div style={{fontWeight:400,fontFamily:'inherit',fontSize:20,marginBottom:'3%'}}> Uplode 5 pictures</div>
         <div>
         <Grid container spacing={0}  >
       
           
           <Grid item xs={12}  >
           <DropzoneArea
          
            acceptedFiles={['image/*']}
            dropzoneText={"Drop an image here or click on next Button"}
            onChange={handleFiles}
            filesLimit={5-count}
            style={{height:300}}
           
            />
           </Grid>
          
           </Grid></div>
         </div>

         
        
         <LinearProgress  variant='determinate' value={85}  sx={{ backgroundColor: `white`,"& .MuiLinearProgress-bar": {backgroundColor: `black`,height:'0.1rem'}}} />
       
     
         <div style={{ display:'flex', flexDirection:'row',justifyContent:'space-between',  paddingTop:sm?'6%':'2%', paddingLeft:'4%', paddingRight:'4%'}}>
          <Paper elevation={24}>
            <Button onClick={()=>{navigate('/vendoramenities')}} style={{background:'black'}} fullWidth variant='contained' >back</Button>
          </Paper>
          
          <Paper elevation={24} >
            <Button onClick={handleNext} style={{background:'black'}} fullWidth variant='contained' >next</Button>
          </Paper>

          </div>

        </Grid>
      </Grid>
      
   
  );

}