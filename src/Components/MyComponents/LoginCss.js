import { makeStyles } from "@mui/styles"

 const useStyles = makeStyles({
    
    dialogTitle:{
        fontSize:14,
        fontWeight:'bold',
        textAlign:'center'
    },
    dialogWelcomeTitle:{
        fontSize:20,
        fontWeight:'bold',
        marginBottom:20,
        color:'#000'
    },
    dialogText:{
        fontSize:12,
    },
    otpErrorMessage:{
        fontSize:12,
        fontWeight:'bold',
        letterSpacing:1,
        color:'red'
    },

});

export {useStyles}