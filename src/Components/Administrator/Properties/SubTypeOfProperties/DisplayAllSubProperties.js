import { useEffect,useState } from "react"
import { getData } from "../../../Api/ServerServices"
import MaterialTable from "@material-table/core";
import { useStyles } from "./SubPropertiesCss";
import { Button,Grid,TextField } from "@mui/material";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Swal from "sweetalert2";
import { postData } from "../../../Api/ServerServices";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from "react-router-dom";



export default function DisplayAllSubProperties(){

    const [subProperty,setSubProperty]=useState([])
    const [propertyList,setPropertyList]=useState([])

    const [subPropertyId,setSubPropertyId]=useState('')
    const [propertyId,setPropertyId]=useState('')
    const [subPropertyName,setSubPropertyName]=useState('')
    const [description,setDescription]=useState('')


    const [open, setOpen] = useState(false)
   
    const navigate=useNavigate()
    const classes=useStyles()

    const fetchAllSubProperty=async()=>{
        var result=await getData('subProperties/displayallsubproperty')
        setSubProperty(result.data)
    }

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
       fetchAllSubProperty()
       

    },[])

    const handleClose = () => {
        setOpen(false);
      }

    const handleOpenDialog = (rowData) => {
        fetchAllProperty()
        setPropertyId(rowData.propertyid)
        setSubPropertyId(rowData.subpropertyid)
        setSubPropertyName(rowData.subpropertyname)
        setDescription(rowData.description)
        setOpen(true);
      }  

      
    
      const handleEdit = async() => {

        var body={subpropertyid:subPropertyId,propertyid:propertyId,subpropertyname:subPropertyName,description:description}
        var result=await postData('subProperties/subproperty_edit_data',body)
        //alert(result.message)
        if(result.status)
        {    setOpen(false)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: result.message,
                showConfirmButton: false,
                timer: 1500
              })
        }
        else
        {   setOpen(false)
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: result.message,
                showConfirmButton: false,
                timer: 1500
              })
        }
        fetchAllProperty()
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

            var body={subpropertyid:rowData.subpropertyid}
            var result=await postData('subProperties/subproperty_delete',body)
            if(result.status)

            {Swal.fire(result.message, '', 'success')
            fetchAllSubProperty()}

            else
            {
              Swal.fire(result.message, '', 'error')
            }

          }
           else if (result.isDenied) {
            Swal.fire('Your Record is Safe', '', 'info')
          }
        })
        fetchAllSubProperty()
      }
      
      

    

    const editView=()=>{

        return(<div  >
            <div  >
                <Grid container spacing={2}  >
                    <Grid item xs={12}  >
                      <div className={classes.heading}>
                       Sub Properties Register
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
                     <TextField value={subPropertyName} onChange={(event)=>setSubPropertyName(event.target.value)} label='Sub Property' variant='outlined' fullWidth />
                    </Grid>
                    
                    <Grid item xs={12}>
                     <TextField value={description} onChange={(event)=>setDescription(event.target.value)} label='Description' variant='outlined' fullWidth />
                    </Grid>
    
                    <Grid item xs={12}>
                     <Button onClick={handleEdit}  variant='contained' fullWidth >Edit Sub Properties</Button>
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
            title="Sub Property List"
            columns={[
              {title:'sub Property Id', field:'subpropertyid'},
                {title:'Property Type', field:'propertytype'},
                {title:'Sub Property Name', field:'subpropertyname'},
                {title:'Description', field:'description'},
               
            ]}
            data={subProperty}        
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
                onClick: (event) => navigate('/admindashboard/subproperties')
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