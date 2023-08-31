import { useEffect,useState } from "react"
import { getData } from "../../../Api/ServerServices"
import MaterialTable from "@material-table/core";
import { useStyles } from "./CitiesCss";
import { Button,Grid,TextField,Avatar,IconButton } from "@mui/material";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Swal from "sweetalert2";
import { postData,serverURL } from "../../../Api/ServerServices";

import { DropzoneArea } from "material-ui-dropzone";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useNavigate } from "react-router-dom";



export default function DisplayAllCities(){

    const [cities,setCities]=useState([])
    const [open, setOpen] = useState(false)
    const [stateId,setStateId]=useState('')
    const [cityId,setCityId]=useState('')
    const [cityName,setCityName]=useState('')
    const [cityPicture,setCityPicture]=useState({file:'/assets/city.jpg',bytes:''})
    const [statesList,setStatesList]=useState([])
    const [btnStatus,setBtnStatus]=useState('')
    const [oldIcon,setOldIcon]=useState('')

    const navigate=useNavigate()

    const classes=useStyles()

    const fetchAllCities=async()=>{
        var result=await getData('cities/displayallcities')
        setCities(result.data)
    }

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
       fetchAllCities()
       

    },[])

    const handleClose = () => {
        setOpen(false);
      }

    const handleOpenDialog = (rowData) => {
      fetchAllStates()
        setCityId(rowData.cityid)
        setStateId(rowData.stateid)
        setCityName(rowData.statename)
        setCityPicture({file:`${serverURL}/images/${rowData.picture}`,bytes:''})
        setOldIcon(rowData.picture)
        setOpen(true);
      }  

      const handlePicture=(event)=>{
        setCityPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
        setBtnStatus(true)
      }
    
      const handleEdit = async() => {

        var formData=new FormData()
        formData.append('cityname',cityName)
        formData.append('stateid',stateId)
        formData.append('cityid',cityId)
        formData.append('pictures',cityPicture)

        cityPicture.map((item,index)=>{
            formData.append('picture'+index,item)
        })

      
        var result=await postData('cities/cities_edit_data',formData)
        //alert(result.message)
        setOpen(false)
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
        fetchAllCities()
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

            var body={cityid:rowData.cityid}
            var result=await postData('cities/cities_delete_icon',body)
            if(result.status)

            {Swal.fire(result.message, '', 'success')
            fetchAllCities()}

            else
            {
              Swal.fire(result.message, '', 'error')
            }

          }
           else if (result.isDenied) {
            Swal.fire('Your Record is Safe', '', 'info')
          }
        })
        fetchAllCities()
      }
      
      const handleEditIcon=async()=>{
        setBtnStatus(false)
        setOpen(false)
        var formData=new FormData()
        formData.append('cityid',cityId)
        formData.append('picture',cityPicture.bytes)
        var result=await postData('cities/cities_edit_icon',formData)

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
       fetchAllCities()

    }   

    const handleCancel=()=>{
      setCityPicture({file:`${serverURL}/images/${oldIcon}`,bytes:''})
      setBtnStatus(false)
  }


    const editView=()=>{

      return(<div  >
        <div  >
            <Grid container spacing={2}  >
                <Grid item xs={12} >
                <div className={classes.heading}>
                    City Register
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
                 <TextField value={cityName} onChange={(event)=>setCityName(event.target.value)} label='City Name' variant='outlined' fullWidth />
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
                 <Button onClick={handleEdit}   variant='contained' fullWidth >Edit City</Button>
                </Grid>

            </Grid>

        </div>
       
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
            title="City List"
            columns={[
              {title:'City Id', field:'cityid'},
                {title:'State Name', field:'statename'},
                {title:'City Name', field:'cityname'},
                {title:'City Picture', field:'picture',
                
              render: rowData => <Avatar src={`${serverURL}/images/${rowData.picture}`} style={{width:75}} variant='rounded'/>}
           
            ]}
            data={cities}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit City',
                onClick: (event, rowData) => handleOpenDialog(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete City',
                onClick: (event, rowData) =>handleDelete(rowData)
              },
              
              {
                icon: 'add',
                tooltip: 'Add category',
                isFreeAction: true,
                onClick: (event) => navigate('/admindashboard/cities')
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