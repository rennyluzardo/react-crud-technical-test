/* eslint-disable react/prop-types */
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function InputFileUpload(props) {
  return (
    <div className='input-file-upload'>
      <div>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {
            props?.properties &&
            props.properties.map((property) => {
              return property.multimedia &&
                property.multimedia.map((src, index) => (
                  <Grid
                    item
                    xs={2}
                    sm={4}
                    md={4}
                    key={index}
                  >
                    {/* {console.log(src)} */}
                    <Item>
                      <img src={src[0].url} alt="File" style={{ maxHeight: 100 }} />
                      {src.type}
                    </Item>
                  </Grid>
                ))
            })
          }
        </Grid>
      </div>
      <div className='input-file-upload__actions'>
        <div>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            onChange={e => props.onChange(e, 'image')}
            className='w-100'
          >
            Subir imagen
            <VisuallyHiddenInput type="file" />
          </Button>
        </div>
        <div>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            className='w-100'
            onChange={e => props.onChange(e, 'video')}
          >
            Subir video
            <VisuallyHiddenInput />
          </Button>
        </div>
      </div>
    </div>

  );
}
