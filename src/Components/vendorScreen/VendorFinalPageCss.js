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


   
    rightButtom:{
        height:'10%',
    },


   
    rightMiddle:{
      
        height:'80%',
        display:'flex',
        justifyContent:'center',
        background:'#f1f2f6',
        alignItems:'center',
        width:'100%',

        
        
       
        
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