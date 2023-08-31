import { Paper,useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import {  postData } from "../../Api/ServerServices";
import { useEffect, useState } from "react";
import ImageComponent from "./ImageComponent";
import Skeleton from '@mui/material/Skeleton';

import { useSelector,useDispatch } from 'react-redux';

export default function SelectCity(props){
    
  
  var dispatch=useDispatch()
  
   var cid = props.select
  
 

    const theme = useTheme();
    
    const sm = useMediaQuery(theme.breakpoints.down('sm'));

  
    const [isLoading,setIsLoading]=useState(true)
    const [cityList,setCityList]=useState([])
    var cityid=''
   try
    {

        if(cid)
        {
            cityid=cid
            
        }
        else
        {
            cityid=props.stateid
        }
           
        
    }
    catch(e)
    {
        
    }
  
    
    useEffect(function(){
        fetchAllCities()
    },[props.stateid])


    const fetchAllCities=async()=>{
        var body={stateid:cityid}
        var result=await postData('userInterface/displayallcities_by_stateid',body)
        setIsLoading(false)
        setCityList(result.data)
       
    }

    var distance=[125,560,378,26,120,456,120,230,420,456,345,125,378,974]


    const showState=()=>{
        return cityList.map((item)=>{
            return(
              <div  style={{width:sm?'46%':"23%",padding:sm?'2%':'1%'}} >
                <Paper   elevation={0} style={{borderRadius:15,padding:'1%'}}>
               <div style={{width:sm?165:300,height:sm?165:300,borderRadius:15,background:'#dfe6e9'}} >
               <ImageComponent url={props.url}  picture={item.picture} cityid={item.cityid}  />
                </div>
               <div  style={{fontFamily:'poppins',fontWeight:'bolder',padding:'2%',fontSize:sm?12:17 ,paddingBottom:'5%'}} >
                {item.cityname}&nbsp;,&nbsp;{item.statename}<br/>
                <font style={{fontSize:sm?11:14,fontFamily:'poppins',color:'gray',fontWeight:100}}>{distance[parseInt(Math.random()*(distance.length-1))]}  kilometers away<br/>
                dd/mm/yyyy</font>
               </div>
               </Paper>
            </div>)
        })
    }

    const loader=()=>{
               return(
              <div  style={{width:sm?'46%':"23%",padding:sm?'2%':'1%'}} >
                <Paper   elevation={0} style={{borderRadius:15,padding:'1%'}}>
               <div style={{width:'100%'}} >
               <Skeleton variant="rectangular" style={{width:sm?165:300,height:sm?165:300,borderRadius:15}} />
              </div>
               <div  style={{fontFamily:'poppins',fontWeight:'bolder',padding:'2%',fontSize:sm?12:17 ,paddingBottom:'5%'}} >
               <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                <font style={{fontSize:sm?11:14,fontFamily:'poppins',color:'gray',fontWeight:100}}>
               <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
             </font>
               </div>
               </Paper>
            </div>)    
    }

   
   return(<div style={{display:'flex',flexWrap:'wrap',flexDirection:'row',justifyContent:'center',paddingTop:'1%'}}>

    {isLoading?<>
        {loader()}{loader()} {loader()}{loader()} {loader()}{loader()} {loader()}{loader()} {loader()}{loader()}
        </>
   
    :
    <>{showState()}</>
    }
    
   

    
   
   </div>)
}