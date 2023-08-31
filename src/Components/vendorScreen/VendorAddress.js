import { useState,useEffect } from 'react';
import {Button,Grid,Divider, Avatar, TextField,MenuItem,Select} from "@mui/material"
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useStyles } from './VendorAddressCss';
import { getData,postData,serverURL } from "../Api/ServerServices"

import { useNavigate,useLocation, json } from 'react-router-dom';

import { useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useSelector,useDispatch } from 'react-redux';

import VendorNavigation from '../MyComponents/VendorNavigation';
import PrevNext from '../MyComponents/PrevNext';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from "@mui/material/InputAdornment"
import SearchIcon from '@mui/icons-material/Search';
import { Unarchive } from '@mui/icons-material';




export default function VendorAddress() {
  
     var navigate=useNavigate()
     var location=useLocation()
     var dispatch=useDispatch()
     var vendorData=useSelector(state=>state.vendor)
     var vendor=Object.values(vendorData)[0]
    

     var vendorAddress=useSelector((state)=>state.address)
    //alert(""+JSON.stringify(vendorAddress)=='{}')

     var vendorDBData=useSelector(state=>state.vendorDBData)
   
   

     
     
   


     const classes=useStyles()
     const theme = useTheme();
   const sm = useMediaQuery(theme.breakpoints.down('sm'));
   const md = useMediaQuery(theme.breakpoints.down('md'));
   const lg = useMediaQuery(theme.breakpoints.down('lg'));

   const [statesList,setStatesList]=useState([])
   const [cityList,setCityList]=useState([])
   
   const [stateId,setStateId]=useState('')
   const [cityId,setCityId]=useState('')

   const [address,setAddress]=useState('')
   const [flatNo,setFlatNo]=useState('')
   const [landmark,setLandmark]=useState('')
   const [pinCode,setPinCode]=useState('')

   const [open,setOpen]=useState(true)

   const [error,setError]=useState({})

   const handleError=(input,value)=>{
      setError((prev)=>({...prev,[input]:value}))
   }

   const validation=()=>{
      var isValid=true

      if(!stateId)
      {
        handleError('stateId','plz fill property state')
        isValid=false
      }
      if(!cityId)
      {
        handleError('cityId','plz fill property city')
        isValid=false
      }
      if(!landmark)
      {
        handleError('landmark','plz fill property landmark')
        isValid=false
      }
      if(!pinCode)
      {
        handleError('pinCode','plz fill property pincode')
        isValid=false
      }
      if(!address)
      {
        handleError('address','plz fill property Address')
        isValid=false
      }
      if(!flatNo)
      {
        handleError('flatNo','plz fill property flate no. / floor no.')
        isValid=false
      }
       return isValid
        
         }
 
  
  const fetchAllStates=async()=>{
   var result=await getData('states/displayallstates')
   setStatesList(result.data)
}

const fetchAllCities=async(sid)=>{
   var body={stateid:sid}
   var result=await postData('cities/displayallcities_by_stateid_for_address',body)
   setCityList(result.data)
}


const fillStates=()=>{
 return statesList.map((item)=>{

   return  <MenuItem value={item.stateid} >{item.statename}</MenuItem>

 })
}
const fillCity=()=>{
   return cityList.map((item)=>{
  
     return  <MenuItem value={item.cityid} >{item.cityname}</MenuItem>
  
   })
  }

 useEffect(function(){
    fetchAllStates()
    showAddress()

 },[])

 const handleChangeState=(event)=>{
   setStateId(event.target.value)
   fetchAllCities(event.target.value)
 }

 const handleAddress=()=>{
   if(validation())
  { var body = {mobileno:vendor.mobileno,stateid:stateId,cityid:cityId,address:address,flatno:flatNo,landmark:landmark,pincode:pinCode}
   dispatch({type:'ADD_ADDRESS',payload:[vendor.mobileno,body]})
   setOpen(false)}
}

const showAddress = () => {
   console.log(vendorDBData);
   if (JSON.stringify(vendorAddress)!="{}") {
     var address=Object.values(vendorAddress)[0];
   //   alert("Address: "+JSON.stringify(address))
 

     setStateId(address.stateid);
     setCityId(address.cityid);
     setAddress(address.address);
     setLandmark(address.landmark);
     setPinCode(address.pincode);
     setFlatNo(address.flatno);
     
   } 
   else if (JSON.stringify(vendorDBData)!="{}") {
     var vendorDB = Object.values(vendorDBData)[0];

     if (vendorDB.address!=null) {
       var address = JSON.parse(vendorDB.address);

       setStateId(address.stateid);
       setCityId(address.cityid);
       setAddress(address.address);
       setLandmark(address.landmark);
       setPinCode(address.pincode);
       setFlatNo(address.flatno);
       
     }
   }
 };

   
  
 const addressFill=()=>{
   return(
      <Dialog
      open={open}
      
      sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {

              borderRadius:3 // Set your width here
            },
          },
        }}
  >
      <DialogTitle>
          <div style={{fontFamily:'poppins',fontSize:22,fontWeight:'bold'}}>Fill property Address</div>
          
      </DialogTitle>  <Divider/>

      <DialogContent>
          <DialogContentText id="alert-dialog-description">
            
          </DialogContentText>
          <Grid container spacing={2}>

          <Grid item xs={12}>
          <FormControl fullWidth>
                     <InputLabel >States</InputLabel>
                         <Select
                          
                          value={stateId}
                          label="States"
                          onChange={ handleChangeState}
                          error={error.stateId?true:false}  helperText={error.stateId} onFocus={()=>handleError('stateId',null)}
                         >
                        {fillStates()}
                        </Select>
                  </FormControl>
            </Grid>

            <Grid item xs={12}>
            <FormControl fullWidth>
                     <InputLabel >cities</InputLabel>
                         <Select
                          
                          value={cityId}
                          label="Cities"
                          onChange={(e)=>{setCityId(e.target.value)}}
                          error={error.cityId?true:false}  helperText={error.cityId} onFocus={()=>handleError('cityId',null)}
                        
                         >
                        {fillCity()}
                        </Select>
                  </FormControl>
            </Grid>

            <Grid item xs={12}>
               <TextField error={error.address?true:false}  helperText={error.address} onFocus={()=>handleError('address',null)} value={address} onChange={(e)=>{setAddress(e.target.value)}} fullWidth variant='outlined' label='address/street' />
            </Grid>
            <Grid item xs={12}>
               <TextField error={error.flatNo?true:false}  helperText={error.flatNo} onFocus={()=>handleError('flatNo',null)} value={flatNo} onChange={(e)=>{setFlatNo(e.target.value)}} fullWidth variant='outlined' label='flate no./floor' />
            </Grid>
           
            
            <Grid item xs={12}>
               <TextField error={error.landmark?true:false}  helperText={error.landmark} onFocus={()=>handleError('landmark',null)} value={landmark} onChange={(e)=>{setLandmark(e.target.value)}} fullWidth variant='outlined' label='landmark' />
            </Grid>
            <Grid item xs={12}>
               <TextField error={error.pinCode?true:false}  helperText={error.pinCode} onFocus={()=>handleError('pinCode',null)} value={pinCode} onChange={(e)=>{setPinCode(e.target.value)}} fullWidth variant='outlined' label='pincode' />
            </Grid>
            
            <Grid item xs={12}>
               <Button size='large' onClick={handleAddress} variant='contained' fullWidth >Looks Good</Button>
            </Grid>
         </Grid>
      </DialogContent>
      
  </Dialog>
   )
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
           Where's your place <br/> location ?
        </div> 

        </Grid>
           </>:''
        }


        


        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square  >
        
        <div className={classes.rightTop}  >
          <VendorNavigation vendorName={vendor.firstname+" "+vendor.lastname} myurl='/addproperties' validation={validation} data={{ address: JSON.stringify(Object.values(vendorAddress)[0]),mobileno: vendor.mobileno, opr: "ADD_VENDOR_ADDRESS",msg:'plz fill property address'}}/>
        </div>

        <div className={classes.rightMiddle}>
        <div style={{width:"100%",height:'100%',display:'flex',position:'relative'}}  >

         <div  style={{position:'absolute',top:140,left:30,width:'90%'}}  >
         <div style={{display:'flex',justifyContent:'center',width:'100%',paddingLeft:3,paddingRight:3}}>
          
          <OutlinedInput
            
            id="filled-adornment-weight"
            onClick={()=>setOpen(true)}
            endAdornment={<InputAdornment position="end"><SearchIcon  /></InputAdornment>}
            aria-describedby="outlined-weight-helper-text"

            inputProps={{
              'aria-label': 'weight',
            }}
            
            
            
            style={{
              borderRadius:30,
              background:'white',
              border:'1px solid'
              ,width:sm?'95%':'70%'
              
              
            }}
          />
         
            </div>

         </div>
        <img src={sm?`/assets/map3.png`:`/assets/map2.webp`} style={{width:'100%',height:'100%'}} />
      </div>
         </div>
     
         {addressFill()}
          
         
        <div className={classes.rightButtom}>
           <PrevNext backUrl="/vendorthirdpage" nextUrl='/vendorguest' value={42} validation={validation} data={{ address: JSON.stringify(Object.values(vendorAddress)[0]),mobileno: vendor.mobileno, opr: "ADD_VENDOR_ADDRESS",msg:'plz fill property address properly'}} />
        </div>

        </Grid>
      </Grid>
      
   
  );

}