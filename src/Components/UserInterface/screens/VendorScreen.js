import Vendor from "../../vendorScreen/Vendor"
import Header from "../components/Header"
import Footer from "../components/footer/Footer"

import { Avatar, Grid, Paper,useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';

export default function VendorScreen(){

    
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));


   


    return(<div >
        
        <div style={{marginBottom:sm?'10%':73}}>
        <Header paddingLeft={'3%'} />
        </div>
        
        <Vendor/>
        <div>
            <div style={{fontFamily:'Poppins',fontSize:sm?27:44,fontWeight:'bolder',display:'flex',justifyContent:'center',letterSpacing:-1,margin:'2%',paddingTop:sm?'5%':'2%'}}>
            Abode it easily with Abode Setup
            </div>
            <img src={sm?`assets/vendorpage4.jpg`:`assets/vendorpage2.jpg`} style={{width:'100%',paddingRight:sm?'':'8%',paddingLeft:sm?'':'8%',display:'unset',justifyContent:'center'}} />
        </div>

        <div style={{padding:sm?0:'2%',marginLeft:'7%',marginRight:'7%',marginBottom:'4%',paddingTop:sm?'5%':'2%',paddingBottom:sm?'5%':'2%'}}>
        <Grid container spacing={sm?2:4} >
            
          <Grid item xs={12} md={4} lg={4} style={{fontFamily:'Poppins'}}>
           <div style={{fontSize:sm?15:17,fontWeight:'bold'}} >One-to-one guidance from a Superhost</div>
           <div style={{fontSize:sm?13:15,paddingBottom:'2%',padding:'1%',paddingRight:'5%'}}>We’ll match you with a Superhost in your area, who’ll guide you from your first question to your first guest – by phone, video call or chat.</div>
          </Grid>

          <Grid item xs={12} md={4} lg={4} style={{fontFamily:'Poppins'}}>
           <div style={{fontSize:sm?15:17,fontWeight:'bold'}} >An experienced guest for your first booking</div>
           <div style={{fontSize:sm?13:15,paddingBottom:'2%',padding:'1%',paddingRight:'5%'}}>For your first booking, you can choose to welcome an experienced guest who has at least three stays and a good track record on Abode</div>
          </Grid>

          <Grid item xs={12} md={4} lg={4} style={{fontFamily:'Poppins'}}>
           <div style={{fontSize:sm?15:17,fontWeight:'bold'}} >Specialised support from Abode</div>
           <div style={{fontSize:sm?13:15,paddingBottom:'2%',padding:'1%',paddingRight:'5%'}}>New Hosts get one-tap access to specially trained Community Support agents who can help with everything from account issues to billing support.</div>
          </Grid>
        </Grid>

        
        </div>
        

        <div style={{background:'#ecf0f1',paddingLeft:'8%',paddingRight:'8%',paddingTop:'5%',paddingBottom:'5%',width:'100%',height:'90%'}}>
        <Grid container  >
            
            <Grid item xs={12} lg={6} >
                
                <Avatar src={`assets/vendorpage.jpg`} variant='square' style={{width:'100%',height:'100%',borderTopLeftRadius:20,borderBottomLeftRadius:sm?"":20,borderTopRightRadius:sm?20:''}} />
      
            </Grid>
           
            <Grid item xs={12} lg={6} style={{fontFamily:'Poppins',background:'white',justifyContent:'center',display:'flex',flexDirection:'column',borderBottomLeftRadius:sm?20:'',borderTopRightRadius:sm?'':20,borderBottomRightRadius:20,padding:sm?'9%':''}}>
             <div style={{fontWeight:'bolder',fontSize:sm?21:42}} >Still have questions?</div>
             <div style={{fontSize:sm?14:18,paddingBottom:'2%'}}>Get answers from an experienced Superhost near you</div>
             <div style={{border:'1px solid',fontWeight:'bold',width:sm?170:190,padding:sm?'3%':'2%',fontSize:12,borderRadius:10}}>Match with a Superhost</div>
            </Grid>

        </Grid>
        </div>


       <Footer/>
    </div>)
}