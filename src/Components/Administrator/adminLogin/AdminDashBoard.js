import { AppBar,Toolbar,Grid,Paper,Avatar } from "@mui/material";
import { serverURL } from "../../Api/ServerServices";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import { Routes,Route } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import States from "../StateCity/State/States";
import DisplayAllStates from "../StateCity/State/DisplayAllStates";
import Cities from "../StateCity/City/Cities";
import DisplayAllCities from "../StateCity/City/DisplayAllCities";
import Properties from "../Properties/TypesOfProperties/Properties";
import DisplayAllProperties from "../Properties/TypesOfProperties/DisplayAllProperties";
import SubProperties from "../Properties/SubTypeOfProperties/SubProperties";
import DisplayAllSubProperties from "../Properties/SubTypeOfProperties/DisplayAllSubProperties";
import Amenities from "../amenity/aminities/Amenities";
import DisplayAllAmenities from "../amenity/aminities/DisplayAllAmenities";
import AmenitiesOption from "../amenity/aminitiesOption/AminitiesOption";
import DisplayAllAmenitiesOption from "../amenity/aminitiesOption/DisplayAllAmenitiesOption";





export default function AdminDashBoard(){
 
    var admin=JSON.parse(localStorage.getItem("ADMIN"))
    const navigate=useNavigate()

    return(<div>
       <AppBar style={{background:'#fff'}} >
         <Toolbar>
            <div  style={{color:'#000',fontFamily:'Poppins',letterSpacing:1,fontWeight:'bold',fontSize:24}}>
                ABORD
            </div>
         </Toolbar>
       </AppBar>

       <div  style={{marginTop:'5%'}}>
       <Grid container spacing={2}>
            <Grid item xs={2}>
             <Paper style={{display:'flex',flexDirection:'column',margin:5,padding:5,marginRight:5,marginBottom:10}}>
                
                <Paper elevation={3} style={{background:"#bdc3c7",flexDirection:'column',display:'flex',alignItems:'center',justifyContent:'center',width:200,padding:10,marginBottom:10}}>
                   
                 <Avatar src={`${serverURL}/images/picture.jpg` } style={{width:70,height:70}} />
                 
                 <div style={{fontFamily:'Poppins',fontWeight:'bold',paddingBottom:5}}>
                 {admin.adminname}
                  </div>
                  
                  <div style={{fontSize:12,fontFamily:'Poppins',fontWeight:'bold',paddingBottom:5}}>
                    {admin.emailid}
                  </div>

                </Paper>
         <List>
          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/admindashboard/displayallstates')}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={<span style={{fontFamily:'Poppins',fontWeight:'700'}}>States</span>} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/admindashboard/displayallcities')}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={<span style={{fontFamily:'Poppins',fontWeight:'700'}}>Cities</span>} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/admindashboard/displayallproperties')}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={<span style={{fontFamily:'Poppins',fontWeight:'700'}}>Properties</span>} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/admindashboard/displayallsubproperties')}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={<span style={{fontFamily:'Poppins',fontWeight:'700'}}>Sub Properties</span>} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/admindashboard/displayallamenities')}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={<span style={{fontFamily:'Poppins',fontWeight:'700'}}>Amenities</span>} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/admindashboard/displayallamenitiesoption')}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={<span style={{fontFamily:'Poppins',fontWeight:'700'}}>Amenities Options</span>} />
            </ListItemButton>
          </ListItem>

         
          
        </List>

             </Paper>
            </Grid>
            <Grid item xs={10} style={{paddingRight:'1%'}}>
              {/* Dashboard Routers */}
         <Routes>
         
          <Route element={<States />} path="/states" />
          <Route element={<DisplayAllStates />} path="/displayallstates" />
          <Route element={<Cities />} path="/cities" />
          <Route element={<DisplayAllCities />} path="/displayallcities" />
          <Route element={<Properties />} path="/properties" />
          <Route element={<DisplayAllProperties/>} path="/displayallproperties" />
          <Route element={<SubProperties />} path="/subproperties" />
          <Route element={<DisplayAllSubProperties />} path="/displayallsubproperties" />
          <Route element={<Amenities />} path="/amenities" />
          <Route element={<DisplayAllAmenities />} path="/displayallamenities" />
          <Route element={<AmenitiesOption />} path="/amenitiesoption" />
          <Route element={<DisplayAllAmenitiesOption />} path="/displayallamenitiesoption" />

         </Routes>
            </Grid>
           

         </Grid>
         </div>
        
    </div>)
}