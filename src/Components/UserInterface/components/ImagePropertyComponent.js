import React,{createRef, useState} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Avatar, Paper,useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { serverURL } from "../../Api/ServerServices";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {  useNavigate } from "react-router-dom";

import IconButton from '@mui/material/IconButton';

export default function ImagePropertyComponent(props){

     var item2=props.item

    
     
    
    var Images=JSON.parse(item2.pictures)
    var pictures=Object.values(Images)
    

    var sliderRef=createRef()
    var navigate=useNavigate()
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));

    const [selectIndex,setSelectIndex]=useState(0)
    
    const [selectOption,setSelectOption]=useState('')
    
    const [selectHeart,setSelectHeart]=useState('')

    var settings = {
        dots: false,
        appendDots: dots =><ul style={{marginBottom:'11%'}} > {dots }</ul>,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false
      };

 
  
    
    const showImages=()=>{
        return pictures.map((item)=>{
            return(<div  onClick={()=>{navigate(props.url,{state:{property:item2}})}}   onMouseOver={()=> handleMouse(2)} onMouseOut={()=> handleMouse(3)} style={{width:'100%',height:'auto'}} >
                <img variant='square'  src={`${serverURL}/images/${item}`} style={{width:'100%',height:sm?164:300,borderRadius:15}}/>
            </div>)
        })
    }

     const handleBackClick=()=>{
        sliderRef.current.slickPrev()
    }

    const handleForwardClick=()=>{
        sliderRef.current.slickNext()
    }

    const handleMove=(item)=>{
        sliderRef.current.slickGoTo(item)
        setSelectIndex(item)
    }

    const handleMouse=(item)=>{
       setSelectOption(item)
    }

    const handleClickHeart=()=>{
        if(selectHeart===3)
        {setSelectHeart(4)}
        else
        {setSelectHeart(3)}
     }


      return(
        <div  style={{position:'relative'}}>


         <Slider {...settings} ref={sliderRef} >
          {showImages()}
         </Slider>

         <div onClick={handleClickHeart} onMouseOver={()=> handleMouse(props.cityid)} style={{cursor:'pointer',position:'absolute',top:'3%',right:'4%',zIndex:1,width:sm?25:35,height:sm?25:35,borderRadius:24,background:'transparent',display:'flex',alignItems:'center',justifyContent:'center'}}>
               {selectHeart===3?<>
               <FavoriteIcon  style={{color:'red',width:sm?'90%':'70%'}}  />
               </>:
               <IconButton style={{color:'white'}} >
                <FavoriteBorderIcon  icon={{color:'pink'}} style={{width:sm?'85%':'100%'}}/>
               </IconButton>}
               </div>
        

         { lg!==true?
            <>{selectOption===2?<>
                <Paper elevation={24} onMouseOver={()=> handleMouse(2)} style={{position:'absolute',top:'50%',left:'1%',zIndex:1,width:30,height:30,borderRadius:24,background:'#fff',display:'flex',alignItems:'center',justifyContent:'center'}}>
               <ArrowBackIosNewIcon  onClick={handleBackClick}  style={{color:'#000',width:'50%'}}/>
               </Paper>

               <Paper elevation={23}  onMouseOver={()=> handleMouse(2)} style={{position:'absolute',top:'50%',right:'1%',zIndex:1,width:30,height:30,borderRadius:24,background:'#fff',display:'flex',alignItems:'center',justifyContent:'center'}}>
             < ArrowForwardIosIcon onMouseOver={()=> handleMouse(2)} onClick={handleForwardClick} style={{color:'#000',width:'50%'}}/>
            </Paper>
            </>:<></>}</>
            :
            <>
             <Paper elevation={24} onMouseOver={()=> handleMouse(2)} style={{position:'absolute',top:'50%',left:'1%',zIndex:1,width:25,height:25,borderRadius:24,background:'#fff',display:'flex',alignItems:'center',justifyContent:'center',opacity:sm?0.6:''}}>
               <ArrowBackIosNewIcon  onClick={handleBackClick}  style={{color:'#000',width:'60%'}}/>
               </Paper>

               <Paper elevation={23}  onMouseOver={()=> handleMouse(2)} style={{position:'absolute',top:'50%',right:'1%',zIndex:1,width:25,height:25,borderRadius:24,background:'#fff',display:'flex',alignItems:'center',justifyContent:'center',opacity:sm?0.6:''}}>
             < ArrowForwardIosIcon onMouseOver={()=> handleMouse(2)} onClick={handleForwardClick} style={{color:'#000',width:'60%'}}/>
            </Paper></>
        }

       

            <div style={{position:'absolute',bottom:sm?'1%':'2%',left:sm?'30%':'28%',zIndex:1,width:sm?70:120,height:25,borderRadius:24,display:'flex',alignItems:'center',justifyContent:'center'}}>
        {Array.from({length:5}).map((index)=>{
            return(
                <FiberManualRecordIcon onClick={()=>handleMove(index)} style={index===selectIndex?{color:'#fff',background:'transparent',width:'10%'}:{color:'#fff',background:'transparent',width:'10%',opacity:0.5}} /> )
        })}
            </div>

       
       
        
       </div>
      )
}  
