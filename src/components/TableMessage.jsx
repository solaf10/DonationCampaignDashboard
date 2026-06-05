import { WarningAmber } from '@mui/icons-material';
import { Box, TableCell, TableRow, Typography } from '@mui/material';
import React from 'react';

const TableMessage = ({ message, columnsLength, isError }) => {
  return (
    <TableRow
      sx={{
        '&:hover': {
          backgroundColor: 'transparent!important',
        },
      }}
    >
      <TableCell
        colSpan={columnsLength}
        align='center'
        sx={{
          py: 8,
          borderBottom: 'none',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              width: 140,
              height: 140,
              borderRadius: '50%',
              backgroundColor: isError ? '#FDECEC' : '#e3eaea',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3,
            }}
          >
            <img
              src={isError ? '/error.png' : '/noResult.png'}
              alt='No Results'
              style={{
                width: '95px',
                opacity: 0.75,
                filter: isError ? 'grayscale(0%)' : 'grayscale(100%)',
              }}
            />
          </Box>

          <Typography
            sx={{
              fontSize: '18px',
              fontWeight: 600,
              color: isError ? '#B3261E' : '#6b7b7d',
              fontFamily: 'Cairo',
            }}
          >
            {message}
          </Typography>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default TableMessage;
