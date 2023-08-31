import { TextField,Grid,Button } from "@mui/material"
import {useStyles} from "./AminitiesCss"
import { useState } from "react"
import { postData } from "../../../Api/ServerServices"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import ViewListIcon from '@mui/icons-material/ViewList';


export default function Amenities(props){
    const classes=useStyles()
    const [amenities,setAmenities]=useState('')
    const navigate=useNavigate()

    const handleClick = async() => {

        var body={amenities:amenities}
        var result=await postData('amenities/addnewamenities',body)
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
        <Grid container spacing={2}>
          <Grid item xs={12} style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}} >
          <div className={classes.heading}>
           ADD New Amenities
          </div>
          <div>
            <ViewListIcon onClick={()=>navigate("/admindashboard/displayallamenities")} />
          </div>
         </Grid>

                <Grid item xs={12}>
                 <TextField onChange={(event)=>setAmenities(event.target.value)} label='Amenities' variant='outlined' fullWidth />
                </Grid>

                <Grid item xs={12}>
                 <Button onClick={handleClick} variant='contained' fullWidth >Add New Amenities</Button>
                </Grid>

            </Grid>

        </div>
       
    </div>)
}