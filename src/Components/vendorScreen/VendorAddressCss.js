import { makeStyles } from "@mui/styles";




const useStyles=makeStyles({
    leftDiv:{
       
        fontSize:40,
        fontWeight:500,
        display:'flex',
        justifyContent:'center',
        marginTop:'40%',
        color:'whitesmoke',
        
    },

    box:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        border:'solid grey',
        borderRadius:10,
        margin:10,
        borderWidth:'2px',
        borderColor:'#DFDFDE'
    },

   

    rightTop:{
        height:'10%',
       
    },


    rightMiddle:{
      
        height:'80%',
        display:'flex',
        justifyContent:'center',
        
     },

    rightButtom:{
        height:'10%',
    },
   
    rightTopDiv1:{
        
      
        display:'flex',
        alignItems:'center',
        width:'auto',
        padding:'2%',
        height:'5vh',
        marginLeft:'2%' ,
        borderRadius:15,
        fontWeight:'bold',
        fontSize:15,
        fontFamily:'revert',
        

    },
   

    rightTopDiv2:{
        
        
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:'auto%',
        padding:'2%',
        height:'5vh',
        marginRight:'4%',
        borderRadius:15,
        fontWeight:'bold',
        fontSize:15,
        fontFamily:'revert',
        

    },

    boxShade:{
        border:'2px solid #576574',
        width:'60%',height:'90%'
        
       
    },

    boxShade2:{
        border:'2px solid #fff',
        width:'60%',height:'90%'
        
    }


})

export  {useStyles}