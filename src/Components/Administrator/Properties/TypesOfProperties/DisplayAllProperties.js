import { useEffect,useState } from "react"
import { getData } from "../../../Api/ServerServices"
import MaterialTable from "@material-table/core";
import { useStyles } from "./PropertiesCss";
import { Button,Grid,TextField,Avatar,IconButton } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Swal from "sweetalert2";
import { postData,serverURL } from "../../../Api/ServerServices";
import { PhotoCamera } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";



export default function DisplayAllProperties(){

    
    const [open, setOpen] = useState(false)

    const [propertyId,setPropertyId]=useState('')
    const [propertyType,setPropertyType]=useState('')
    const [propertyIcon,setPropertyIcon]=useState({file:'/assets/city.jpg',bytes:''})
    
    const [btnStatus,setBtnStatus]=useState('')
    const [oldIcon,setOldIcon]=useState('')
    
    const [propertyList,setPropertyList]=useState([])

    const navigate=useNavigate()

    const classes=useStyles()

   

    const fetchAllProperty=async()=>{
      var result=await getData('properties/displayallproperty')
      setPropertyList(result.data)
    }

    useEffect(function(){
       fetchAllProperty()  

    },[])

    

    const handleOpenDialog = (rowData) => {
        setPropertyId(rowData.propertyid)
        setPropertyType(rowData.propertytype)
        setPropertyIcon({file:`${serverURL}/images/${rowData.propertyicon}`,bytes:''})
        setOldIcon(rowData.propertyicon)
        setOpen(true);
      }  

      const handlePicture=(event)=>{
        setPropertyIcon({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
        setBtnStatus(true)
      }
    
      const handleEdit = async() => {

        var body={propertyid:propertyId,propertytype:propertyType,propertyicon:propertyIcon}
        var result=await postData('properties/property_edit_data',body)
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

            var body={propertyid:rowData.propertyid}
            var result=await postData('properties/property_delete',body)
            if(result.status)

            {Swal.fire(result.message, '', 'success')
            fetchAllProperty()}

            else
            {
              Swal.fire(result.message, '', 'error')
            }

          }
           else if (result.isDenied) {
            Swal.fire('Your Record is Safe', '', 'info')
          }
        })
        fetchAllProperty()
      }
      
      const handleEditIcon=async()=>{
        setBtnStatus(false)
        
        var formData=new FormData()
        formData.append('propertyid',propertyId)
        formData.append('propertyicon',propertyIcon.bytes)
        var result=await postData('properties/property_edit_icon',formData)

        if(result.status)
       { setOpen(false)
         Swal.fire({
           position: 'center',
           icon: 'success',
           title: result.message,
           showConfirmButton: false,//true krne pr OK krne pr hi alert htega
           timer: 1500
         })
       }
       else
       { setOpen(false)
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

    const handleCancel=()=>{
      setPropertyIcon({file:`${serverURL}/images/${oldIcon}`,bytes:''})
      setBtnStatus(false)
  }


    const editView=()=>{

        return(<div >
            <div  >
                <Grid container spacing={2}  >
                    <Grid item xs={12} >
                    <div className={classes.heading}>
                        Property Register
                    </div>
                    </Grid>
    
    
                    <Grid item xs={12}>
                     <TextField value={propertyType} onChange={(event)=>setPropertyType(event.target.value)} label='Property Name' variant='outlined' fullWidth />
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
                  src={propertyIcon.file}
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
                 <Button onClick={handleEdit}   variant='contained' fullWidth >Edit City</Button>
                </Grid>

    
                </Grid>
    
            </div>
           
        </div>)
    }  
    
    const handleClose = () => {
        setOpen(false);
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
            title="Property List"
            columns={[
              {title:'Property Id', field:'propertyid'},
                {title:'Property Type', field:'propertytype'},
                {title:'Property Picture', field:'propertyicon',
              render: rowData => <Avatar src={`${serverURL}/images/${rowData.propertyicon}`} style={{width:75}} variant='rounded'/>}
           
            ]}
            data={propertyList}        
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
                onClick: (event) => navigate('/admindashboard/properties')
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