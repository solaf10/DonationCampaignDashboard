import {
  Dialog,
  Box,
  Card,
  Avatar,
  Typography,
  Chip,
  Divider,
  Stack,
  Paper,
  IconButton,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';

export default function ProfileModal({ open, onClose }) {
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth='sm'
      slotProps={{
        paper: {
          sx: {
            borderRadius: 5,
            width: '100%',
            maxWidth: 420,
            border: 'none!important',
            backgroundColor: 'transparent',
          },
        },
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: 12,
          left: 12,
          zIndex: 10,
          bgcolor: 'rgba(0,0,0,0.4)',
          color: '#fff',
          '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' },
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* CARD */}
      <Card
        sx={{
          width: '100%',
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
          border: 'none',
          backgroundColor: 'transparent',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            background:
              'linear-gradient(135deg, var(--main-color) 0%, #4CAF50 100%)',
            height: 90,
            position: 'relative',
            zIndex: 9,
          }}
        />

        {/* Body */}
        <Box
          sx={{
            mt: '-50px',
            textAlign: 'center',
            px: 2,
            pb: 3,
            backgroundColor: 'white',
          }}
        >
          {/* Avatar */}
          <Avatar
            src={
              user?.profile && user.profile !== 'null'
                ? user.profile
                : undefined
            }
            sx={{
              width: 100,
              height: 100,
              mx: 'auto',
              border: '5px solid white',
              zIndex: '11',
              boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
              backgroundColor: '#d9d9d9',
            }}
          >
            {!user?.profile && <PersonIcon sx={{ fontSize: '64px' }} />}
          </Avatar>

          {/* Name */}
          <Typography variant='h6' sx={{ mt: 0.5, fontWeight: 800 }}>
            {user?.name}
          </Typography>

          {/* Role */}
          <Chip
            label={user?.type}
            size='small'
            sx={{
              mt: 1,
              bgcolor: '#E8F5E9',
              color: 'var(--main-color)',
              fontWeight: 700,
            }}
          />

          <Divider sx={{ my: 2 }} />

          {/* Info */}
          <Stack spacing={1}>
            <Paper sx={infoBoxStyle}>
              <Typography variant='caption' color='text.secondary'>
                رقم الهاتف
              </Typography>
              <Typography fontWeight={700} mt={0.5}>
                {user?.phone || '—'}
              </Typography>
            </Paper>

            <Paper sx={infoBoxStyle}>
              <Typography variant='caption' color='text.secondary'>
                البريد الإلكتروني
              </Typography>
              <Typography
                fontWeight={700}
                mt={0.5}
                sx={{ wordBreak: 'break-word' }}
              >
                {user?.email || '—'}
              </Typography>
            </Paper>
          </Stack>
        </Box>
      </Card>
    </Dialog>
  );
}

const infoBoxStyle = {
  p: 2,
  borderRadius: 3,
  bgcolor: '#F8FAFC',
  border: '1px solid #EEF2F6',
  boxShadow: 'none',
};
