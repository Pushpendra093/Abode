import { useEffect,useState } from "react"
import { getData } from "../../../Api/ServerServices"
import MaterialTable from "@material-table/core";
import { useStyles } from "./AminitiesCss";
import { Button,Grid,TextField } from "@mui/material";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Swal from "sweetalert2";
import { postData } from "../../../Api/ServerServices";

import { useNavigate } from "react-router-dom";


export default function DisplayAllAmenities(){

    const [amenitiesList,setAmenitiesList]=useState([])
    const [amenitiesId,setAmenitiesId]=useState('')
    const [amenities,setAmenities]=useState('')

    const [open, setOpen] = useState(false)
   
  

    const navigate=useNavigate()
    const classes=useStyles()

    const fetchAllAmenities=async()=>{
        var result=await getData('amenities/displayallamenities')
        setAmenitiesList(result.data)
    }

    useEffect(function(){
       fetchAllAmenities()

    },[])

    const handleClose = () => {
        setOpen(false);
      }

    const handleOpenDialog = (rowData) => {
        setAmenitiesId(rowData.amenitiesid)
        setAmenities(rowData.amenities)
        setOpen(true);
      }  
    
      const handleEdit = async() => {

        var body={amenities:amenities,amenitiesid:amenitiesId}
        var result=await postData('amenities/update_amenities',body)
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
        fetchAllAmenities()
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

            var body={amenitiesid:rowData.amenitiesid}
            var result=await postData('amenities/delete_amenities',body)
            if(result.status)

            {Swal.fire(result.message, '', 'success')
            fetchAllAmenities()}

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
      
  



    const editView=()=>{

        return(<div  >
          
          <Grid container spacing={2}>
          <Grid item xs={12}  >
          <div className={classes.heading}>
             Amenities Register
          </div>
          
         </Grid>

                <Grid item xs={12}>
                 <TextField value={amenities} onChange={(event)=>setAmenities(event.target.value)} label='Amenities' variant='outlined' fullWidth />
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
            title="State List"
            columns={[
                {title:'Amenities Id', field:'amenitiesid'},
                {title:'Amenities', field:'amenities'},
            ]}
            data={amenitiesList}        
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
                onClick: (event) => navigate('/admindashboard/amenities')
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