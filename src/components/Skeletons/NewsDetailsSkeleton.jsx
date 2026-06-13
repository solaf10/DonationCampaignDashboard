import { Box, Card, Skeleton } from '@mui/material';
import PageContainer from '../PageContainer';
import MediaGallerySkeleton from './MediaGallerySkeleton';

const NewsDetailsSkeleton = () => {
  return (
    <PageContainer>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 3,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Skeleton variant='text' width={120} height={30} />
          <Skeleton variant='circular' width={24} height={24} />
          <Skeleton variant='text' width={220} height={30} />
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Skeleton
            variant='rounded'
            width={90}
            height={40}
            sx={{ borderRadius: '99px' }}
          />
          <Skeleton
            variant='rounded'
            width={90}
            height={40}
            sx={{ borderRadius: '99px' }}
          />
        </Box>
      </Box>

      {/* Cover */}
      <Skeleton
        variant='rounded'
        sx={{
          height: { xs: 320, md: '72vh' },
          borderRadius: 5,
          mb: 4,
          bgcolor: '#d9dfdf',
        }}
      />

      {/* Article */}
      <Card
        sx={{
          p: 4,
          borderRadius: 5,
          boxShadow: '0 4px 18px rgba(0,0,0,0.07)',
          mb: 4,
          backgroundColor: '#e9eeee',
        }}
      >
        <Skeleton variant='text' width={180} height={40} sx={{ mb: 2 }} />

        <Skeleton variant='text' width='100%' height={28} />
        <Skeleton variant='text' width='95%' height={28} />
        <Skeleton variant='text' width='92%' height={28} />
        <Skeleton variant='text' width='98%' height={28} />
        <Skeleton variant='text' width='85%' height={28} />
        <Skeleton variant='text' width='90%' height={28} />
        <Skeleton variant='text' width='75%' height={28} />
      </Card>

      {/* Gallery */}
      <MediaGallerySkeleton />
    </PageContainer>
  );
};

export default NewsDetailsSkeleton;
