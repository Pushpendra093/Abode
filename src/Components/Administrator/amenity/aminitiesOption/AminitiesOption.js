import { TextField,Grid,Button,Avatar,IconButton } from "@mui/material"
import { useState,useEffect } from "react"
import { useStyles } from "./AmenitiesOptionCss"
import { postData,getData } from "../../../Api/ServerServices"
import Swal from "sweetalert2"

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { PhotoCamera } from "@mui/icons-material";

import ViewListIcon from '@mui/icons-material/ViewList';
import { useNavigate } from "react-router-dom";



export default function AmenitiesOption(props){
    const classes=useStyles()
    const [amenitiesId,setAmenitiesId]=useState('')
    const [optionName,setOptionName]=useState('')
    const [icon,setIcon]=useState({file:'/assets/city.jpg',bytes:''})

    const [amenitiesList,setAmenitiesList]=useState([])
   
   const navigate=useNavigate() 

   const fetchAllAmenities=async()=>{
    var result=await getData('amenities/displayallamenities')
    setAmenitiesList(result.data)
}

useEffect(function(){
   fetchAllAmenities()

},[])

const fillAmenities=()=>{
    return amenitiesList.map((item)=>{

      return  <MenuItem value={item.amenitiesid} >{item.amenities}</MenuItem>

    })
}



const handlePicture=(event)=>{
    setIcon({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
  }
  

    const handleClick = async() => {

        var formData=new FormData()
        formData.append('amenitiesid',amenitiesId)
        formData.append('optionname',optionName)
        formData.append('icon',icon.bytes)
        var result=await postData('amenitiesOption/add_new_amenities_option',formData)
        //alert(result.message)
        if(result.status)
        {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: result.message,
                showConfirmButton: false,
                timer: 1500
              })
        }
        else
        {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: result.message,
                showConfirmButton: false,
                timer: 1500
              })
        }
    }

    return(<div className={classes.root} >
        <div  className={classes.subdiv}>
            <Grid container spacing={2}  >
                <Grid item xs={12} style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}} >
                  <div className={classes.heading}>
                   ADD New Option
                  </div>
                  <div>
                   <ViewListIcon onClick={()=>navigate("/admindashboard/displayallamenitiesoption")} />
                  </div>
                </Grid>

                <Grid item xs={12}>
                 <FormControl fullWidth>
                     <InputLabel >Amenities</InputLabel>
                         <Select
                          
                          value={amenitiesId}
                          label="Amenities"
                          onChange={(e)=>{setAmenitiesId(e.target.value)}}
                         >
                        {fillAmenities()}
                        </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                 <TextField onChange={(event)=>setOptionName(event.target.value)} label='Option Name' variant='outlined' fullWidth />
                </Grid>

                <Grid item xs={6}>
                    <IconButton  color="primary" aria-label="uplode picture" component="label">
                     <input onChange={handlePicture} hidden accept="*image/*" type="file" />
                     <PhotoCamera/>
                    </IconButton>
                </Grid>

                <Grid item xs={6}>
                 <Avatar
                  alt="icon"
                  src={icon.file}
                  sx={{ width: 56, height: 56 }}
                  variant="rounded"
                  />
                 </Grid>

                <Grid item xs={12}>
                 <Button onClick={handleClick}  variant='contained' fullWidth >Add New City</Button>
                </Grid>

            </Grid>

        </div>
       
    </div>)
}