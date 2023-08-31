import React,{createRef} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Paper,useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { serverURL } from "../../Api/ServerServices";

export default function Banners(props){
    var sliderRef=createRef()
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const sm = useMediaQuery(theme.breakpoints.up('sm'));
    var settings = {
        dots:matches?false: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        arrows:false,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
      };

      var images=[
        {id:1,images:'ad1.jpg'},
        {id:1,images:'ad2.jpg'},
        {id:1,images:'ad3.jpg'},
        {id:1,images:'ad4.jpg'},
              ]
    
    const showImages=()=>{
        return images.map((item)=>{
            return(<div  >
                <img src={`${serverURL}/images/${item.images}`} width='100%' style={{borderRadius:15}} />
            </div>)
        })
    }

     const handleBackClick=()=>{
        sliderRef.current.slickPrev()
    }

    const handleForwardClick=()=>{
        sliderRef.current.slickNext()
    }

    

      return(
        <div style={{position:'relative'}}>

        <Paper style={{position:'absolute',top:'45%',left:'1%',zIndex:1,width:25,height:25,borderRadius:24,background:'#fff',opacity:0.7,display:'flex',alignItems:'center',justifyContent:'center'}}>
        <ArrowBackIosNewIcon onClick={handleBackClick}  style={{color:'#000',width:'60%'}}/>
            </Paper>

            
        
         <Slider {...settings} ref={sliderRef} >
          {showImages()}
         </Slider>
        
         <Paper style={{position:'absolute',top:'45%',right:'1%',zIndex:1,width:25,height:25,borderRadius:24,background:'#fff',opacity:0.7,display:'flex',alignItems:'center',justifyContent:'center'}}>
        < ArrowForwardIosIcon onClick={handleForwardClick} style={{color:'#000',width:'60%'}}/>
            </Paper>
        
       </div>
      )
}  
