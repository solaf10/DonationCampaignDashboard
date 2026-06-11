// ProjectsMessage.jsx

import { Box, Typography } from '@mui/material';

const ProjectsMessage = ({ message, isError = false }) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '475px',
        borderRadius: '14px',
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
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
            alt='state'
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
    </Box>
  );
};

export default ProjectsMessage;
