import { Divider,Button,TextField,Grid, Paper} from "@mui/material"
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputAdornment from "@mui/material/InputAdornment"
import { useEffect, useState } from 'react';
import { useStyles } from './LoginCss';
import Swal from "sweetalert2";
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { postData } from "../Api/ServerServices";
import {  useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';


export default function LoginNumberVerifecation(props){

    const classes=useStyles()
    const navigate=useNavigate()
    const dispatch=useDispatch()
    
    
   

    ///// dialogMobile///
    const [open,setOpen]=useState(props.status)
    const [mobileNo,setMobileNo]=useState('')
    const[otpGen,setOtpGen]=useState('')
    
    ///// dialogOtp ////
    const [openOtp,setOpenOtp]=useState(false)
    const[getInputOtp,setInputOtp]=useState('')
    const[message,setMessage]=useState('')

    ////// dialogVender /////
    const [openVendor,setOpenVendor]=useState(false)
    const [firstName,setFirstName]=useState('')
    const [lastName,setLastName]=useState('')
    const [emailId,setEmailId]=useState('')
    // const [moibleNumber,setMobileNumber]=useState('')
    const [dob,setDob]=useState('')
    const [messageVendor,setVendorMessage]=useState('')
    const [error,setError]=useState({})

    const handleError=(input,value)=>{
      setError((prev)=>({...prev,[input]:value}))
   }

   const validation=()=>{
      var isValid=true

        if(mobileNo.length!==10 )
        {  
          handleError('mobileNo','plz enter 10 digit mobile number')
          isValid=false
        }
        else
        {
         if(mobileNo>=6000000000 && mobileNo<=9999999999 )
          {
             isValid=true  
          }
          else if (mobileNo>=1000000000 && mobileNo<=5999999999 )
          {
            handleError('mobileNo',JSON.stringify(mobileNo)+' plz enter  mobile number in b/w 6000000000 to 9999999999')
            isValid=false
          }
          else
          {
            handleError('mobileNo',JSON.stringify(mobileNo)+'this is not valid mobile no. plz enter valid mobile no. ')
            isValid=false
          }
        }
       
        return isValid
   }

   const validationForDetails=()=>{
    var isValid=true
    if(!firstName)
    {
      handleError('firstName','plz enter First name ')
      isValid=false
    }
    if(!lastName)
    {
      handleError('lastName','plz enter last name ')
      isValid=false
    }
    if(!dob)
    {
      handleError('dob','plz enter date of birth ')
      isValid=false
    }
    if(!emailId)
    {
      handleError('emailId','plz enter emailid ')
      isValid=false
    }
   
    return isValid
   }



    useEffect(function(){
      setOpen(props.status)
    },[props.status])

      const handleClose=()=>{
        props.setStatus(false)
      }
    
      const generateOtp=()=>{
        var otp=parseInt(Math.random()*8999)+1000
        setOtpGen(otp)
        alert(otp)
       }
    
      const handleContinue=()=>{
        if(validation())
      { setOpenOtp(true)
       generateOtp()
       props.setStatus(false)}
      }
    

    const dialogMobile=()=>{
        return(
        <Paper>
            
            
            <Dialog
                open={open}
                fullScreen={props.fullScreen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    "& .MuiDialog-container": {
                      "& .MuiPaper-root": {

                        borderRadius:3 // Set your width here
                      },
                    },
                  }}
            >
                <DialogTitle>
                    <div className={classes.dialogTitle}>Login or sign up</div>
                    
                </DialogTitle>  <Divider/>
    
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                       <div className={classes.dialogWelcomeTitle}> Welcome to Abode</div>
                    </DialogContentText>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                <TextField  fullWidth label='mobile no.'  error={error.mobileNo?true:false}  helperText={error.mobileNo} onFocus={()=>handleError('mobileNo',null)} onChange={(event)=>setMobileNo(event.target.value)}  variant="outlined"
                      InputProps={{
                                  startAdornment: (
                                  <InputAdornment position="start">  +91  </InputAdornment> ), }} 
                         />
                </Grid>
    
                <Grid item xs={12}>
                   <div className={classes.dialogText}>We'll call or text you to confirm your number. Standard message and data rates apply.</div>
                </Grid>
    
                <Grid item xs={12}>
                <Button fullWidth variant="contained" style={{fontWeight:700,textTransform:'capitalize', backgroundColor:'#E31C5F', color:'#fff', padding:10, borderRadius:8,marginBottom:'2%'}} onClick={handleContinue} >Continue</Button>
                </Grid>
                </Grid>
                </DialogContent>
                
            </Dialog>
          
        </Paper>
        )
    }


    const CheckOtp=(event)=>{

        var inputOtp='' 
        //alert(document.getElementById('first').value)
        if(document.getElementById('first').value.length==1)
        {
          document.getElementById('second').focus()
          inputOtp+=document.getElementById('first').value
        }
         if(document.getElementById('second').value.length==1)
        {
          document.getElementById('third').focus()
          inputOtp+=document.getElementById('second').value
        }
         if(document.getElementById('third').value.length==1)
        {
          document.getElementById('fourth').focus()
          inputOtp+=document.getElementById('third').value
        }
         if(document.getElementById('fourth').value.length==1)
        {
          inputOtp+=document.getElementById('fourth').value
          setInputOtp(inputOtp)
        }
       }

       const handleSubmit=async()=>{
        
        if(parseInt(otpGen)==parseInt(getInputOtp))
        { setOpenOtp(false)
          var result=await postData('vendor/search_vendor_mobileno',{mobileno:mobileNo})
          if(result.status)
          {
            dispatch({type:"ADD_VENDOR",payload:[mobileNo,result.data]})
            
            var vp=await postData("vendor/search_vendor_property",{mobileno:mobileNo})
            if(vp.status)
            { 
              dispatch({type:"ADD_DB_VENDORPROP",payload:[mobileNo,vp.data]})
              navigate(props.url)
            }
            else
            {
              alert('fail to search vendor properties')
            }
          }
          else
          {
            setOpenVendor(true)
          }
          
        }
        else
        {   setOpenOtp(false)
           
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Otp Incorrect',
                showConfirmButton: false,
                timer: 1500,
                
              })
        }
       }
    

    const handleCloseOtp=()=>{
        setOpenOtp(false)
    }

    const dialogOtp=()=>{
        return(
        <div>
            <Dialog
                open={ openOtp}
                onClose={handleCloseOtp}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    "& .MuiDialog-container": {
                      "& .MuiPaper-root": {
                        borderRadius:3 // Set your width here
                      },
                    },
                  }}
            >
              <DialogTitle>
                  <div className={classes.dialogTitle}>Confirm your number</div>
                    
              </DialogTitle>  <Divider/>
  
              <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                <div>
                  Enter the code we've sent via SMS to +91{mobileNo}:
                </div>
                  </DialogContentText>
              <Grid container spacing={2}>
              
              <Grid item xs={3}>
              <TextField id='first' onChange={(event)=>CheckOtp(event)}  variant="outlined"  color='success' />
                </Grid>

                <Grid item xs={3}>
                <TextField id='second' onChange={(event)=>CheckOtp(event)}  variant="outlined"  color='success' />
                </Grid>

                <Grid item xs={3}>
                <TextField id="third" onChange={(event)=>CheckOtp(event)}  variant="outlined"  color='success' />
               </Grid>

                <Grid item xs={3}>
                <TextField id="fourth" onChange={(event)=>CheckOtp(event)}  variant="outlined"  color='success' />
                
              </Grid>
              <Grid item xs={12}>
                 <Button onClick={handleSubmit} variant="contained" style={{fontWeight:700,textTransform:'capitalize', backgroundColor:'#E31C5F', color:'#fff', padding:10, borderRadius:8,marginBottom:'2%'}} fullWidth >Submit</Button>
              </Grid>
  
              <Grid item xs={12}>
                  <div className={classes.dialogText}>Haven't received a code? More Options</div>
              </Grid>
  
              <Grid item xs={12}>
                <div className={classes.otpErrorMessage}>
                  {message}
                </div>
  
              </Grid>
  
              </Grid>
  
              </DialogContent>
              
            </Dialog>
        </div>
        )
    }
   
    const handleVendorClose=()=>{
        setOpenVendor(false)
    }

    

    const handleVenderSubmit=async()=>{

      if(validationForDetails())

     { var body={emailid:emailId,firstname:firstName,lastname:lastName,dob:dob,mobileno:mobileNo}
      var result=await postData("vendor/add_vendors",body)

      if(result.status)
      {
        dispatch({type:"ADD_VENDOR",payload:[mobileNo,body]})

        var vp=await postData("vendor/search_vendor_property",{mobileno:mobileNo})
        if(vp.status)
        { setOpenVendor(false)
          dispatch({type:"ADD_DB_VENDORPROP",payload:[mobileNo,vp.data]})
         
            navigate(props.url)
          
         
        }
      
       
      }
      else
      {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Vendor not regestor',
          showConfirmButton: false,
          timer: 1500,
          
        })
      }}

    }


    const dialogVendor=()=>{
        return(
        <div>
            <Dialog
                open={openVendor}
                onClose={handleVendorClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    "& .MuiDialog-container": {
                      "& .MuiPaper-root": {
                        borderRadius:3 // Set your width here
                      },
                    },
                  }}
            >
                <DialogTitle>
                    <div className={classes.dialogTitle}>Finish signing up</div>
                    
                </DialogTitle>  <Divider/>

                <DialogContent>
                    
              <Grid container spacing={2}>

               <Grid item xs={12}>
               <TextField label="First Name" id="custom-css-outlined-input" size='small' fullWidth 
                 onChange={(event)=>setFirstName(event.target.value)}
                 variant='outlined'
                 error={error.firstName?true:false}  helperText={error.firstName} onFocus={()=>handleError('firstName',null)}
                InputProps={{
                  startAdornment: (
                   <InputAdornment position="start">
                   <AccountCircle />
                   </InputAdornment>
                 ),
               }}  
             />
            </Grid>

            <Grid item xs={12}>
            <TextField label="Last Name" id="custom-css-outlined-input" size='small' fullWidth 
                onChange={(event)=>setLastName(event.target.value)}
                error={error.lastName?true:false}  helperText={error.lastName} onFocus={()=>handleError('lastName',null)}
              
                InputProps={{
                  startAdornment: (
                   <InputAdornment position="start">
                   <AccountCircle />
                   </InputAdornment>
                 ),
              }}  
             />
             <div style={{fontSize:13,marginTop:'1%',marginBottom:'1%'}} >
              Make sure it matches the name on your government ID
            </div>
            </Grid>

            

           
          
            <Grid item xs={12}>
            <TextField label="Mobile Number" id="custom-css-outlined-input" size='small' fullWidth 
                value={"+91-"+mobileNo}
                disabled
                color='error'
                InputProps={{
                  startAdornment: (
                   <InputAdornment position="start">
                  <CallIcon />
                   </InputAdornment>
                 ),
              }}  
             />   
                <div style={{fontSize:13,marginTop:'1%',marginBottom:'1%'}} >
              Make sure it's your Otp number
              </div> 
            </Grid>
            <Grid item xs={12}>
                <TextField
                    size='small'
                    id="date"
                    label="DOB"
                    fullWidth
                    error={error.dob?true:false}  helperText={error.dob} onFocus={()=>handleError('dob',null)}
              
                    onChange={(event)=>setDob(event.target.value)}
                    variant='outlined'   
                    type="date" 
                    InputLabelProps={{
                      shrink:true, 
                    }} 
                />
                 <div style={{fontSize:13,marginTop:'1%',marginBottom:'1%'}} >
                 To sign up,you need to be at least 18. your birthday won't be shared with other people who use Abord
                 </div>

                 
            </Grid>  

            <Grid item xs={12}>
            <TextField label="Email Id" id="custom-css-outlined-input" size='small' fullWidth 
                 error={error.emailId?true:false}  helperText={error.emailId} onFocus={()=>handleError('emailId',null)}
                onChange={(event)=>setEmailId(event.target.value)}
                InputProps={{
                  startAdornment: (
                   <InputAdornment position="start">
                   <EmailIcon />
                   </InputAdornment>
                 ),
              }}  
             />
              <div style={{fontSize:13,marginTop:'1%',marginBottom:'1%'}} >
              We'll email your trip conformations and receipts.
            </div>
            <div style={{fontSize:13,marginTop:'4%'}} >
                 By selecting <span style={{fontWeight:'bold'}}>Agree and Continue</span>, i agree to Abord's <u style={{color:'#4834d4',fontWeight:'bold'}}>Terms of Service.Payments Terms of service</u>,and <u style={{color:'#4834d4',fontWeight:'bold'}}>Nonddiscriminaton Policy</u>.and acknowledge the <u style={{color:'#4834d4',fontWeight:'bold'}}>Privacy Policy</u>
                 </div>
            </Grid>
            
            <Grid item xs={12}>
                <div  style={{backgroundColor:'#E31C5F',borderRadius:15,marginTop:'1%',width:'100%',height:'45px',display:'flex',justifyContent:'center',alignItems:'center',color:'white'}} fullWidth 
                onClick={handleVenderSubmit} >Agree and Submit</div>
            </Grid>

            <Grid item xs={12}>
              <div className={classes.otpErrorMessage}>
                  {messageVendor}
              </div>
            </Grid>

        </Grid>

          </DialogContent>
               
            </Dialog>
        </div>
        )
    }

   

    return(<div>
     
          {dialogMobile()}
         {dialogOtp()}
         {dialogVendor()}
      
         
    </div>)
}