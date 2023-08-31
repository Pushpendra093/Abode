import { makeStyles } from '@mui/styles';

 export const useStyles = makeStyles({
    root:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        background:'#dff9fb',
        height:'88vh'
    },

    
    subdiv:{
        width:'50vw',
        padding:10,
        background:'#fff',
        borderRadius:15,
        margin:20
    
    },

    heading:{
        padding:5,
        fontSize:26,
        fontWeight:'bold',
        letterSpacing:1

    },

    displaycontainer: {
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        background:'#dff9fb',
       // width:'100vw',
        height:'100vh',
        padding:'3%'
  
      },
      diaplaybox:{
          width:'70vw',
          height:'auto',
          padding:15,
          background:'#fff',
          borderRadius:10
      },

})

