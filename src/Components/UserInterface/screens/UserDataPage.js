import * as React from 'react';
import { styled } from '@mui/system';
import { Tabs } from '@mui/base/Tabs';
import { TabsList } from '@mui/base/TabsList';
import { TabPanel } from '@mui/base/TabPanel';
import { buttonClasses } from '@mui/base/Button';
import { Tab, tabClasses } from '@mui/base/Tab';
import { AppBar,Toolbar,useMediaQuery, Avatar, Grid, Divider,TextField, Paper,Button} from "@mui/material";
import { useState } from "react";
import { useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import LanguageIcon from '@mui/icons-material/Language';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import UserIntroduction from '../components/UserIntroduction';

import { useSelector,useDispatch } from "react-redux";



export default function UserDataPage(props) {

  const theme = useTheme();
  const navigate=useNavigate()

  var vendorData=useSelector(state=>state.vendor)
var vendor=Object.values(vendorData)[0]
  

  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const [status,setStatus]=useState(false)
  const [open,setOpen]=useState(false)

  const handleMenu=()=>{
    setOpen(true)
  }

  const Header2=()=>{
    return(
      <AppBar variant='outlined' position='fixed' style={{background:'#fff',width:'100%',height:sm?60:80,display:'flex',justifyContent:'center'}}>
      <Toolbar >

          <div style={{display:'flex',flexDirection:'row',width:'100%'}}>

      <div style={{cursor:'pointer',width:sm?'70%':'85%',alignItems:'center',color:'#000',fontFamily:'Poppins',fontSize:27,fontWeight:'bolder',display:'flex',flexDirection:'row',justifyContent:'flex-start'}}>
       <div onClick={()=>{navigate('/home')}} ><Avatar src={`/assets/abodeLogo.png`} style={{width:45,height:45}} /></div> 
       <div onClick={()=>{navigate('/home')}}  >bode </div>
      </div>
       
      <div onClick={()=>{ navigate('/vendorscreen')}} style={{color:'#fff',background:'#E31C5F',border:'1px solid',height:matches?35:50,borderRadius:9,display:'flex',alignItems:'center',justifyContent:'center',width:matches?`15%`:'10%',fontSize:13,fontWeight:'bold',fontFamily:'Poppins',cursor:'pointer'}}>
     { matches?'Host':'Become a host'}
      </div>
     
     <div style={{color:'#000',width:sm?'15%':'10%',height:'100%',display:'flex',justifyContent:matches?'flex-end':'center',paddingLeft:matches?0:'5%',paddingRight:sm?'4%':''}}>
     
     {matches?<div><PersonIcon   onClick={handleMenu} style={{cursor:'pointer'}}/></div>:
      <Avatar onClick={handleMenu} style={{width:70,borderRadius:20,background:'#fff',color:'#000',border:'1px solid grey'}} variant='rounded' ><MenuIcon/>&nbsp;<PersonIcon   style={{cursor:'pointer'}}/></Avatar>
    
     }</div>

      </div>
      </Toolbar>
  </AppBar>
    )
}

const buttomStrip=()=>{
  return(<div style={{display:'flex',flexDirection:'row',alignItems:'center',fontSize:15,height:'100%'}}>
    <Grid container >
      <Grid item xs={12} lg={6} md={6}  >
     <div style={{paddingTop:sm?'7%':'',flexDirection:sm?'column':'row',display:'flex'}}>
      <div>© 2023 Abode, Inc.</div>
      <div style={{paddingTop:sm?'2%':''}} >{sm?'':<>&nbsp; &nbsp;</>} Privacy . Terms . Sitemap . Company details</div>
      </div>
      </Grid>

      <Grid item xs={12} lg={6} md={6} style={{background:'',justifyContent:sm?'start':'flex-end',display:'flex',fontSize:15,fontWeight:700,paddingBottom:sm?'8%':'',paddingTop:sm?'6%':''}} >

      <div ><LanguageIcon style={{width:21,height:21}}/> &nbsp; </div>
      <div  > &nbsp;English (IN)</div>
      <div>&nbsp; &nbsp; &nbsp;₹ &nbsp;INR &nbsp;&nbsp;</div>
      <div > &nbsp;<FacebookIcon style={{width:21,height:21}}/></div>
      <div > &nbsp; <TwitterIcon style={{width:21,height:21}}/></div>
      <div > &nbsp; <InstagramIcon style={{width:21,height:21}}/></div>
      </Grid>
    </Grid>
     
  </div>)
}


const profile=()=>{
  return(<div style={{paddingLeft:sm?'4%':'15%',paddingRight:sm?'4%':'15%',marginBottom:sm?'14%':'3%'}}>
       <Grid container spacing={8}>
        <Grid item lg={7} xs={12}>
          <div style={{fontSize:35,fontWeight:600,paddingBottom:'6%',paddingTop:'5%'}} >Personal info</div>

                        <Paper elevation={0} style={{fontWeight:'initial'}} >
                        <div style={{fontSize:17,display:'flex',justifyContent:'space-between',padding:8,paddingTop:'4%',fontWeight:50}} ><span>Ligal name<br/><font style={{fontWeight:400,color:'gray'}}>{vendor.firstname+" "+vendor.lastname}</font></span><span ><u>Edit</u></span></div>
                        <Divider style={{padding:'1%'}} />
                        <div style={{fontSize:17,display:'flex',justifyContent:'space-between',padding:8,paddingTop:'4%',fontWeight:50}} ><span>Email address<br/><font style={{fontWeight:400,color:'gray'}}>{vendor.emailid}</font></span><span ><u>Edit</u></span></div>
                        <Divider style={{padding:'1%'}} />
                        <div style={{color:'black',fontSize:17,display:'flex',justifyContent:'space-between',padding:8,paddingTop:'4%',fontWeight:300}} ><span>Phone number<br/><font style={{fontWeight:400,color:'gray'}}>{vendor.mobileno}</font></span><span ><u>Edit</u></span></div>
                        <Divider style={{padding:'1%'}} />
                        <div style={{color:'black',fontSize:17,display:'flex',justifyContent:'space-between',padding:8,paddingTop:'4%',fontWeight:300}} ><span>Government Id<br/><font style={{fontWeight:400,color:'gray'}}>Not provided</font></span><span ><u>Edit</u></span></div>
                        <Divider style={{padding:'1%'}} />
                        <div style={{color:'black',fontSize:17,display:'flex',justifyContent:'space-between',padding:8,paddingTop:'4%',fontWeight:300}} ><span>Address<br/><font style={{fontWeight:400,color:'gray'}}>Not provided</font></span><span ><u>Edit</u></span></div>
                        <Divider style={{padding:'1%'}} />
                        <div style={{color:'black',fontSize:17,display:'flex',justifyContent:'space-between',padding:8,paddingTop:'4%',fontWeight:300}} ><span>Emergency contact<br/><font style={{fontWeight:400,color:'gray'}}>{vendor.mobileno}</font></span><span ><u>Edit</u></span></div>
                        <Divider style={{padding:'1%'}} />
                       
                        </Paper>
                       
        </Grid>
        {sm?'':
          <Grid item lg={5} xs={0}>
          <Paper variant='outlined' style={{marginTop:'28%',borderRadius:9,width:'80%'}} >

            <div style={{padding:'7%'}}>
           <Avatar src={`/assets/shield.png`} variant='square' style={{width:50,height:50,paddingBottom:'7%'}} />
          <div style={{fontSize:23,width:'100%',paddingBottom:'7%',fontWeight:700}}>Why isn’t my info shown here?</div>
          <div style={{fontSize:16,paddingBottom:'0%',color:'gray'}}>We’re hiding some account details to protect your identity.</div>
          </div>

          <Divider  style={{margin:'6%'}}/>

          <div style={{padding:'7%'}}>
           <Avatar src={`/assets/lock.png`} variant='square' style={{width:50,height:50,paddingBottom:'7%'}} />
          <div style={{fontSize:23,width:'100%',paddingBottom:'7%',fontWeight:700}}>Which details can be edited?</div>
          <div style={{fontSize:16,color:'gray'}}>Contact info and personal details can be edited. If this info was used to verify your identity, you’ll need to get verified again the next time you book – or to continue hosting.</div>
          </div>

          </Paper>
        </Grid>
   
        }
          </Grid>
  </div>)
}

const LoginSecurity=()=>{
  return(<div style={{paddingLeft:'15%',paddingRight:'15%',marginBottom:'3%'}}>
  <Grid container spacing={8}>
   <Grid item lg={7}>
     <div style={{fontSize:35,fontWeight:600,paddingBottom:'6%',paddingTop:'5%'}} >Login & security</div>
     <div style={{fontSize:20,fontWeight:600,paddingBottom:'6%',padding:8,paddingTop:'5%'}}>Login</div>   
     <div style={{fontSize:17,display:'flex',justifyContent:'space-between',padding:8,paddingTop:'4%',fontWeight:50}} ><span>Password<br/><font style={{fontWeight:400,color:'gray'}}>Last updated 9 days ago</font></span><span style={{color:'green'}}>Update</span></div>
     <Divider style={{padding:'4%'}} />

     <div style={{fontSize:20,fontWeight:600,paddingBottom:'6%',padding:8,paddingTop:'5%'}}>Social accounts</div>   
     <div style={{fontSize:17,display:'flex',justifyContent:'space-between',padding:8,paddingTop:'7%',fontWeight:50}} ><span>Facebook<br/><font style={{fontWeight:400,color:'gray'}}>Not Connected</font></span><span style={{color:'green'}}>Connect</span></div>
     <Divider style={{padding:'3%'}} />

  
     <div style={{fontSize:17,display:'flex',justifyContent:'space-between',padding:8,paddingTop:'7%',fontWeight:50}} ><span>Google<br/><font style={{fontWeight:400,color:'gray'}}>Connected</font></span><span style={{color:'green'}}>Disconnect</span></div>
     <Divider style={{padding:'4%'}} />

     <div style={{fontSize:20,fontWeight:600,paddingBottom:'6%',padding:8,paddingTop:'5%'}}>Account</div>   
     <div style={{fontSize:17,display:'flex',justifyContent:'space-between',padding:8,paddingTop:'7%',fontWeight:50}} ><span>Deactivate your account<br/><font style={{fontWeight:400,color:'gray'}}></font></span><span style={{color:'green'}}>Deactivate</span></div>
     <Divider style={{padding:'0%'}} />
     
                          
   </Grid>
   <Grid item lg={5}>
     <Paper variant='outlined' style={{marginTop:'28%',borderRadius:9,width:'80%'}} >

       <div style={{padding:'7%'}}>
      <Avatar src={`/assets/shield.png`} variant='square' style={{width:50,height:50,paddingBottom:'7%'}} />
     <div style={{fontSize:23,width:'100%',paddingBottom:'7%',fontWeight:700}}>Let's make your account more secure</div>
     <div style={{fontSize:16,paddingBottom:'0%',color:'gray'}}>We’re always working on ways to increase safety in our community. That’s why we look at every account to make sure it’s as secure as possible.</div>
     </div>

    

     </Paper>
   </Grid>
  </Grid>
</div>)
}


  return (
    <div>
      <div style={{marginBottom:sm?'1%':'6%'}}>{Header2()}</div>
      <UserIntroduction open={open} setOpen={setOpen} right={'1%'} />
    <Tabs defaultValue={0}>
      <StyledTabsList>
        <StyledTab value={0}>Profile</StyledTab>
        <StyledTab value={1}>{sm?'security':'Login & security'} </StyledTab>
      </StyledTabsList>
      <StyledTabPanel value={0}>{profile()}</StyledTabPanel>
      <StyledTabPanel value={1}>{LoginSecurity()}</StyledTabPanel>
    </Tabs>
    <div style={{background:'#ecf0f1',height:sm?'auto':70,paddingLeft:'5%',paddingRight:'5%',marginTop:sm?'8%':'',Button:0}} >{buttomStrip()}</div>

    </div>
  );
}

const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#80BFFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

const StyledTab = styled(Tab)`
  font-family: 'IBM Plex Sans', sans-serif;
  color: #000;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  background-color: transparent;
  width: 10%;
  padding: 10px 12px;
  margin: 6px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content:center ;

  &:hover {
    background-color: #E31C5F;
  }

  &:focus {
    color: #E31C5F;
    outline: 3px solid #E31C5F;
  }

  &.${tabClasses.selected} {
    background-color: #fff;
    color: #E31C5F;
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StyledTabPanel = styled(TabPanel)(
  ({ theme }) => `
  width: 97%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  padding: 20px 12px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  border-radius: 12px;
 
  `,
);

const StyledTabsList = styled(TabsList)(
  ({ theme }) => `
  min-width: 400px;
  background-color: #fff;
  border-radius: 12px;
  margin-bottom: 16px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  `,
);