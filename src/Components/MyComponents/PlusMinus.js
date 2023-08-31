import { useEffect,useState } from "react";
import { Chip,Avatar, Icon } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';


export default function PlusMinus(props){

   

   
    const [value,setValue] = useState(1)

    const handlePlus=()=>{
        var c=value
        c=c+1
        setValue(c)
        props.onChange(c)
    }

    const handleMinus=()=>{
        var c=value
        c=c-1
        if(c>=1)
        setValue(c)
        props.onChange(c)
    }
    

    return (<div style={{display:'flex',justifyContent:'space-between',flexDirection:'row',width:90,margin:9,marginBottom:20,marginTop:'4%',marginBottom:'4%'}}>
           
           <div style={{display:'flex',flexDirection:'row',padding:1}}>
            <Avatar onClick={handlePlus}  style={{cursor:'pointer',width:30,height:30,background:"#000"}} >+</Avatar>
            <div style={{width:25,height:25,borderRadius:5,display:'flex',justifyContent:'center',fontSize:20,color:'#000'}}>{value}</div>
            <Avatar onClick={handleMinus} style={{cursor:'pointer',width:30,height:30,background:'#000'}}>-</Avatar>
           </div>
           
           </div>)

}

// <div onClick={handlePlusClick} style={{cursor:'pointer',border:'1px solid #718093',width:60,height:35,borderRadius:6,display:'flex',justifyContent:'center',alignItems:'center',fontSize:14,fontWeight:600,color:'#218c74'}}>ADD</div>

   //<div onClick={handlePlusClick} style={{cursor:'pointer',width:25,height:25,background:'#00a8ff',borderRadius:25,color:'#fff',justifyContent:'center',display:'flex'}}>+</div>
   //<div style={{width:25,height:25,border:'1px solid #74b9ff',borderRadius:5,display:'flex',justifyContent:'center'}}>{value}</div>
   //<div onClick={handleMinusClick} style={{cursor:'pointer',width:25,height:25,background:'#00a8ff',borderRadius:25,color:'#fff',justifyContent:'center',display:'flex'}}>-</div>
   