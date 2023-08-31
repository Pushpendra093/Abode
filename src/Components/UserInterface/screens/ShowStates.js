import Header from "../components/Header"
import Footer from "../components/footer/Footer"
import { Paper,useMediaQuery,AppBar,Toolbar,} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import SelectStates from "../components/SelectStates"
import SelectCity from "../components/SelectCity"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import UserIntroduction from "../components/UserIntroduction";

export default function ShowStates(){
   
    const theme = useTheme();
    const location=useLocation()
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const [stateid,setStateid]=useState('')
    
    const [open,setOpen]=useState(false)

   

    var cid=''


  
    if(cid)
    {
        cid=location.state.cid
       
    }

 
   

    useEffect(function(){
        
    
    },[])

   
    
    const searchingCityState=(city_state)=>{}
    const handle=()=>{ }
   
    return(<div style={{width:'100wv'}} >
        <div style={{marginBottom:sm?63:78}}>
        <Header searchfn={searchingCityState} elevation={0} paddingLeft={'6%'} paddingRight={'1%'} setOpen={setOpen} />
        </div>
        <UserIntroduction open={open} setOpen={setOpen} right={'4%'}  />
       
        <AppBar elevation={0} style={{top:sm?56:70,color:'#fff',width:'100%',background:'#fff'}}>
        <Paper variant='outlined' style={{padding:sm?0:6,paddingLeft:sm?'':'5%',paddingRight:sm?'':'5%',paddingTop:'1%'}}>
        <SelectStates setStateid={setStateid} function={handle} />
        </Paper>
        </AppBar>
        <div style={{height:'auto',padding:sm?'2%':'1%',paddingLeft:sm?'':'5%',paddingRight:sm?'':'5%',marginTop:sm?'35%':'9%'}}>
         <SelectCity stateid={stateid} url={'/propertyscreen'} select={cid}  />
        </div>

        <div style={sm!==true?{paddingRight:3,paddingLeft:'4%',background:'#ecf0f1'}:{}} >
          <Footer/>
        </div>
    </div>)
}