import { AppBar, Avatar, Button, Divider, Grid, Paper,Toolbar,useMediaQuery } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState,useEffect } from "react";
import StarIcon from '@mui/icons-material/Star';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IosShareIcon from '@mui/icons-material/IosShare';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FlagIcon from '@mui/icons-material/Flag';
import { getData, serverURL,postData } from "../../Api/ServerServices";
import { useTheme } from '@mui/material/styles';
import New from "./New";
import { useNavigate } from "react-router-dom";



export default function ViewProperty(props){
  
   var propertyData=props.propertyData

  
  


   var addressData=JSON.parse(propertyData.address)
  var navigate=useNavigate()


   var Price= propertyData.offerprice * 5
   var Total= Price + 19765
   
   const theme = useTheme();
   const sm = useMediaQuery(theme.breakpoints.down('sm'));
   const md = useMediaQuery(theme.breakpoints.down('md'));
   const lg = useMediaQuery(theme.breakpoints.down('lg'));

 

    
    const [open,setOpen]=useState(false)
    const [openAmenities,setOpenAmenities]=useState(false)
    const [amenitiesList,setAmenitiesList]=useState([])
    const [openSafty,setOpenSafty]=useState(false)
    const [openHouse,setOpenHouse]=useState(false)
    const [openPolicy,setOpenPolicy]=useState(false)
    const [cityStateName,setCityStateName]=useState([])

    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const fetchCityStateNmae=async()=>{
      var result=await postData('userInterface/fatch_cityname_and_statename_by_cityid',{cityid:props.cityId})
      setCityStateName(result.data)
     
  }
  

    useEffect(function(){
      fetchAllAmenities()
      fetchCityStateNmae()
     
  },[])

  const fetchAllAmenities=async()=>{
      var result=await getData('amenitiesOption/displayalloption')
      setAmenitiesList(result.data)
  }

    const handleClose=()=>{
        setOpen(false)
    }

    const hanndleOpen=()=>{
        setOpen(true)
    }

    const handleAmenities=()=>{
      setOpenAmenities(true)
  }
  const handleAmenitiesClose=()=>{
   setOpenAmenities(false)
}

const handleSafty=()=>{
   setOpenSafty(true)
}
const handleSaftyClose=()=>{
setOpenSafty(false)
}

const handleHouse=()=>{
   setOpenHouse(true)
}
const handleHouseClose=()=>{
setOpenHouse(false)
}

const handlePolicy=()=>{
   setOpenPolicy(true)
}
const handlePolicyClose=()=>{
setOpenPolicy(false)
}

const handleReserv=()=>{
   navigate('/payment',{state:{propertyData:propertyData}})
}


const showPolicy=()=>{
   return(
       <Dialog
      
       fullScreen={fullScreen}
       open={openPolicy}
       onClose={handlePolicyClose}
       aria-labelledby="alert-dialog-title"
       aria-describedby="alert-dialog-description"
       sx={{
           "& .MuiDialog-container": {
             "& .MuiPaper-root": {
              
               borderRadius:sm?'':3 // Set your width here
             },
           },
         }}
   >
       <DialogTitle  >
          <ClearIcon onClick={handlePolicyClose} style={{width:20,height:20}} />
          <DialogContentText style={{fontFamily:'poppins',fontSize:26,fontWeight:'bolder',color:'black',paddingTop:'1%'}} >
           Cancellation policy
           </DialogContentText>
       </DialogTitle>  

       <DialogContent>
          

           <DialogContentText style={{fontFamily:'poppins',fontSize:15,paddingTop:sm?'6%':'0%',color:'black'}} >
           Before you book, make sure you're comfortable with this Host's cancellation policy. Keep in mind that Abode's <u style={{fontSize:16,color:'black'}}>Extenuating Circumstances policy</u> doesn't cover cancellations due to illness or travel disruptions caused by COVID-19.</DialogContentText>

           <DialogContentText style={{fontFamily:'poppins',fontSize:19,fontWeight:'bold',color:'black',paddingTop:'6%'}} >
           Cancel by
         </DialogContentText>
        
         <DialogContentText style={{}} >
          
          <div style={{display:'flex',flexDirection:'row',paddingTop:'3%'}}>
          <div style={{fontFamily:'poppins',fontSize:15,paddingLeft:'1%',color:'black',alignItems:'center',display:'flex',paddingRight:'8%'}}>dd/mm</div>
          <div style={{fontFamily:'poppins',fontSize:15,paddingLeft:'1%',color:'black',alignItems:'center',display:'flex'}}>
          Full refund: Get back 100% of what you paid.</div>
          </div>
          
          <Divider style={{paddingTop:'2%'}}/>

          <div style={{display:'flex',flexDirection:'row',paddingTop:'2%'}}>
          <div style={{fontFamily:'poppins',fontSize:15,paddingLeft:'1%',color:'black',alignItems:'center',display:'flex',paddingRight:'5%'}}>dd+1/mm</div>
           <div style={{fontFamily:'poppins',fontSize:15,paddingLeft:'1%',color:'black',alignItems:'center',display:'flex'}}>Partial refund: Get back every night but the first one. No refund of the first night or the service fee.</div>
          </div>
        </DialogContentText>

        <div style={{fontFamily:'poppins',fontWeight:'bold',fontSize:13,paddingLeft:'1%',paddingTop:'4%',paddingBottom:'2%',color:'black',alignItems:'center',display:'flex',}}><u>Learn more about cancellation policies</u></div>
         



       </DialogContent>
       
   </Dialog>
   )
}



    const showMore=()=>{
        return(
            <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={{
                "& .MuiDialog-container": {
                  "& .MuiPaper-root": {
                     
                    
                    borderRadius:sm?'':3 // Set your width here
                  },
                },
              }}
        >
            <DialogTitle onClick={handleClose} >
               <ClearIcon style={{width:20,height:20}} />
                
            </DialogTitle>  

            <DialogContent>
                <DialogContentText style={{fontFamily:'poppins',fontSize:26,fontWeight:'bolder',color:'black',paddingTop:'1%'}} >
                About this space
                </DialogContentText>

                <DialogContentText style={{fontFamily:'poppins',fontSize:15,paddingTop:sm?'6%':'4%',color:'black'}} >
                This spectacular 4BHK cozy villa offers a panoramic view of the pristine Pawna Lake. Forget all your worries in this serene and spacious space. Enjoy exploring the property offering myriad of spaces to spend quality time with your loved ones - a huge living room offering lake view, an alfresco dining area, a huge green lawn, a poolside sitout with greens all around
                </DialogContentText>

                <DialogContentText style={{fontFamily:'poppins',fontSize:15,paddingTop:sm?'4%':'3%',color:'black',paddingBottom:'5%'}} >
                The rooms are spacious and lively with lot of natural light and a couple of rooms offering great lake view even from the washrooms
                </DialogContentText>
            
            </DialogContent>
            
        </Dialog>
        )
    }
   
    const amenities=()=>{
      return amenitiesList.map((item)=>{
         return(<div>
         <div style={{display:'flex',flexDirection:'row',paddingTop:'6%',width:'90%',paddingLeft:'3%'}} >
            <div ><Avatar src={`${serverURL}/images/${item.icon}`} variant='square'  style={{width:40,height:40}} /></div>
            <div style={{paddingTop:'1.5%',color:'#000',paddingLeft:'4%'}}>{item.optionname}</div>
            
         </div>
         <Divider style={{width:"90%",paddingTop:'2%'}}/>
         </div>)
      })
    }
    

    const showAmenities=()=>{
      return(
          <Dialog
          fullScreen={fullScreen}
          open={openAmenities}
          onClose={handleAmenitiesClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{
              "& .MuiDialog-container": {
                "& .MuiPaper-root": {
             
                
                 
                  borderRadius:sm?'':3 // Set your width here
                },
              },
            }}
      >
          <DialogTitle  >
             <ClearIcon onClick={handleAmenitiesClose} style={{width:20,height:20}} />
             <DialogContentText style={{fontFamily:'poppins',fontSize:23,fontWeight:'bolder',color:'black',paddingTop:'1%',width:400}} >
              What this place offers
              </DialogContentText>
          </DialogTitle>  

          <DialogContent>
             

              <DialogContentText style={{height:400}} >
               {amenities()}
              </DialogContentText>
          
          </DialogContent>
          
      </Dialog>
      )
  }

  const showSafty=()=>{
   return(
       <Dialog
       fullScreen={fullScreen}
       open={openSafty}
       onClose={handleSaftyClose}
       aria-labelledby="alert-dialog-title"
       aria-describedby="alert-dialog-description"
       sx={{
           "& .MuiDialog-container": {
             "& .MuiPaper-root": {
               
               borderRadius:3 // Set your width here
             },
           },
         }}
   >
       <DialogTitle  >
          <ClearIcon onClick={handleSaftyClose} style={{width:20,height:20}} />
          <DialogContentText style={{fontFamily:'poppins',fontSize:27,fontWeight:'bolder',color:'black',paddingTop:'4%'}} >
          Safety & property
           </DialogContentText>
           <DialogContentText style={{fontFamily:'poppins',fontSize:16,color:'black',paddingTop:'1%'}} >
           Avoid surprises by looking over these important details about your Host's property.
           </DialogContentText>
       </DialogTitle>  

       <DialogContent>
       <DialogContentText style={{fontFamily:'poppins',fontSize:19,fontWeight:'bold',color:'black',paddingTop:'6%'}} >
       Safety devices
         </DialogContentText>

           <DialogContentText style={{}} >
          
             <div style={{display:'flex',flexDirection:'row',paddingTop:'3%'}}>
                <div><Avatar src={`/assets/amenities icons/carbon-monoxide.png`} variant='square' style={{width:35,height:35}} >H</Avatar></div>
                <div style={{fontFamily:'poppins',fontSize:16,paddingLeft:'1%',color:'black'}}>Carbon monoxide alarm not reported<br/><span style={{color:'gray',fontSize:13,fontWeight:200}}>The host hasn't reported a carbon monoxide alarm on the property. We suggest bringing a portable detector for your trip.</span></div>
             </div>
             
             <Divider style={{paddingTop:'3%'}}/>

             <div style={{display:'flex',flexDirection:'row',paddingTop:'4%'}}>
                <div><Avatar src={`/assets/amenities icons/fire-alarm.png`} variant='square' style={{width:35,height:35}} >H</Avatar></div>
                <div style={{fontFamily:'poppins',fontSize:16,paddingLeft:'1%',color:'black'}}>Smoke alarm not reported<br/><span style={{color:'gray',fontSize:13,fontWeight:200}}>The host hasn't reported a smoke alarm on the property. We suggest bringing a portable detector for your trip.</span></div>
             </div>
           </DialogContentText>
       
       </DialogContent>
       
   </Dialog>
   )
}


const showHousePolicy=()=>{
   return(
       <Dialog
       fullScreen={fullScreen}
       open={openHouse}
       onClose={handleHouseClose}
       aria-labelledby="alert-dialog-title"
       aria-describedby="alert-dialog-description"
       sx={{
           "& .MuiDialog-container": {
             "& .MuiPaper-root": {
               
               borderRadius:sm?'':3 ,// Set your width here,
               display:'flex',
               alignSelf:'center'
             },
           },
         }}
   >
       <DialogTitle  >
          <ClearIcon onClick={handleHouseClose} style={{width:20,height:20}} />
          <DialogContentText style={{fontFamily:'poppins',fontSize:27,fontWeight:'bolder',color:'black',paddingTop:'4%'}} >
          House rules
           </DialogContentText>
           <DialogContentText style={{fontFamily:'poppins',fontSize:16,color:'black',paddingTop:'1%'}} >
           You'll be staying in someone's home, so please treat it with care and respect.
           </DialogContentText>
       </DialogTitle>  

       <DialogContent>
       <DialogContentText style={{fontFamily:'poppins',fontSize:19,fontWeight:'bold',color:'black',paddingTop:'4%'}} >
       Checking in and out
         </DialogContentText>

           <DialogContentText style={{}} >
          
             <div style={{display:'flex',flexDirection:'row',paddingTop:'3%'}}>
                <div><Avatar src={`/assets/amenities icons/clock.gif`} variant='square' style={{width:35,height:35}} >H</Avatar></div>
                <div style={{fontFamily:'poppins',fontSize:16,paddingLeft:'1%',color:'black',alignItems:'center',display:'flex'}}>Check-in after 3:00 pm</div>
             </div>
             
             <Divider style={{paddingTop:'2%'}}/>

             <div style={{display:'flex',flexDirection:'row',paddingTop:'2%'}}>
                <div><Avatar src={`/assets/amenities icons/reception.gif`} variant='square' style={{width:35,height:35}} >H</Avatar></div>
                <div style={{fontFamily:'poppins',fontSize:16,paddingLeft:'1%',color:'black',alignItems:'center',display:'flex'}}>Self check-in with building staff</div>
             </div>
           </DialogContentText>

           <DialogContentText style={{fontFamily:'poppins',fontSize:19,fontWeight:'bold',color:'black',paddingTop:'5%'}} >
           During your stay
         </DialogContentText>
         <DialogContentText style={{}} >
          
             <div style={{display:'flex',flexDirection:'row',paddingTop:'3%',}}>
                <div><Avatar src={`/assets/amenities icons/three-friends.gif`} variant='square' style={{width:35,height:35}} >H</Avatar></div>
                <div style={{fontFamily:'poppins',fontSize:16,paddingLeft:'1%',color:'black',alignItems:'center',display:'flex'}}>14 guests maximum</div>
             </div>
           </DialogContentText>
       
       </DialogContent>
       
   </Dialog>
   )
}

  



    return(<div style={{paddingBottom:'3%'}}>

        <div style={{fontFamily:'poppins',fontSize:sm?21:25,fontWeight:1000,color:'inherit',paddingLeft:sm?'4%':''}} >{propertyData.title} </div>
       
        <div style={{paddingTop:'1%',display:'flex',flexDirection:'row',padding:sm?'4%':''}}>
         <div style={{width:'87%'}}><u >{cityStateName.cityname} 
        { cityStateName.map((item)=>{
            return(<>{item.cityname}, {item.statename},</>)
         })} India</u></div>
         {sm!=true?<>
            <div style={{width:'8%'}}><span style={{marginTop:'6%',paddingRight:'6%'}}> <IosShareIcon style={{width:17,height:17,color:'gray'}}/></span><u  >Share</u></div>
          <div style={{width:'5%'}}><span style={{marginTop:'6%',paddingRight:'6%'}}> <FavoriteBorderIcon style={{width:17,height:17,color:'gray'}}/></span><u  >Save</u></div>
       
         </>:<></>}
         </div>

        <div style={{width:'100%',height:sm?180:380,marginTop:'2%',borderRadius:13}}><New picture={propertyData.pictures} /></div>
         
         <div style={{marginTop:'3%'}}>
         <Grid container spacing={2}>

            <Grid item xs={12} lg={7} md={7}  >

            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',padding:sm?'4%':''}}>
              <div style={{fontFamily:'poppins',fontSize:sm?18:20,fontWeight:'bolder'}}>Entire home hosted by {propertyData.firstname} <br/>
               <font style={{fontSize:sm?13:15,fontWeight:100}}>14 guests.4 bedrooms.5 beds.4 bathrooms</font>
              </div>
              <div>
               <Avatar src={`/assets/profilepic.webp`} style={{width:60,height:60}} >H</Avatar>
              </div>
             </div>

             <Divider style={{paddingTop:'5%'}}/>
             
             <div style={{padding:sm?'4%':''}}>
             <div style={{display:'flex',flexDirection:'row',paddingTop:'5%'}}>
                <div><Avatar src={`/assets/amenities icons/reception.gif`} style={{width:40,height:40}} >H</Avatar></div>
                <div style={{fontFamily:'poppins',fontSize:16,fontWeight:'bold',paddingLeft:'1%'}}>Self check-in<br/><font style={{color:'gray',fontSize:13,fontWeight:100}}>You can check in with the doorperson.</font></div>
             </div>

             <div style={{display:'flex',flexDirection:'row',paddingTop:'2%'}}>
                <div><Avatar src={`/assets/amenities icons/diving-board.gif`} variant='square' style={{width:40,height:40}} >H</Avatar></div>
                <div style={{fontFamily:'poppins',fontSize:16,fontWeight:'bold',paddingLeft:'1%'}}>Dive right in<br/><font style={{color:'gray',fontSize:13,fontWeight:200}}>This is one of the few places in the area with a pool.</font></div>
             </div>

             <div style={{display:'flex',flexDirection:'row',paddingTop:'2%'}}>
                <div><Avatar src={`/assets/amenities icons/2023.gif`} variant='square'  style={{width:40,height:40}} >H</Avatar></div>
                <div style={{fontFamily:'poppins',fontSize:16,fontWeight:'bold',paddingLeft:'1%',display:'flex',alignItems:'center'}}>Free cancellation before &nbsp; dd+1/mm .</div>
             </div>
             </div>

             <Divider style={{paddingTop:'5%'}}/>


              <div style={{padding:sm?'4%':''}}>
             <div style={{paddingTop:'5%',paddingRight:'1%',fontSize:16,paddingRight:'1%'}}>
             This spectacular 4BHK cozy villa offers a panoramic view of the pristine Pawna Lake. Forget all your worries in this serene and spacious space. Enjoy exploring the property offering myriad of spaces to spend quality time with your loved ones - a huge living room offering lake view, an alfresco dining area,  a huge green lawn, a poolside sitout with greens all around
             </div>
             <div>...</div>
             <div  style={{fontFamily:'poppins',fontSize:16,fontWeight:'bolder',paddingTop:'3%'}} ><u onClick={hanndleOpen} >See more</u><ArrowForwardIosIcon style={{width:14,height:14}}/></div>
            {showMore()}
            </div>


            <Divider style={{paddingTop:'5%'}}/>
            <div style={{fontFamily:'poppins',fontSize:sm?20:22,fontWeight:'bold',paddingTop:'5%',paddingLeft:sm?'5%':md?'1%':'0%'}}>What this place offers</div>
          
            <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',padding:sm?'4%':''}}>
          
            <div style={{display:'flex',flexDirection:'row',paddingTop:'1%'}}>
                <div><Avatar src={`/assets/amenities icons/beach.gif`} style={{width:40,height:40}} >H</Avatar></div>
                <div style={{fontFamily:'poppins',fontSize:16,paddingLeft:'2%',display:'flex',alignItems:'center',width:250}}>Lake access</div>
             </div>

             <div style={{display:'flex',flexDirection:'row',paddingTop:'1%'}}>
                <div><Avatar src={`/assets/amenities icons/free-wifi.gif`} style={{width:40,height:40}} >H</Avatar></div>
                <div  style={{fontFamily:'poppins',fontSize:16,paddingLeft:'2%',display:'flex',alignItems:'center',width:250}}>Wifi</div>
             </div>

             <div style={{display:'flex',flexDirection:'row',paddingTop:'1%'}}>
                <div><Avatar src={`/assets/amenities icons/parking.gif`} style={{width:40,height:40}} >H</Avatar></div>
                <div style={{fontFamily:'poppins',fontSize:16,paddingLeft:'2%',display:'flex',alignItems:'center',width:250}}>Free parking on premises</div>
             </div>

             <div style={{display:'flex',flexDirection:'row',paddingTop:'1%'}}>
                <div><Avatar src={`/assets/amenities icons/swimming-pool (1).gif`} variant='square' style={{width:40,height:40}} >H</Avatar></div>
                <div style={{fontFamily:'poppins',fontSize:16,paddingLeft:'2%',display:'flex',alignItems:'center',width:250}}>Pool</div>
             </div>

             <div style={{display:'flex',flexDirection:'row',paddingTop:'1%'}}>
                <div><Avatar src={`/assets/amenities icons/tv.gif`} style={{width:40,height:40}} >H</Avatar></div>
                <div style={{fontFamily:'poppins',fontSize:16,paddingLeft:'2%',display:'flex',alignItems:'center',width:250}}>TV</div>
             </div>

             <div style={{display:'flex',flexDirection:'row',paddingTop:'1%'}}>
                <div><Avatar src={`/assets/amenities icons/air-conditioner.gif`} style={{width:40,height:40}} >H</Avatar></div>
                <div style={{fontFamily:'poppins',fontSize:16,paddingLeft:'2%',display:'flex',alignItems:'center',width:250}}>Air conditioning</div>
             </div>

             <div style={{display:'flex',flexDirection:'row',paddingTop:'1%'}}>
                <div><Avatar src={`/assets/amenities icons/bell.gif`} style={{width:40,height:40}} >H</Avatar></div>
                <div style={{fontFamily:'poppins',fontSize:16,paddingLeft:'2%',display:'flex',alignItems:'center',width:250}}>Carbon monoxide alarm</div>
             </div>

             <div style={{display:'flex',flexDirection:'row',paddingTop:'1%'}}>
                <div><Avatar src={`/assets/amenities icons/holi-smoke.gif`} style={{width:40,height:40}} >H</Avatar></div>
                <div style={{fontFamily:'poppins',fontSize:16,paddingLeft:'2%',display:'flex',alignItems:'center',width:250}}>Smoke Detectors</div>
             </div>

             <div onClick={handleAmenities} style={{cursor:'pointer',border:'1px solid black',fontSize:17,padding:'2%',borderRadius:9,marginTop:'4%'}} >Show all amenities</div>
             {showAmenities()}
            </div>

            <Divider style={{paddingTop:'6%'}}/>
         <div style={{fontFamily:'poppins',fontSize:20,fontWeight:'bold',marginTop:'6%',padding:sm?'4%':''}} >No reviews (yet)</div>
           <div style={{display:'flex',flexDirection:'row',paddingTop:'2%'}}>
                <div><img src={`/assets/favorite.gif`} style={{width:40,height:40}} /></div>
                <div style={{fontFamily:'poppins',fontSize:sm?15:17,paddingLeft:'1%'}}>This host has 24 reviews for other places to<br/>stay. <u style={{fontSize:sm?15:17,fontWeight:'bold',fontFamily:'poppins'}}>Show other reviews</u></div>
             </div>

             <Divider style={{paddingTop:'6%'}}/>  

           <div style={{padding:sm?'4%':''}}>
            <div style={{display:'flex',flexDirection:'row',paddingTop:'4%'}}>
            <div><img src={`/assets/profilepic.webp`} style={{width:70,height:70,borderRadius:49}}/ ></div>
            <div style={{fontFamily:'poppins',fontSize:19,paddingLeft:'1%',fontWeight:'bold',paddingTop:'1%'}}>Hosted by {propertyData.firstname}<br/><font style={{fontFamily:'poppins',fontSize:14,color:'gray'}} >Joined in {propertyData.dob}</font></div>
           </div>

          <div style={{fontFamily:'poppins',fontSize:16,paddingTop:16,display:'flex',alignSelf:'auto'}}>
         <StarIcon style={{width:22,height:22,paddingRight:6}} />
         24 Reviews
        <VerifiedUserIcon style={{width:20,height:20,paddingRight:6,paddingLeft:15}}/>
        Identity verified
        </div>   
         <div style={{fontFamily:'poppins',fontSize:16,paddingTop:'1%'}}>Response rate: 99%</div>  
        <div style={{fontFamily:'poppins',fontSize:16,paddingTop:'1%'}}>Response time: within an hour</div>  
        <div style={{border:'1px solid black',fontSize:17,padding:15,borderRadius:9,marginTop:'2%',width:100}} >Contact host</div>
        <div style={{display:'flex',flexDirection:'row',paddingTop:sm?'5%':'3%'}}>
       <div><img src={`/assets/payment.gif`} style={{width:40,height:40}} / ></div>
       <div style={{fontFamily:'poppins',fontSize:11,paddingLeft:'1%',display:'flex',alignItems:'center',width:250}}>To protect your payment, never transfer money or communicate outside of the Abode website or app.
         </div>
    </div>

</div>

            </Grid>

            <Grid  item xs={12} lg={5} md={5} style={{display:sm?'':'block',justifyContent:'center',width:'100%',marginTop:sm?48:'',height:sm?'':1450,background:''}} >
           
               
               {sm!==true?<>
                  <AppBar elevation={0} position='sticky' style={{width:'82%',top:100,marginLeft:'18%',background:'white'}}>
                <Paper variant='outlined' style={{boxShadow:'0 0px 40px rgba(0,0,0,0.1)',width:'100%',height:'auto',borderRadius:12,marginTop:'1%'}} >
                <div style={{fontSize:19,paddingLeft:'6%',paddingTop:'6%',fontWeight:'bold'}} >{propertyData.offerprice?<> {propertyData.offerprice} </>:<>₹{propertyData.price}</>} <font style={{fontSize:15,fontWeight:500}}>night</font></div>
                <div style={{border:'1px solid grey',borderRadius:9,margin:'6%'}}>
                        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>

                        <div style={{width:'49%',padding:'3%'}}>
                        <div style={{fontSize:10,fontWeight:'bold'}} >CHECK-IN</div>
                        <div style={{fontSize:12}}>DD/MM/YYY</div>
                        </div>

                        <Divider orientation="vertical"  flexItem style={{borderLeft:'1px solid grey'}}/>

                        <div style={{width:'49%',padding:'3%'}}>
                       <div style={{fontSize:10,fontWeight:'bold'}} >CHECKOUT</div>
                       <div style={{fontSize:12}}>DD/MM/YYY</div>
                       
                    </div>
                    </div>
                    <Divider style={{borderTop:'1px solid grey'}}/>
                    <div style={{padding:'3%'}}>
                    <div style={{fontSize:12,fontWeight:'bold'}} >Guest</div>
                    <div>1 Guest</div>
                    </div>
                    
                </div>
                <div style={{paddingRight:'6%',paddingLeft:'6%'}}>
                    <div onClick={handleReserv} style={{background:'#E31C5F',borderRadius:9,padding:'4%',color:'#fff',fontSize:15,fontWeight:'bold',fontFamily:'poppins',display:'flex',justifyContent:'center'}}>Reserve</div>
                    
                </div>
                <div style={{textAlign:'center',paddingTop:'4%'}}>You won't be charged yet</div>

                <div style={{padding:'7%',fontSize:16}}>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                  <span><u>₹{propertyData.offerprice} x 5 nights</u></span><span>{Price}</span>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',paddingTop:'3%'}}>
                  <span><u>Abode service fee</u></span><span>₹19,765</span>
                </div>
                <Divider style={{paddingTop:'8%'}}/>
                <div style={{display:'flex',justifyContent:'space-between',fontWeight:'bold',paddingTop:'7%',paddingBottom:'2%'}}>
                  <span>Total before taxes</span><span>₹{Total}</span>
                </div>
                
                </div>
                  </Paper>
                  <div style={{textAlign:'center',paddingTop:'3%'}}><span style={{paddingRight:'3%'}}><FlagIcon style={{width:17,height:17,color:'gray'}}/></span><u style={{color:'grey'}} >Report this listing</u></div>
                  </AppBar>
               
               </>:<>
              
               {sm==true?
               <div  style={{width:'96%',height:53,display:'flex',position:'fixed',bottom:0,justifyContent:'space-between',background:'#fff',padding:'2%'}}>
               <div style={{fontSize:17,paddingLeft:'2%',fontWeight:'bold',padding:'1%'}} > <font style={{fontSize:15,fontWeight:500}}>{propertyData.offerprice?<>₹ {propertyData.offerprice} </>:<>₹{propertyData.price}</>}night</font><br/>06-aug</div>
               <div onClick={handleReserv}  style={{background:'#E31C5F',width:100,color:'#fff',padding:'3%',textAlign:'center',borderRadius:9,height:30}}>reserve</div>
               </div>:<></>}
               </>}
                
            </Grid>
         </Grid>
         </div>

        

        
           
         <Divider style={{paddingTop:'3%'}}/> 

         <div style={{fontFamily:'poppins',fontSize:22,fontWeight:'bold',paddingTop:'3%',paddingLeft:sm?'2%':''}}>Things to know</div>
         <Grid container spacing={1}>
            <Grid item xs={12} lg={4} style={{paddingLeft:sm?'6%':''}} >
                <div style={{fontWeight:'bold',fontFamily:'poppins',fontSize:15,paddingTop:'4%'}} >House rules</div>
                <div style={{fontFamily:'poppins',fontSize:15,paddingTop:'3%'}}>Check-in after 3:00 pm</div>
                <div style={{fontFamily:'poppins',fontSize:15,paddingTop:'2%'}}>14 guests maximum</div>
                <div style={{fontFamily:'poppins',fontSize:15,paddingTop:'2%'}}>Self check-in with building staff</div>
                <div  style={{fontFamily:'poppins',cursor:'pointer',fontSize:15,fontWeight:'bolder',paddingTop:'4%'}} ><u onClick={handleHouse} >Show more</u><ArrowForwardIosIcon style={{width:13,height:13,marginLeft:5}}/></div>
                {showHousePolicy()}
          </Grid>

            <Grid item xs={12} lg={4} style={{paddingLeft:sm?'6%':''}} >
                <div style={{fontWeight:'bold',fontFamily:'poppins',fontSize:15,paddingTop:'4%'}} >Safety & property</div>
                <div style={{fontFamily:'poppins',fontSize:15,paddingTop:'3%'}}>Carbon monoxide alarm not reported</div>
                <div style={{fontFamily:'poppins',fontSize:15,paddingTop:'2%'}}>Smoke alarm not reported</div>
                <div  style={{fontFamily:'poppins',cursor:'pointer',fontSize:15,fontWeight:'bolder',paddingTop:'4%'}} ><u onClick={handleSafty} >Show more</u><ArrowForwardIosIcon style={{width:13,height:13,marginLeft:5}}/></div>
               {showSafty()}
            </Grid>

            <Grid item xs={12} lg={4} style={{paddingLeft:sm?'6%':''}} >
                <div style={{fontWeight:'bold',fontFamily:'poppins',fontSize:15,paddingTop:'4%'}} >Cancellation policy</div>
                <div style={{fontFamily:'poppins',fontSize:15,paddingTop:'3%'}}>Free cancellation before 5 Aug.</div>
                <div style={{fontFamily:'poppins',fontSize:15,paddingTop:'2%'}}>Review the Host’s full cancellation policy which applies even if you cancel for illness or disruptions caused by COVID-19.</div>
                <div  style={{fontFamily:'poppins',cursor:'pointer',fontSize:15,fontWeight:'bolder',paddingTop:'4%'}} ><u onClick={handlePolicy} >Show more</u><ArrowForwardIosIcon style={{width:13,height:13,marginLeft:5}}/></div>
               {showPolicy()}
             </Grid>

         </Grid>
    </div>)
}