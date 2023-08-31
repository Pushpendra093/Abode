import { Box, Paper,useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import {  postData } from "../../Api/ServerServices";
import { useEffect, useState } from "react";
import ImageComponent from "./ImageComponent";
import ImagePropertyComponent from "./ImagePropertyComponent";
import Skeleton from '@mui/material/Skeleton';
import { useNavigate } from "react-router-dom";

export default function SelectProperties(props){
    
   

    const theme = useTheme();
    const navigate=useNavigate()
    const sm = useMediaQuery(theme.breakpoints.down('sm'));

  
    
   

    var distance=[125,560,378,26,120,456,120,230,420,456,345,125,378,974]


    const showState=()=>{
        return props.propertiesList.map((item)=>{
         
            return(<>
              {item.status==='completed'?
              <div  style={{width:sm?'46%':"23%",padding:sm?'2%':'1%'}} >
                  
                   <Paper     elevation={0} style={{borderRadius:15,padding:'1%'}}>
                   <div style={{width:sm?165:300,height:sm?165:300,borderRadius:15,background:'#dfe6e9'}} >
                   <ImagePropertyComponent   item={item}  cityid={item.cityid} url={props.url}  />
                    </div>
                   <div   style={{fontFamily:'poppins',fontWeight:'bolder',padding:'2%',fontSize:sm?12:17 ,paddingBottom:'5%',overflow:'clip',width:'80%'}} >
                   {item.title}<br/>
                  
                    <font style={{fontSize:sm?11:14,fontFamily:'poppins',color:'gray',fontWeight:100,display:'flex',flexDirection:'column'}}>
                      <div >{item.placedescription}</div> 
                       <div >{distance[parseInt(Math.random()*(distance.length-1))]}  km away</div>
                      <div ><font style={{fontWeight:1000,color:'#000'}} >&#8377;{item.offerprice} night</font>  </div>
                     
                    </font>
                   </div>
                   </Paper>
                
              
            </div>:''}</>)
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

    {props.isLoading?<>
        {loader()}{loader()} {loader()}{loader()} {loader()}{loader()} {loader()}{loader()} {loader()}{loader()}
        </>
   
    :
    <>{showState()}</>
    }
    
   

    
   
   </div>)
}