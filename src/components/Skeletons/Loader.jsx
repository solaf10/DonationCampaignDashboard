import { Box } from '@mui/material';
import React from 'react';

const Loader = ({ styles }) => {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...styles,
      }}
    >
      <div
        className='btn-loader'
        style={{
          width: '40px',
          height: '40px',
          borderWidth: '4px',
          borderColor: 'var(--secondary-color)',
          borderTopColor: 'white',
        }}
      ></div>
    </Box>
  );
};

export default Loader;
