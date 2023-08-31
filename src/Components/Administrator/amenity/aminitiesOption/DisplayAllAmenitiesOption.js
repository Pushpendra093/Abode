import { useEffect,useState } from "react"
import { getData } from "../../../Api/ServerServices"
import MaterialTable from "@material-table/core";
import { useStyles } from "./AmenitiesOptionCss";
import { Button,Grid,TextField,Avatar,IconButton } from "@mui/material";

import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Swal from "sweetalert2";
import { postData,serverURL } from "../../../Api/ServerServices";

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { PhotoCamera } from "@mui/icons-material";
import ViewListIcon from '@mui/icons-material/ViewList';
import { useNavigate } from "react-router-dom";


export default function DisplayAllAmenitiesOption(){

    const [amenitiesOptionList,setAmenitiesOptionList]=useState([])
    const [amenitiesList,setAmenitiesList]=useState([])
    
    const [amenitiesId,setAmenitiesId]=useState('')
    const [optionsId,setOptionsId]=useState('')
    const [optionName,setOptionName]=useState('')
    const [icon,setIcon]=useState({file:'/assets/city.jpg',bytes:''})

    const [btnStatus,setBtnStatus]=useState('')
    const [oldIcon,setOldIcon]=useState('')
    const [open, setOpen] = useState(false)
   
  

    const navigate=useNavigate()
    const classes=useStyles()

    const fetchAllAmenities=async()=>{
    var result=await getData('amenities/displayallamenities')
    setAmenitiesList(result.data)
   }


   const fetchAllAmenitiesOption=async()=>{
    var result=await getData('amenitiesOption/displayalloption')
    setAmenitiesOptionList(result.data)
   }

   


   useEffect(function(){
   fetchAllAmenities()
   fetchAllAmenitiesOption()
   

   },[])

   const fillAmenities=()=>{
    return amenitiesList.map((item)=>{

      return  <MenuItem value={item.amenitiesid} >{item.amenities}</MenuItem>

    })
   }

  
   const handlePicture=(event)=>{
    setIcon({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    setBtnStatus(true)
  }


    const handleClose = () => {
        setOpen(false);
      }

    const handleOpenDialog = (rowData) => {
       fetchAllAmenities()
       setAmenitiesId(rowData.amenitiesid)
        setOptionName(rowData.optionname)
        setOptionsId(rowData.optionsid)
        setIcon({file:`${serverURL}/images/${rowData.icon}`,bytes:''})
        setOldIcon(rowData.icon)
        setOpen(true);
      }  
    
      const handleEdit = async() => {

        var body={optionsid:optionsId,amenitiesid:amenitiesId,optionname:optionName}
        var result=await postData('amenitiesOption/update_amenitiesoption',body)
        //alert(result.message)
        
        if(result.status)
        {  setOpen(false)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: result.message,
                showConfirmButton: false,
                timer: 1500
              })
        }
        else
        {  setOpen(false)
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: result.message,
                showConfirmButton: false,
                timer: 1500
              })
        }
        fetchAllAmenitiesOption()
    }  

    
    

    const handleDelete = async(rowData) => {
      
        Swal.fire({
          title: 'Do you want to save the changes?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Delete',
          denyButtonText: `Don't Delete`,
        }).then(async(result) => {
          
          if (result.isConfirmed) {

            var body={optionsid:rowData.optionsid}
            var result=await postData('amenitiesOption/delete_amenitiesoption',body)
            if(result.status)

            {Swal.fire(result.message, '', 'success')
            fetchAllAmenitiesOption()}

            else
            {
              Swal.fire(result.message, '', 'error')
            }

          }
           else if (result.isDenied) {
            Swal.fire('Your Record is Safe', '', 'info')
          }
        })
      }

      const handleEditIcon=async()=>{
        setBtnStatus(false)
        
        var formData=new FormData()
        formData.append('optionsid',optionsId)
        formData.append('icon',icon.bytes)
        var result=await postData('amenitiesOption/amenitiesoption_edit_icon',formData)
           
        if(result.status)
       {
         Swal.fire({
           position: 'center',
           icon: 'success',
           title: result.message,
           showConfirmButton: false,//true krne pr OK krne pr hi alert htega
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
       fetchAllAmenitiesOption()

    }   

    const handleCancel=()=>{
      setIcon({file:`${serverURL}/images/${oldIcon}`,bytes:''})
      setBtnStatus(false)
  }

      
  



    const editView=()=>{

        return(<div  >
          
          <Grid container spacing={2}>
          <Grid item xs={12}  >
          <div className={classes.heading}>
             Amenities Register
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
                 <TextField value={optionName} onChange={(event)=>setOptionName(event.target.value)} label='Option Name' variant='outlined' fullWidth />
                </Grid>

                <Grid item xs={4}>
                    <IconButton  color="primary" aria-label="uplode picture" component="label">
                     <input onChange={handlePicture} hidden accept="*image/*" type="file" />
                     <PhotoCamera/>
                    </IconButton>
                </Grid>

                <Grid item xs={4}>
                 <Avatar
                  alt="picture"
                  src={icon.file}
                  sx={{ width: 56, height: 56 }}
                  variant="rounded"
                 
                  />
                 </Grid>
                 <Grid item xs={4}>
            {btnStatus?<>
            <Button onClick={handleEditIcon}>Save</Button>
            <Button onClick={handleCancel} >Cancel</Button></>:<></>}

           </Grid>

                <Grid item xs={12}>
                 <Button onClick={handleEdit} variant='contained' fullWidth >Edit Amenities</Button>
                </Grid>

            </Grid>
    
        
           
        </div>)
    }  


    const openDialog=()=>{
        return(
            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
             >
           
            <DialogContent>
            {editView()}
            </DialogContent>
             <DialogActions>
             
             <Button onClick={handleClose} autoFocus>
              Close
             </Button>
            </DialogActions>
          </Dialog>
        )
    }

    function displayTable() {
        return (
          <MaterialTable
            title="Amenities Option List"
            columns={[
                
                {title:'Option Id', field:'optionsid'},
                {title:'Amenities', field:'amenities'},
                {title:'Option Name ', field:'optionname'},
                {title:'Option Picture', field:'icon',
              render: rowData => <Avatar src={`${serverURL}/images/${rowData.icon}`} style={{width:75}} variant='rounded'/>}
            ]}
            data={amenitiesOptionList}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit State',
                onClick: (event, rowData) => handleOpenDialog(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete State',
                onClick: (event, rowData) =>handleDelete(rowData)
              },
              {
                icon: 'add',
                tooltip: 'Add category',
                isFreeAction: true,
                onClick: (event) => navigate('/admindashboard/amenitiesoption')
              }
            ]}
          />
        )
      }

    return(<div  className={classes.displaycontainer}>
        <div className={classes.diaplaybox}>
        {displayTable()}
        </div>
        {openDialog()}
    </div>)

}