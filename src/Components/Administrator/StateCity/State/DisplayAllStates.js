import { useEffect,useState } from "react"
import { getData } from "../../../Api/ServerServices"
import MaterialTable from "@material-table/core";
import { useStyles } from "./StatesCss";
import { Button,Grid,TextField,Avatar,IconButton } from "@mui/material";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Swal from "sweetalert2";
import { postData,serverURL } from "../../../Api/ServerServices";

import { PhotoCamera } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";


export default function DisplayAllStates(){

    const [states,setState]=useState([])
    const [open, setOpen] = useState(false)
    const [stateName,setStateName]=useState('')
    const [stateId,setStateId]=useState('')
    const [statePicture,setStatePicture]=useState({file:'/assets/city.jpg',bytes:''})
    const [btnStatus,setBtnStatus]=useState('')
    const [oldIcon,setOldIcon]=useState('')

    const navigate=useNavigate()
    const classes=useStyles()

    const fetchAllStates=async()=>{
        var result=await getData('states/displayallstates')
        setState(result.data)
    }

    useEffect(function(){
       fetchAllStates()

    },[])

    const handleClose = () => {
        setOpen(false);
      }

    const handleOpenDialog = (rowData) => {
        setStateId(rowData.stateid)
        setStateName(rowData.statename)
        setStatePicture({file:`${serverURL}/images/${rowData.picture}`,bytes:''})
        setOldIcon(rowData.picture)
        setOpen(true);
      }  
    
      const handleEdit = async() => {

        var body={statename:stateName,stateid:stateId}
        var result=await postData('states/updatestates',body)
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
        fetchAllStates()
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

            var body={stateid:rowData.stateid}
            var result=await postData('states/deletestates',body)
            if(result.status)

            {Swal.fire(result.message, '', 'success')
            fetchAllStates()}

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
      
      const handlePicture=(event)=>{
        setStatePicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
        setBtnStatus(true)
      }

      const handleEditIcon=async()=>{
        setBtnStatus(false)
        setOpen(false)
        var formData=new FormData()
        formData.append('stateid',stateId)
        formData.append('picture',statePicture.bytes)
        var result=await postData('states/states_edit_icon',formData)

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
       fetchAllStates()

    }   

    const handleCancel=()=>{
      setStatePicture({file:`${serverURL}/images/${oldIcon}`,bytes:''})
      setBtnStatus(false)
  }





    const editView=()=>{

        return(<div  >
          
                <Grid container spacing={2}  >
                    <Grid item xs={12} >
                    <div className={classes.heading}>
                        States Register
                    </div>
                    </Grid>
    
                    <Grid item xs={12}>
                     <TextField value={stateName} onChange={(event)=>setStateName(event.target.value)} label='State Name' variant='outlined' fullWidth />
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
                  src={statePicture.file}
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
                     <Button onClick={handleEdit}  variant='contained' fullWidth >Edit State</Button>
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
                {title:'State Id', field:'stateid'},
                {title:'State Name', field:'statename'},
                {title:'State Picture', field:'picture',
                render: rowData => <Avatar src={`${serverURL}/images/${rowData.picture}`} style={{width:75}} variant='rounded'/>}
             
            ]}
            data={states}        
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
                onClick: (event) => navigate('/admindashboard/states')
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