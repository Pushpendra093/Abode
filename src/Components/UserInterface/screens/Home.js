import Vendor from "../../vendorScreen/Vendor"
import Header from "../components/Header"
import Banners from "../components/Banners"
import Footer from "../components/footer/Footer"
import State from "../components/State"

import { Paper,useMediaQuery,Grid,Avatar } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import VendorAdd from "../components/VendorAdd";
import { useNavigate } from "react-router-dom"
import UserIntroduction from "../components/UserIntroduction"
import { useState } from "react"

export default function Home(){
   
    const theme = useTheme();
    const navigate=useNavigate()
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    
    const [open,setOpen]=useState(false)
    
    const picture=()=>{
        return( <div  style={{cursor:'pointer',background:'#ecf0f1',paddingLeft:'8%',paddingRight:'8%',paddingTop:'5%',paddingBottom:'5%',width:'100%',height:'90%'}}>
        <Grid container   >
            <Grid item xs={12} lg={6} >
                
                <Avatar src={`assets/vendorpage.jpg`} variant='square' style={{width:'100%',height:'100%',borderTopLeftRadius:20,borderBottomLeftRadius:sm?"":20,borderTopRightRadius:sm?20:''}} />
      
            </Grid>
           
            <Grid item xs={12} lg={6} style={{fontFamily:'Poppins',background:'white',justifyContent:'center',display:'flex',flexDirection:'column',borderBottomLeftRadius:sm?20:'',borderTopRightRadius:sm?'':20,borderBottomRightRadius:20,padding:sm?'9%':''}}>
             <div style={{fontWeight:'bolder',fontSize:sm?21:42}} >Still have questions?</div>
             <div style={{fontSize:sm?14:18,paddingBottom:'2%'}}>Get answers from an experienced Superhost near you</div>
             <div style={{border:'1px solid',fontWeight:'bold',width:sm?170:190,padding:sm?'3%':'2%',fontSize:12,borderRadius:10}}>Match with a Superhost</div>
            </Grid>

        </Grid>
        </div>)
    }

    return(<div>
        <div>
        <Header  paddingLeft={'2%'}  paddingRight={sm?'':'1%'} setOpen={setOpen} />
        </div>
        <UserIntroduction open={open} setOpen={setOpen} right={'1%'}    />
       
        <div style={{padding:'3%',paddingTop:sm?'19%':'7%'}}>
        <Banners  />
        </div>
        <div style={{width:'100%',padding:'2%'}}>
         <State/>
        </div>
       <div>
       <Vendor/>
       </div>
        
        <div style={{padding:sm?'9%':'5%'}}>
            <VendorAdd/>
        </div>
        {picture()}
      
        <div >
            <Footer/>
        </div>
    </div>)
}