import { Box, Grid, Skeleton } from '@mui/material';
import PageContainer from '../PageContainer';
import { useLocation } from 'react-router-dom';
import MediaGallerySkeleton from './MediaGallerySkeleton';

const CampaignDetailsSkeleton = ({ infos = [1, 2, 3] }) => {
  const cardBg = '#e9eeee';
  const skeletonBg = '#d6dddd';
  const location = useLocation();
  const isProject = location.pathname.includes('projects');

  return (
    <PageContainer>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Skeleton variant='text' width={120} height={30} />
          <Skeleton variant='circular' width={24} height={24} />
          <Skeleton variant='text' width={180} height={30} />
        </Box>

        {isProject && (
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
        )}
      </Box>

      {/* HERO */}
      <Skeleton
        variant='rounded'
        sx={{
          height: { xs: 320, md: '72vh' },
          borderRadius: 5,
          mb: 4,
          bgcolor: '#d9dfdf',
        }}
      />

      {/* INFOS */}
      <Grid container spacing={2} mt={3}>
        {infos.map((i) => (
          <Grid size={4} key={i}>
            <Box
              sx={{
                p: 2,
                borderRadius: 3,
                bgcolor: cardBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
                minHeight: 90,
              }}
            >
              <Skeleton
                variant='circular'
                width={56}
                height={56}
                sx={{ bgcolor: skeletonBg, flexShrink: 0 }}
              />

              <Box sx={{ flex: 1, textAlign: 'center' }}>
                <Skeleton
                  width='60%'
                  height={14}
                  sx={{ bgcolor: skeletonBg, mx: 'auto', mb: 1 }}
                />
                <Skeleton
                  width='40%'
                  height={22}
                  sx={{ bgcolor: skeletonBg, mx: 'auto' }}
                />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* CONTENT */}
      <Grid container spacing={3} mt={3}>
        <Grid size={6}>
          <Box
            sx={{
              p: 2,
              borderRadius: 3,
              bgcolor: cardBg,
              height: 220,
            }}
          >
            <Skeleton width='50%' height={30} sx={{ bgcolor: skeletonBg }} />
            <Skeleton width='90%' sx={{ bgcolor: skeletonBg }} />
            <Skeleton width='80%' sx={{ bgcolor: skeletonBg }} />
            <Skeleton width='60%' sx={{ bgcolor: skeletonBg }} />
          </Box>
        </Grid>

        {/* RIGHT CARD */}
        <Grid size={6}>
          <Box
            sx={{
              p: 2,
              borderRadius: 3,
              bgcolor: cardBg,
              height: 220,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Skeleton
                variant='text'
                width='50%'
                height={30}
                sx={{ bgcolor: skeletonBg }}
              />
              <Skeleton variant='circular' width={24} height={24} />
            </Box>
            <Skeleton width='90%' sx={{ bgcolor: skeletonBg }} />
            <Skeleton width='80%' sx={{ bgcolor: skeletonBg }} />
            <Skeleton width='60%' sx={{ bgcolor: skeletonBg }} />
          </Box>
        </Grid>
      </Grid>

      {isProject && (
        <>
          <MediaGallerySkeleton />
          <MediaGallerySkeleton />
        </>
      )}
    </PageContainer>
  );
};

export default CampaignDetailsSkeleton;
