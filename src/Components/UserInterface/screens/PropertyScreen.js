import Header from "../components/Header"
import Footer from "../components/footer/Footer"
import { Paper,useMediaQuery,AppBar,Toolbar,} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import SelectStates from "../components/SelectStates"
import SelectCity from "../components/SelectCity"
import { useEffect, useState } from "react"
import { getData, postData } from "../../Api/ServerServices"
import SelectProperties from "../components/SelectProperties";
import { useNavigate } from "react-router-dom";

import { useSelector,useDispatch } from 'react-redux';
import UserIntroduction from "../components/UserIntroduction";

export default function PropertyScreen(propes){
   
    var navigate=useNavigate()
    const theme = useTheme();
    var dispatch=useDispatch()
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const [propertiesList,setPropertiesList]=useState([])
    const [isLoading,setIsLoading]=useState(true)
    const [stateid,setStateid]=useState('')
    const [open,setOpen]=useState(false)
   
    const viewCity=(cid)=>{
      navigate('/showstates',{state:{cid:cid}})

    }

    useEffect(function(){
        fetchAllCities()
    },[])

    const fetchAllCities=async()=>{
        var result=await getData('userInterface/displayallproperties') 
        setIsLoading(false)
        setPropertiesList(result.data)
    }

 

    
    
   
    return(<div style={{width:'100wv'}} >
        <div style={{marginBottom:sm?63:78}}>
        <Header  elevation={0} paddingLeft={'6%'} paddingRight={'1%'} setOpen={setOpen} />
        </div>
        <UserIntroduction open={open} setOpen={setOpen} right={'4%'} />
        <AppBar elevation={0} style={{top:sm?56:70,color:'#fff',width:'100%',background:'#fff'}}>
        <Paper variant='outlined' style={{padding:sm?0:6,paddingLeft:sm?'':'5%',paddingRight:sm?'':'5%',paddingTop:'1%'}}>
        <SelectStates setStateid={setStateid} function={viewCity} />
        </Paper>
        </AppBar>
        <div style={{height:'auto',padding:sm?'2%':'1%',paddingLeft:sm?'':'5%',paddingRight:sm?'':'5%',marginTop:sm?'35%':'9%'}}>
         <SelectProperties propertiesList={propertiesList} isLoading={isLoading} url={'/showproperty'}  />
        </div>

        <div style={sm!==true?{paddingRight:3,paddingLeft:'4%',background:'#ecf0f1'}:{}} >
          <Footer/>
        </div>
    </div>)
}