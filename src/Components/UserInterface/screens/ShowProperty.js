import Header from "../components/Header"
import Footer from "../components/footer/Footer"
import { useMediaQuery} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import ViewProperty from "../components/ViewProperty"
import { useLocation } from "react-router-dom";
import { postData } from "../../Api/ServerServices";
import { useEffect, useState } from "react";
import UserIntroduction from "../components/UserIntroduction";

export default function ShowProperty(){
   
    const theme = useTheme();
    const location=useLocation()
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    
    const [open,setOpen]=useState(false)

    var  propertyback=location.state.propertyback
    var propertyData=''
   
    if(propertyback!=null)
    {
        propertyData=propertyback
    }
    else
    {
        propertyData=location.state.property
    }

    var city=JSON.parse(propertyData.address)
    var cityId=Object.values(city)[2]
    
    const searchingCityState=(city_state)=>{
        
    }
   
    return(<div style={{width:'100wv'}} >
        <div style={{marginBottom:sm?63:78}}>
        <Header searchfn={searchingCityState} elevation={1} paddingLeft={'13%'} paddingRight={sm?'':78} setOpen={setOpen} />
        </div>
        
        <UserIntroduction open={open} setOpen={setOpen} right={'11%'} />
        <div style={{height:'auto',display:'flex',position:'sticky',padding:sm?'2%':'1%',paddingLeft:sm?'':'13%',paddingRight:sm?'':'13%'}}>
         <ViewProperty propertyData={propertyData} cityId={cityId} />
        </div>

        <div style={sm!==true?{paddingRight:'6%',paddingLeft:'9%',background:'#ecf0f1'}:{}} >
            <Footer/>
        </div>
    </div>)
}