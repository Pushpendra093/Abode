import { TextField,Grid,Button,Avatar,IconButton } from "@mui/material"
import { useState } from "react"
import { useStyles } from "./PropertiesCss"
import { postData } from "../../../Api/ServerServices"
import Swal from "sweetalert2"

import { PhotoCamera } from "@mui/icons-material";

import { useNavigate } from "react-router-dom"
import ViewListIcon from '@mui/icons-material/ViewList';



export default function Properties(props){
    const classes=useStyles()
    const [propertyType,setPropertyType]=useState('')
    const [propertyIcon,setPropertyIcon]=useState({file:'/assets/city.jpg',bytes:''})
    const navigate=useNavigate()


    const handlePicture=(event)=>{
        setPropertyIcon({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
      }
      

    const handleClick = async() => {

        var formData=new FormData()
        formData.append('propertytype',propertyType)
        formData.append('propertyicon',propertyIcon.bytes)
        var result=await postData('properties/addnewproperty',formData)
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
                   ADD New Properties
                  </div>
                  <div>
                   <ViewListIcon onClick={()=>navigate("/admindashboard/displayallproperties")} />
                  </div>
                </Grid>

                <Grid item xs={12}>
                 <TextField onChange={(event)=>setPropertyType(event.target.value)} label='Property Name' variant='outlined' fullWidth />
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
                  src={propertyIcon.file}
                  sx={{ width: 56, height: 56 }}
                  variant="rounded"
                  />
                 </Grid>

                <Grid item xs={12}>
                 <Button onClick={handleClick}  variant='contained' fullWidth >Add New Property</Button>
                </Grid>

            </Grid>

        </div>
       
    </div>)
}