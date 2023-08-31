
import { Avatar, Paper,useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { serverURL } from "../../Api/ServerServices";
import { useNavigate } from "react-router-dom";

export default function State(){
    
    const theme = useTheme();
    const navigate=useNavigate()
    const sm = useMediaQuery(theme.breakpoints.down('sm'));


    var color=['#e74c3c','#EA2027','#ff6b81','#e84393','#ff7675']
    var distance=[125,560,378,26,120,456,120,230,420,456,345,125,378,974]

    var state=[
        {id:1,name:'Indore',image:'state1.jpg'},
        {id:1,name:'Noida',image:'state2.jpg'},
        {id:1,name:'Bengaluru',image:'state3.avif'},
        {id:1,name:'Gurgaon',image:'state4.jpg'},
    ]
    
    const showState=()=>{
        return state.map((item)=>{
            return(<div onClick={()=> {navigate('/showstates')}} style={{cursor:'pointer',width:sm?'50%':'100%',height:'auto',padding:'1%'}} >
                <div style={{width:'100%',height:sm?225:450,boxShadow:'0 0px 10px rgba(0,0,0,0.5)',borderRadius:13,color:'#fff',background:color[parseInt(Math.random()*(color.length-1))]}}>
                <div style={{height:sm?125:250,width:'100%'}}>
                <Avatar variant='square' src={`${serverURL}/images/${item.image}` } style={{width:'100%',height:'100%',borderTopLeftRadius:13,borderTopRightRadius:13,}} />
               </div>
               <div style={{height:sm?100:200,fontSize:sm?20:35,padding:'5%',}}>
                {item.name}<br/><div style={{fontSize:sm?12:20}}>{distance[parseInt(Math.random()*(distance.length-1))]} kilometers away</div>  
               </div>
                </div>
              
            </div>)
        })
    }

   return(<div style={{}}>
    <div style={{fontSize:sm?20:30,fontWeight:'bolder',fontFamily:'Poppins',padding:sm?'2%':'1%',paddingLeft:'2%'}}>Inspiration for your next booking</div>
    <div style={{display:'flex',flexDirection:'row',flexWrap:sm?'wrap':'',paddingLeft:'1%',paddingRight:'1%'}} >
    {showState()}
    </div>

    
    <div style={{padding:'5%'}}>
    <div style={{fontSize:sm?20:34,fontFamily:'Poppins',fontWeight:'bolder',display:'flex',justifyContent:'center'}}>
        You can host 
        </div> 
        <div style={{fontSize:sm?20:34,fontFamily:'Poppins',fontWeight:'bolder',display:'flex',justifyContent:'center'}}>
        anything, anywhere
        </div> 
    </div>
    
   </div>)
}