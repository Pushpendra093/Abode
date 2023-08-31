
import React ,{ useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import {Avatar, Divider, Paper} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { useMediaQuery } from '@material-ui/core';
import { useDispatch,useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import LoginNumberVerifecation from '../../MyComponents/LoginNumberVerifecation.js';
import { useNavigate } from 'react-router-dom';

export default function UserIntroduction(props) {

  const theme = useTheme();
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const [status,setStatus]=useState(false)

  var vendorData=useSelector(state=>state.vendor)
  var vendor=Object.values(vendorData)[0]



  var isLogin=''
    if (JSON.stringify(vendor)!=undefined)
    {  
      isLogin=vendor.mobileno
    }
    else 
    { 
      isLogin=''
    }

  const handleClose=()=>{
    props.setOpen(false)
  }

  const handleLogin=()=>{
    setStatus(true)
    props.setOpen(false)
  }

  const handleLogout=()=>{
    props.setOpen(false)
    dispatch({type:"CLEAR_LOGIN",payload:[]})
    
    navigate('/home')
  }

  const handleAccount=()=>{
    navigate('/userdatapage')
    props.setOpen(false)
  }
  
  const handleHome=()=>{
    navigate('/home')
    props.setOpen(false)
  }
  

  const [open, setOpen] = useState(props.open)
  
  useEffect(function(){
    setOpen(props.open)
  },[props.open])



 
  const page=()=>{
  return(<div>
                
                  <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                   // onKeyDown={handleListKeyDown}
                   
                  >
                    {
                      isLogin?<>
                       
                      <MenuItem onClick={handleAccount}>Profile</MenuItem>
                      <MenuItem onClick={handleAccount}>My account</MenuItem>
                      <Divider />
                      <MenuItem onClick={handleHome}>Help Center</MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </>:
                      <>
                      <MenuItem onClick={handleLogin}>Log in</MenuItem>
                      <MenuItem onClick={handleLogin}>Sign up</MenuItem>
                      <Divider />
                      <MenuItem onClick={handleClose}>Abode your home</MenuItem>
                      <MenuItem onClick={handleClose}>Help Center</MenuItem>
                        </> 
                    }
                  </MenuList>
                </ClickAwayListener>
                </div>
    
  )
  
  }

  return (
    <div >
      <Snackbar
        anchorOrigin={{  vertical: 'top', horizontal: 'right' }}
        open={open}
        autoHideDuration={6000}
        style={{width:'11%',marginTop:sm?'53px':'55px',marginRight:sm?'':props.right,marginLeft:sm?'82%':''}}
      >
        <Paper variant='outlined' onClose={handleClose} style={{background:'white'}} sx={{ width: sm?500:'100%' }}>
       {page()}
       </Paper>
       
      </Snackbar>
      {isLogin?<></>:
       <><LoginNumberVerifecation status={status} setStatus={setStatus} url={'/userdatapage'}  />
      </>}
      </div>
  );
   /* {isLogin?<></>:
    <><LoginNumberVerifecation status={status} setStatus={setStatus} url={'/userdatapage'}  />
      </>}
    </div>*/
  
}

