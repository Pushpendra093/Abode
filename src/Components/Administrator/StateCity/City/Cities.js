import { TextField,Grid,Button,Avatar,IconButton } from "@mui/material"
import { useState,useEffect } from "react"
import { useStyles } from "./CitiesCss"
import { postData,getData } from "../../../Api/ServerServices"
import Swal from "sweetalert2"

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { PhotoCamera } from "@mui/icons-material";

import { DropzoneArea } from "material-ui-dropzone";
import ViewListIcon from '@mui/icons-material/ViewList';
import { useNavigate } from "react-router-dom";



export default function Cities(props){
    const classes=useStyles()
    const [stateId,setStateId]=useState('')
    const [cityName,setCityName]=useState('')
    const [cityPicture,setCityPicture]=useState({file:'/assets/city.jpg',bytes:''})
    const [statesList,setStatesList]=useState([])
   
   const navigate=useNavigate() 

    const fetchAllStates=async()=>{
        var result=await getData('states/displayallstates')
        setStatesList(result.data)
    }

    const fillStates=()=>{
        return statesList.map((item)=>{

          return  <MenuItem value={item.stateid} >{item.statename}</MenuItem>

        })
    }

    useEffect(function(){
       fetchAllStates()

    },[])

    const handlePicture=(event)=>{
        setCityPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
      }
      

    const handleClick = async() => {
       
        var formData=new FormData()
        formData.append('cityname',cityName)
        formData.append('stateid',stateId)
        formData.append('picture',cityPicture)

        cityPicture.map((item,index)=>{
            formData.append('picture'+index,item)
        })

        var result=await postData('cities/addnewcity',formData)
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
                   <ViewListIcon onClick={()=>navigate("/admindashboard/displayallcities")} />
                  </div>
                </Grid>

                <Grid item xs={6}>
                 <FormControl fullWidth>
                     <InputLabel >States</InputLabel>
                         <Select
                          
                          value={stateId}
                          label="States"
                          onChange={(e)=>{setStateId(e.target.value)}}
                         >
                        {fillStates()}
                        </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                 <TextField onChange={(event)=>setCityName(event.target.value)} label='City Name' variant='outlined' fullWidth />
                </Grid>

                <Grid item xs={12}>
           <DropzoneArea
            acceptedFiles={['image/*']}
            dropzoneText={"Drag and drop an Product Picture here or click"}
            onChange={(files) => setCityPicture(files)}
            filesLimit={6}
            />
           </Grid>
          

                <Grid item xs={12}>
                 <Button onClick={handleClick}  variant='contained' fullWidth >Add New City</Button>
                </Grid>

            </Grid>

        </div>
       
    </div>)
}