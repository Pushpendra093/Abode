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

   

    
    rightMiddle:{
      
        height:'80vh',
        display:'flex',
        justifyContent:'center',
     },

   

    rightTop:{
        height:'10%',
       
    },


   

    rightButtom:{
        height:'10%',
    },


   
   
    boxShade:{
        border:'2px solid #576574',
        width:'60%',height:'90%'
        
    },

    boxShade2:{
        border:'2px solid #fff',
        width:'60%',height:'90%'
        
    },

    box1:{
        display:'flex',
        flexDirection:'row',
        height:'auto',
        width:'100%',
        paddingLeft:'5%',
        paddingRight:'5%'
    },

    box2:{
        width:'100%',
        height:'auto',
        fontSize:20,
        marginTop:'1%',
        fontWeight:500,
        
    },

    box3:{
        display:'flex',
        flexWrap:'wrap',
        flexDirection:'row',
        height:'auto',
        justifyContent:'space-between',
        paddingBottom:'4%'
    },

    boxSub1:{
      
       
        borderRadius:9,
        marginTop:'2%',
        border:'2px solid white'
    },

    boxSub1Shadow:{
        
        
        borderRadius:9,
        marginTop:'2%',
        border:'2px solid'
    },

    boxSub2:{
        width:'100%',
        height:'73%',
        display:'flex',
        justifyContent:'center',
        padding:'20%'
    },

    bigBox:{
        overflowY:'scroll',
        width:'100%',
        background:'#f1f2f6',
        padding:'1%'
    },


})

export  {useStyles}