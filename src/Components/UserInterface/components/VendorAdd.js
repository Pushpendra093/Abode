
import { Avatar,Grid, Paper,useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { serverURL } from "../../Api/ServerServices";

export default function VendorAdd(){

    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
   
    const heading=()=>{
        return(<div style={{fontSize:sm?16:40,fontWeight:'bold',fontFamily:'Poppins',color:'gray',flexDirection:'column'}}>
          <div>Host your <u style={{color:'black'}}>entire place</u> for <u style={{color:'black'}}>4 guest</u></div>
          <div style={{paddingLeft:'35%'}}>in <u style={{color:'black'}}>Bhopal</u></div>
          <div>and earn up to &#8377;12,014/month</div>
        
        
        </div>)
    }

    

    return(<div style={{justifyContent:'center',display:'flex'}}>
       {heading()}

    </div>)
}