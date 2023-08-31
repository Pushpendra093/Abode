import { makeStyles } from "@mui/styles"

 const useStyles = makeStyles({
    sideDiv:{
        width:'100%',
        height:'100%',
        background:"#000",
        justifyContent:'center',
        alignItems:'center',
        display:'flex',
        flexDirection:'column'
         },

    textHeadStyle:{
        fontSize:'250%',
        fontWeight:'bold',
        color:'#FFF',
        width:330,
        textAlign:'center'
    },
    textSubStyle:{ 
        fontSize:18,
        fontWeight:'bold',
        color:'#FFF',
        width:250,
        textAlign:'center',
        marginTop:15,
        marginBottom:25,
    },     
    buttonStyle:{
        backgroundColor:'#fc5c65',
        color:'#fff'
    },
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