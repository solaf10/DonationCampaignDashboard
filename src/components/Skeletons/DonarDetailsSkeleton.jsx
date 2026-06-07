import { Box, Grid, Skeleton } from '@mui/material';
import PageContainer from '../PageContainer';

export default function DonarDetailsSkeleton() {
  return (
    <PageContainer>
      <Box>
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            mb: 3,
            p: 3,
            borderRadius: 4,
            background: '#f8fafb',
          }}
        >
          {/* Avatar */}
          <Skeleton variant='circular' width={110} height={110} />

          {/* Info */}
          <Box sx={{ flex: 1 }}>
            {/* Name */}
            <Skeleton variant='text' width='40%' height={40} />

            {/* Type badge */}
            <Skeleton
              variant='rounded'
              width={90}
              height={26}
              sx={{ borderRadius: 99, mb: 2 }}
            />

            {/* Contact */}
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Skeleton variant='text' width='25%' />
              <Skeleton variant='text' width='25%' />
            </Box>
          </Box>
        </Box>

        {/* Info Cards */}
        <Grid container spacing={2} mb={2}>
          {Array.from(new Array(4)).map((_, i) => (
            <Grid size={3} key={i}>
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: 3,
                  background: '#f8fafb',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Skeleton variant='circular' width={45} height={45} />

                <Box sx={{ width: '100%' }}>
                  <Skeleton variant='text' width='60%' />
                  <Skeleton variant='text' width='40%' height={28} />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Table */}
        <Box className='table-holder'>
          <Box
            sx={{
              borderRadius: '14px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(1, 74, 91, 0.08)',
              backgroundColor: 'white',
            }}
          >
            {/* header fake row */}
            <Box
              sx={{
                display: 'flex',
                backgroundColor: 'white',
                borderBottom: '1px solid rgba(1, 74, 91, 0.12)',
                padding: '12px',
              }}
            >
              {Array.from(new Array(6)).map((_, i) => (
                <Box
                  key={i}
                  sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}
                >
                  <Skeleton width='60%' />
                </Box>
              ))}
            </Box>

            {/* body */}
            {Array.from(new Array(5)).map((_, i) => (
              <Box
                key={i}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px',
                  borderBottom: '1px solid #eef1f1',
                  backgroundColor: i % 2 === 0 ? '#fff' : '#f9fafb',
                  transition: 'background-color 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(1, 74, 91, 0.05)',
                  },
                }}
              >
                {Array.from(new Array(5)).map((_, j) => (
                  <Box key={j} sx={{ flex: 1, textAlign: 'center' }}>
                    <Skeleton variant='text' width='70%' sx={{ mx: 'auto' }} />
                  </Box>
                ))}

                {/* actions column */}
                <Box sx={{ flex: 1, textAlign: 'center' }}>
                  <Skeleton
                    variant='rounded'
                    width={80}
                    height={28}
                    sx={{ mx: 'auto', borderRadius: '99px' }}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </PageContainer>
  );
}
