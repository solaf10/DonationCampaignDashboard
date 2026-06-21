import { CheckCircleOutlineOutlined } from '@mui/icons-material';
import { Box, Card, Grid, Typography } from '@mui/material';

const Requirements = ({ secTitle, requirements }) => {
  return (
    <Grid size={6}>
      <Card
        sx={{
          p: 4,
          borderRadius: 5,
          boxShadow: '0 4px 18px rgba(0,0,0,0.07)',
          height: '100%',
        }}
      >
        <Typography variant='h5' sx={{ fontWeight: 800, mb: 3 }}>
          {secTitle}
        </Typography>

        <Box
          sx={{
            height: '272px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {requirements?.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                gap: 1.5,
                alignItems: 'flex-start',
                bgcolor: '#f8fafb',
                py: 1.5,
                borderRadius: 4,
                borderBottom: '1px solid #edf0f4',
              }}
            >
              <CheckCircleOutlineOutlined
                sx={{
                  color: '#6B9E8A',
                  mt: 0.2,
                }}
              />

              <Typography sx={{ lineHeight: 1.8 }}>{item}</Typography>
            </Box>
          ))}
        </Box>
      </Card>
    </Grid>
  );
};

export default Requirements;
