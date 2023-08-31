import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function Breadcrumb(props){


    const breadcrumbs=()=>{
        return(
            <Link underline="hover" key="1" color="inherit" href="/" onClick={''}>
            MUI
          </Link>,
          <Link
            underline="hover"
            key="2"
            color="inherit"
            href="/material-ui/getting-started/installation/"
            onClick={''}
          >
            Core
          </Link>,
          <Typography key="3" color="text.primary">
            Breadcrumb
          </Typography>
        )
    }
    
      return (
        <Stack spacing={2} style={{color:'#000'}}>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
          <Breadcrumbs separator="-" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
      );
}