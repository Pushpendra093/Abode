import { Button,Divider,Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { postData } from "../Api/ServerServices";

import { useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';

import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

import Swal from "sweetalert2"
export default function PrevNext(props)
{
    var navigate=useNavigate()

    
     const theme = useTheme();
   const sm = useMediaQuery(theme.breakpoints.down('sm'));
   const md = useMediaQuery(theme.breakpoints.down('md'));
   const lg = useMediaQuery(theme.breakpoints.down('lg'));


    const handleSave=async()=>{

        var body = props.data

        if(props.validation())
          
       { 
       
        if(props.data.opr=='')
        {navigate(props.nextUrl)}
          
        var result = await postData("vendor/update_vendor_properties",body)
        if(result.status)
        {
            navigate(props.nextUrl)
        }
        else
        { alert("Fail") }}
        else
        {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title:props.data.msg,
                showConfirmButton: false,
                timer: 1500
              })
           // props.setMessage(props.data.msg)
        }
     
    }

    return(
    <div >
        
          
            <LinearProgress  variant='determinate' value={props.value}  sx={{ backgroundColor: `white`,"& .MuiLinearProgress-bar": {backgroundColor: `black`,height:'0.1rem'}}} />
       

        
        <div
            style={{
                 display:'flex',
                  flexDirection:'row',
                  justifyContent:'space-between',
                
                  paddingTop:sm?'6%':'2%',
                  paddingLeft:'4%',
                  paddingRight:'4%'
            }}>
               
                 <Paper elevation={24}>
                <Button  onClick={()=>navigate(props.backUrl)} style={{background:'#000',color:'#fff'}} variant='contained' >Back</Button>
            </Paper>
            
            <Paper elevation={24}>
                <Button onClick={()=>handleSave(props.nextUrl)} style={{background:'#000',color:'#fff'}} variant='contained'>next</Button>
            </Paper>
            
        </div>
     </div>
)

}