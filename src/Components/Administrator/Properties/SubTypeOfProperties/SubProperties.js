import { TextField,Grid,Button } from "@mui/material"
import { useState,useEffect } from "react"
import { useStyles } from "./SubPropertiesCss"
import { postData,getData } from "../../../Api/ServerServices"
import Swal from "sweetalert2"

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ViewListIcon from '@mui/icons-material/ViewList';
import { useNavigate } from "react-router-dom";



export default function SubProperties(props){
    const classes=useStyles()
    
    const [propertyId,setPropertyId]=useState('')
    const [subPropertyName,setSubPropertyName]=useState('')
    const [description,setDescription]=useState('')

    const [propertyList,setPropertyList]=useState([])
   
   const navigate=useNavigate() 

    const fetchAllProperty=async()=>{
        var result=await getData('properties/displayallproperty')
        setPropertyList(result.data)
    }

    const fillProperties=()=>{
        return propertyList.map((item)=>{

          return  <MenuItem value={item.propertyid} >{item.propertytype}</MenuItem>

        })
    }

    useEffect(function(){
       fetchAllProperty()

    },[])

  
      

    const handleClick = async() => {

        var body={propertyid:propertyId,subpropertyname:subPropertyName,description:description}
        var result=await postData('subProperties/addnewsubproperty',body)
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
                   Sub Properties
                  </div>
                  <div>
                   <ViewListIcon onClick={()=>navigate("/admindashboard/displayallsubproperties")} />
                  </div>
                </Grid>

                <Grid item xs={12}>
                 <FormControl fullWidth>
                     <InputLabel >Properties</InputLabel>
                         <Select
                          
                          value={propertyId}
                          label="Properties"
                          onChange={(e)=>{setPropertyId(e.target.value)}}
                         >
                        {fillProperties()}
                        </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                 <TextField onChange={(event)=>setSubPropertyName(event.target.value)} label='Sub Property' variant='outlined' fullWidth />
                </Grid>
                
                <Grid item xs={12}>
                 <TextField onChange={(event)=>setDescription(event.target.value)} label='Description' variant='outlined' fullWidth />
                </Grid>

                <Grid item xs={12}>
                 <Button onClick={handleClick}  variant='contained' fullWidth >Add  Sub Properties</Button>
                </Grid>

            </Grid>

        </div>
       
    </div>)
}