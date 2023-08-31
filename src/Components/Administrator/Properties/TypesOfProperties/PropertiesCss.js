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
        width:'50%',
        padding:30,
        marginTop:20,
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
        height:'88vh'
  
      },
      diaplaybox:{
          width:'40vw',
          height:'auto',
          padding:15,
          background:'#fff',
          borderRadius:10
      },

})

