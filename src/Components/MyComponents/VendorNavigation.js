import { Button,Divider, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { postData } from "../Api/ServerServices";
import Swal from "sweetalert2"
import { useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';

export default function VendorNavigation(props)
{
    var navigate = useNavigate()
    
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));
 
 
    const handleSaveExit = async () => {

        var body = props.data
        if(props.validation())
        {
        var result = await postData("vendor/update_vendor_properties",body)
        if(result.status)
        {
            navigate('/home')
            
        }
        
        else
        {
            alert("Fail")
        }}
        else
        {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title:props.data.msg,
                showConfirmButton: false,
                timer: 1500
              })
        }

    }
    return(
       <div style={{display:'flex',justifyContent:'space-between',flexDirection:'row',paddingTop:sm?'5%':'2%', paddingLeft:'2%',paddingRight:'2%'}}>
        <Paper style={{  display:'flex',alignItems:'center',width:'auto',padding:'2%',height:'5vh',marginLeft:'2%',borderRadius:15,fontWeight:'bold',fontSize:15,fontFamily:'revert',borderRadius:9}} variant="outlined"   >
            {props.vendorName} 
           </Paper>
           
           <Paper onClick={handleSaveExit} variant="outlined" style={{ cursor:'pointer', display:'flex',alignItems:'center',width:'auto',padding:'2%',height:'5vh',marginLeft:'2%',borderRadius:15,fontWeight:'bold',fontSize:15,fontFamily:'revert',borderRadius:9,marginRight:'3%'}}  >
            Save  &  Exit
           </Paper>
       </div>
        
    )

}