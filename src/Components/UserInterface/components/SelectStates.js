import React,{createRef,useEffect, useState} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Paper,useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { getData, serverURL } from "../../Api/ServerServices";
import Skeleton from '@mui/material/Skeleton';

export default function SelectStates(props){

    var sliderRef=createRef()
    const theme = useTheme();

    
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));
    const md = useMediaQuery(theme.breakpoints.down('md'));

    const [statesList,setStatesList]=useState([])
    const [isLoading,setIsLoading]=useState(true)
    

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: sm?5:md?6:lg?10:10,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6000,
        arrows:false
      };

      const fetchAllStates=async()=>{
        var result=await getData('userInterface/displayallstates')
        setIsLoading(false)
         setStatesList(result.data)
         
     }
  
     useEffect(function(){
        fetchAllStates()
     },[])

     const handleClick=(item)=>{
       props.setStateid(item.stateid)
       props.function(item.stateid)
     }
    
    const showImages=()=>{
        return statesList.map((item)=>{
            return(<div onClick={()=>handleClick(item)}>
                <div  style={{cursor:'pointer',width:'100%',height:40}}>
                <img src={`${serverURL}/images/${item.picture}`} width={sm?'50%':'35%'} height='100%'  />
                </div>
                 <div style={{fontSize:sm?11:'',width:sm?'30%':'',cursor:'pointer',}} >{item.statename}</div>
            </div>)
        })
    }
  
    const loading=()=>{
        return(<div >
        <Skeleton variant='circular' style={{width:sm?30:40,height:sm?30:40,marginLeft:'10%'}} />
        <Skeleton variant="text" sx={{ fontSize:sm?'2rem': '1rem',width:'60%' }} />
    </div>)
    }


    const handleBackClick=()=>{
        sliderRef.current.slickPrev()
    }

    const handleForwardClick=()=>{
        sliderRef.current.slickNext()
    }

      return(
        <div style={{position:'relative',paddingLeft:'4%'}}>

        <Paper elevation={24} style={{cursor:'pointer',position:'absolute',top:'30%',left:'1%',zIndex:1,width:sm?20:30,height:sm?20:30,borderRadius:24,background:'#fff',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <ArrowBackIosNewIcon onClick={handleBackClick} style={{color:'#000',width:sm?20:''}}/>
            </Paper>

            {isLoading?<>
         <Slider {...settings} ref={sliderRef} style={{display:'flex',flexDirection:'row'}} >
            {loading()}{loading()}{loading()}{loading()}{loading()}{loading()}{loading()}{loading()}{loading()}{loading()}{loading()}{loading()}{loading()}{loading()}
         </Slider>
            </>:<>
            <Slider {...settings} ref={sliderRef} style={{display:'flex',flexDirection:'row'}} >
            {showImages()}
         </Slider>
            </>}
        
        
        
        <Paper elevation={24} style={{cursor:'pointer',position:'absolute',top:'30%',right:3,zIndex:1,width:sm?20:30,height:sm?20:30,borderRadius:24,background:'#fff',display:'flex',alignItems:'center',justifyContent:'center'}}>
        < ArrowForwardIosIcon onClick={handleForwardClick} style={{color:'#000',width:sm?20:''}}/>
            </Paper>
        
       </div>
      )
}  
