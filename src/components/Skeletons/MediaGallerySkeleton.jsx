import { Box, Card, Grid, Skeleton } from '@mui/material';

const cardBg = '#e9eeee';
const skeletonBg = '#d6dddd';

const MediaGallerySkeleton = () => {
  return (
    <Card
      sx={{
        mt: 4,
        p: 4,
        borderRadius: 5,
        backgroundColor: cardBg,
        boxShadow: '0 4px 18px rgba(0,0,0,0.07)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Skeleton
          variant='text'
          width={180}
          height={45}
          sx={{ backgroundColor: skeletonBg }}
        />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Skeleton
            variant='rounded'
            sx={{ borderRadius: '99px' }}
            width={90}
            height={40}
          />
          <Skeleton
            variant='rounded'
            sx={{ borderRadius: '99px' }}
            width={90}
            height={40}
          />
        </Box>
      </Box>

      <Grid container spacing={4}>
        {[1, 2, 3].map((item) => (
          <Grid size={4} key={item}>
            <Skeleton
              variant='rounded'
              animation='wave'
              sx={{
                width: '100%',
                height: 260,
                borderRadius: 4,
                backgroundColor: skeletonBg,
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

export default MediaGallerySkeleton;
