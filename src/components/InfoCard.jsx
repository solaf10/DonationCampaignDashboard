import { Avatar, Box, Card, Typography } from '@mui/material';

export default function InfoCard({ icon, title, value, bg, color }) {
  return (
    <Card
      sx={{
        p: 2.5,
        borderRadius: 4,
        bgcolor: '#f8fafb',
        height: '100%',
        boxShadow: '0 4px 18px rgba(0,0,0,0.07)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          height: '100%',
        }}
      >
        <Avatar
          sx={{
            bgcolor: bg,
            color: color,
          }}
        >
          {icon}
        </Avatar>

        <Box>
          <Typography variant='caption'>{title}</Typography>

          <Typography fontWeight={700}>{value}</Typography>
        </Box>
      </Box>
    </Card>
  );
}
