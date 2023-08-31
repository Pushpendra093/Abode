import { TextField,Grid,Button,Avatar,IconButton } from "@mui/material"
import {useStyles} from "./StatesCss"
import { useState } from "react"
import { postData } from "../../../Api/ServerServices"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import ViewListIcon from '@mui/icons-material/ViewList';

import { PhotoCamera } from "@mui/icons-material";


export default function States(props){
    const classes=useStyles()
    const [stateName,setStateName]=useState('')
    const [statePicture,setStatePicture]=useState({file:'/assets/city.jpg',bytes:''})
   
    const navigate=useNavigate()

    const handleClick = async() => {

        var formData=new FormData()
        formData.append('statename',stateName)
        formData.append('picture',statePicture.bytes)
        var result=await postData('states/addnewstates',formData)
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

    const handlePicture=(event)=>{
        setStatePicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
      }

    return(<div className={classes.root} >
        <div  className={classes.subdiv}>
        <Grid container spacing={2}>
          <Grid item xs={12} style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}} >
          <div className={classes.heading}>
           ADD New States
          </div>
          <div>
            <ViewListIcon onClick={()=>navigate('/admindashboard/displayallstates')} />
          </div>
         </Grid>

                <Grid item xs={12}>
                 <TextField onChange={(event)=>setStateName(event.target.value)} label='State Name' variant='outlined' fullWidth />
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
                  src={statePicture.file}
                  sx={{ width: 56, height: 56 }}
                  variant="rounded"
                  />
                 </Grid>

                <Grid item xs={12}>
                 <Button onClick={handleClick} variant='contained' fullWidth >Add New State</Button>
                </Grid>

            </Grid>

        </div>
       
    </div>)
}