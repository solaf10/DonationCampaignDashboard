import { Box } from '@mui/material';
import React from 'react';

const errorStyles = {
  backgroundColor: '#ffebee',
  color: '#b71c1c',
  borderRadius: '12px',
  padding: '12px 16px',
  fontSize: '14px',
  lineHeight: 1.6,
  fontFamily: 'Cairo',
  boxShadow: '0 2px 8px rgba(244, 67, 54, 0.12)',
  marginBottom: '16px',
};
const warningStyles = {
  mb: 2,
  padding: '12px 16px',
  borderRadius: '12px',
  backgroundColor: '#fff4e5',
  color: '#7f4e1e',
  fontFamily: 'Cairo',
  fontSize: '14px',
  lineHeight: 1.6,
};

const ErrorMessage = ({ children, warning = false }) => {
  return <Box sx={warning ? warningStyles : errorStyles}>{children}</Box>;
};

export default ErrorMessage;
