import { useState } from 'react';
import {Button,Grid} from "@mui/material"
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useStyles } from './VendorCss';
import LoginNumberVerifecation from '../MyComponents/LoginNumberVerifecation.js';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';





const defaultTheme = createTheme();

export default function Vendor() {

    const classes=useStyles()
    const navigate=useNavigate()
    const [status,setStatus]=useState(false)


    
    const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const md = useMediaQuery(theme.breakpoints.down('md'));
  const lg = useMediaQuery(theme.breakpoints.down('lg'));
   
  var vendorData=useSelector(state=>state.vendor)
  var vendor=Object.values(vendorData)[0]
  
  var isLogin=''
  if (JSON.stringify(vendor)!=undefined)
  {  
    isLogin=vendor.mobileno
  }
  else 
  { 
    isLogin=''
  }
  const handleClickOpen=()=>{
    {isLogin?
      navigate('/vendorproperties')
      :
      setStatus(true)}
   
  }
 
  
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: sm?'45vh':'70vh'}}>
        <CssBaseline />
        <Grid
          item
          xs={0}
          sm={6}
          md={6}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={6} md={6} component={Paper} elevation={6} square>
        <div className={classes.sideDiv}>
                <div className={classes.textHeadStyle}>Try hosting on<br/> Abode
                </div>

                <div className={classes.textSubStyle}>Join us. We'll help you every step of the way.
                </div>

                <div>
                    <Button variant="contained" style={{fontWeight:700,textTransform:'capitalize', backgroundColor:'#E31C5F', color:'#fff', padding:10, width:110, borderRadius:8}} onClick={handleClickOpen}>Let's go!</Button>
                </div>
            </div>
        </Grid>
      </Grid>
      <LoginNumberVerifecation status={status} setStatus={setStatus} url={'/vendorproperties'} nextPage={'/vendorproperties'} />
    </ThemeProvider>
  );

}