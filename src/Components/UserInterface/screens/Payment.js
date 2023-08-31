import { AppBar,Toolbar,useMediaQuery, Avatar, Grid, Divider,TextField, Paper,Button} from "@mui/material";
import { useEffect, useState } from "react";
import { useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useLocation } from "react-router-dom";
import { serverURL } from "../../Api/ServerServices";
import LanguageIcon from '@mui/icons-material/Language';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LoginNumberVerifecation from "../../MyComponents/LoginNumberVerifecation.js";
import { useDispatch } from "react-redux";
import UserIntroduction from "../components/UserIntroduction";
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from "react-redux";



export default function Payment(props){
   
    const theme = useTheme();
    const navigate=useNavigate()
    const location=useLocation()
    const dispatch=useDispatch()

    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const [statu,setStatu]=useState(false)
    const [open,setOpen]=useState(false)
    
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

    var propertyData=location.state.propertyData
    

    var Price= propertyData.offerprice * 5
    var Gst=(Price*18)/100
    var Total= (Price + 19765 )+Gst

    var picture=propertyData.pictures
    var pictures=JSON.parse(picture)[1]


   const handlePay=(item)=>{
    {isLogin?
      navigate('/makepayment')
      :
      dispatch({type:'ADD_USER',payload:[Total]})
      setStatu(true)
    }
   
   }
   const handleMenu=()=>{
    setOpen(true)
  }

    const handleBack=(item)=>{
        navigate('/showproperty',{state:{propertyback:item}})
    }



    const propertyImage=()=>{
      return(
        <Paper elevation={0} style={{width:'100%'}} >
                    <div style={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start'}} >
                <div style={{width:sm?'34%':'40%',display:'flex',padding:'4%',paddingLeft:sm?'8%':''}} >
                <img src={`${serverURL}/images/${pictures}`} variant='square' style={{width:sm?140:120,height:sm?100:120,borderRadius:7}} />
                </div>
                <div style={{display:'flex',flexDirection:'column',width:sm?'67%':'60%',overflow:'clip',paddingTop:'4%',fontWeight:400,fontSize:16,color:'black'}} >
                <div style={{fontSize:13,color:'grey',fontWeight:400}} >Entire {propertyData.subpropertyname}</div>
                <div>{propertyData.title}</div>
                <div>{propertyData.placedescription}</div>
                </div>
                </div>
                    </Paper>
      )
    }

    const price=()=>{
      return(
          <div style={{width:'100%',fontSize:15,fontWeight:550,color:'black',paddingTop:sm?'':'6%'}}>
                  <div style={{fontWeight:800,fontSize:22,paddingBottom:'4%'}}>Price details</div>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                  <span><u>₹{propertyData.offerprice} x 5 nights</u></span><span>{Price}</span>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',paddingTop:'3%'}}>
                  <span><u>Abode service fee</u></span><span>₹19,765</span>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',paddingTop:'3%'}}>
                  <span><u>GST tax</u></span><span>{Gst}</span>
                </div>
                <Divider style={{paddingTop:'8%'}}/>
                <div style={{display:'flex',justifyContent:'space-between',fontWeight:'bold',paddingTop:'7%',paddingBottom:'0%'}}>
                  <span>Total (INR)</span><span>₹{Total}</span>
                </div>
                
          
      </div>)
    }


    const Header=()=>{
        return(
            <AppBar variant='outlined' position='sticky' style={{background:'#fff',width:'100%',height:sm?60:80,display:'flex',justifyContent:'center'}}>
            <Toolbar >
            <div onClick={()=>{navigate('/home')}} style={{cursor:'pointer',alignItems:'center',color:'#000',fontFamily:'Poppins',fontSize:27,fontWeight:'bolder',display:'flex',flexDirection:'row'}}>
             <div><Avatar src={`/assets/abodeLogo.png`} style={{width:45,height:45}} /></div> 
             <div >bode </div>
            </div>
            </Toolbar>
        </AppBar>
        )
    }

    const Header2=()=>{
      return(
        <AppBar variant='outlined' position='sticky' style={{background:'#fff',width:'100%',height:sm?60:80,display:'flex',justifyContent:'center'}}>
        <Toolbar >
            <div style={{display:'flex',flexDirection:'row',width:'100%'}}>

        <div  style={{cursor:'pointer',width:'85%',alignItems:'center',color:'#000',fontFamily:'Poppins',fontSize:27,fontWeight:'bolder',display:'flex',flexDirection:'row',justifyContent:'flex-start'}}>
         <div onClick={()=>{navigate('/home')}}><Avatar src={`/assets/abodeLogo.png`} style={{width:45,height:45}} /></div> 
         <div onClick={()=>{navigate('/home')}}>bode </div>
        </div>
         
        <div onClick={()=>{ navigate('/vendorscreen')}} style={{color:'#fff',background:'#E31C5F',border:'1px solid',height:matches?35:50,borderRadius:9,display:'flex',alignItems:'center',justifyContent:'center',width:matches?`17%`:'10%',fontSize:13,fontWeight:'bold',fontFamily:'Poppins',cursor:'pointer'}}>
       { matches?'Host':'Become a host'}
        </div>
       
       <div style={{color:'#000',width:'10%',height:'100%',display:'flex',justifyContent:matches?'flex-end':'center',paddingLeft:matches?0:'5%',paddingRight:''}}>
       
       {matches?<div><PersonIcon   onClick={handleMenu} style={{cursor:'pointer'}}/></div>:
        <Avatar onClick={handleMenu} style={{width:70,borderRadius:20,background:'#fff',color:'#000',border:'1px solid grey'}} variant='rounded' ><MenuIcon/>&nbsp;<PersonIcon  onClick={handleMenu}  style={{cursor:'pointer'}}/></Avatar>
      
       }</div>

        </div>
        </Toolbar>
    </AppBar>
      )
  }

    const middle=()=>{
        return(<div>
         
            <Paper elevation={sm?3:0} style={{color:'inherit',fontSize:sm?20:32,paddingBottom:sm?'2%':'1%',paddingTop:sm?'3%':'5%',display:'flex',flexDirection:'row',letterSpacing:.3,position:sm?'fixed':'',background:'white',width:'100%'}} >
                <div onClick={()=>handleBack(propertyData)} ><IconButton style={{color:'black'}} > <ArrowBackIosNewIcon  style={{width:sm?'65%':'70%',fontWeight:300}}/> </IconButton> </div>
                <div style={sm?{display:'flex',paddingLeft:'15%',alignItems:'center',fontWeight:700}:{fontWeight:1000}} > Confirm and pay</div>
            </Paper>
          
            <div style={{paddingLeft:sm?'':'3%',paddingRight:sm?'':'3%',paddingTop:sm?'18%':''}} > {grid()}</div>
           
        </div>)
    }


    const grid=()=>{
        return(<div>
            <Grid container >
             <Grid item xs={12} lg={6} md={6} >
                
                <Grid container spacing={1} >

                    {sm?<>
                    <grid item xs={12} style={{width:'100%'}}>
                    {propertyImage()}
                    </grid>
                    </>:<></>}

                    <Grid item xs={12} >
                        <Paper elevation={0} style={sm?{padding:'4%'}:{}} >
                        <div style={{color:'inherit',fontSize:24,padding:sm?14:'1%',paddingTop:'6%',fontWeight:900}} >Your trip</div>
                        <div style={{color:'black',fontSize:17,display:'flex',justifyContent:'space-between',padding:sm?14:8,paddingTop:sm?7:17,fontWeight:800}} ><span>Dates<br/><font style={{fontWeight:400}}>20–25 Aug</font></span><span ><u>Edit</u></span></div>
                        <div style={{color:'black',fontSize:17,display:'flex',justifyContent:'space-between',padding:sm?14:8,fontWeight:800}} ><span>Guests<br/><font style={{fontWeight:400}}>1 guest</font></span><span ><u>Edit</u></span></div>
                        </Paper>
                       {sm?'':<Divider style={{paddingTop:'4%',padding:'2%'}} />} 
                    </Grid>

                    <Grid item xs={12}>
                    {sm?
                    <Paper elevation={0} style={sm?{padding:'6%'}:{}} >
                     {price()}
                    </Paper>
                    :''}
                    </Grid>

                    <Grid item xs={12}>
                      <Paper elevation={0} style={sm?{padding:'5%'}:{}} >
                      <div style={{color:'inherit',fontSize:sm?21:24,fontWeight:800,padding:'1%'}} >Log in or sign up to book</div>
                    

                      <div onClick={()=>handlePay(true)} style={{background:'#E31C5F',marginTop:'2%',borderRadius:9,padding:14,color:'#fff',fontSize:15,fontWeight:'bold',fontFamily:'poppins',display:'flex',justifyContent:'center'}}>Log in or sign up</div>
                      
                    <div><Divider textAlign="center" style={{fontSize:13,paddingTop:'3%'}} >or</Divider></div> 

                    <div style={{display:'flex',flexDirection:'row',height:'auto',paddingTop:'5%',paddingBottom:'5%'}} >
                        <div style={{width:'33%',border:'1px solid black',borderRadius:9,marginLeft:'1%',padding:14,color:'#fff',fontSize:15,fontWeight:'bold',fontFamily:'poppins',display:'flex',justifyContent:'center'}}><img src={`/assets/facebook.png`} style={{width:22,height:22}} /></div>
                        <div style={{width:'33%',border:'1px solid black',borderRadius:9,marginLeft:'1%',padding:14,color:'#fff',fontSize:15,fontWeight:'bold',fontFamily:'poppins',display:'flex',justifyContent:'center'}}><img src={`/assets/google.png`} style={{width:26,height:26}} /></div>
                        <div style={{width:'33%',border:'1px solid black',borderRadius:9,marginLeft:'1%',padding:14,color:'#fff',fontSize:15,fontWeight:'bold',fontFamily:'poppins',display:'flex',justifyContent:'center'}}><img src={`/assets/apple.png`} style={{width:22,height:22}} /></div>
                    </div>
                    
                    <div  style={{borderRadius:9,border:'1px solid black',marginLeft:'1%',padding:sm?'5%':'3%',fontSize:15,fontWeight:'bold',fontFamily:'poppins',display:'flex',justifyContent:'center'}}>Continue with email</div>
             
                      </Paper>
                    </Grid>
                  </Grid>
              
                  
            
             </Grid>
             {sm?'':
             <Grid item xs={12} lg={6} md={6} >

             <div style={{background:'',display:'flex',justifyContent:'flex-end',height:540,padding:14,fontSize:15,fontWeight:'bold',fontFamily:'poppins'}}>
             <Paper variant='outlined' style={{width:'75%',position:'sticky',top:100,height:440,boxShadow:'0 0px 40px rgba(0,0,0,0.1)',borderRadius:8,background:'#fff'}} >
             <Toolbar style={{display:'flex',flexDirection:'column'}} >

                {propertyImage()}
                <Divider flexItem style={{paddingTop:'1%',color:'black'}}/>
                {price()}
               
             </Toolbar>
             </Paper>
             </div>
             </Grid>}
            </Grid>
        </div>)
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
   

    return(<div style={{fontFamily:'poppins',background:sm?'#ecf0f1':''}} >
       {sm?<></>:<div>{Header2()}</div>} 
       <UserIntroduction open={open} setOpen={setOpen} right={'1%'} />
        <div style={{paddingLeft:sm?'':'10%',paddingRight:sm?'':'10%'}} > {middle()}</div>
        <LoginNumberVerifecation status={statu} setStatus={setStatu} url={'/makepayment'} nextPage={'/makepayment'} />
        <Divider style={{paddingTop:sm?'':'5%'}} />
        <div style={{background:'#ecf0f1',height:sm?'auto':70,paddingLeft:'5%',paddingRight:'5%'}} >{buttomStrip()}</div>

    </div>)
}