import { Avatar, Box, Grid, Stack,useMediaQuery } from "@mui/material"
import { serverURL } from "../../Api/ServerServices"
import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useTheme } from '@mui/material/styles';

export default function New(props){

 
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const lg = useMediaQuery(theme.breakpoints.down('lg'));

    const itemData = [
        {id:1,img:JSON.parse(props.picture)[0], title: 'Breakfast',
        rows: 2,
        cols: 2,},
        {id:2,img:JSON.parse(props.picture)[1]},
        {id:2,img:JSON.parse(props.picture)[2]},
        {id:2,img:JSON.parse(props.picture)[3]},
        {id:2,img:JSON.parse(props.picture)[4]},
              ]

             


            const srcset=(img={String}, size={Number}, rows = 1, cols = 1)=> {
                return {
                  src: `${serverURL}/images/${img}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
                  srcSet: `${serverURL}/images/${img}?w=${size * cols}&h=${
                    size * rows
                  }&fit=crop&auto=format&dpr=2 2x`,
                };
              } 
              
               
    
    const image=()=>{
        return( <ImageList
            sx={{ width: '100%', height:sm?180: 381 ,borderRadius:3}}
            variant="quilted"
            cols={4}
            rowHeight={sm?88:188}
          >
            {itemData.map((item) => (
              <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                <img
                  {...srcset(item.img, 121, item.rows, item.cols)}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>)
    }          



    return(<div>

         {image()}

    </div>)
}