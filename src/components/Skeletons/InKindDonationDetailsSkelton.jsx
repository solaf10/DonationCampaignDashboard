import { Box, Card, Grid, Skeleton } from '@mui/material';
import PageContainer from '../PageContainer';

const InKindDonationDetailsSkelton = () => {
  const cardBg = '#e9eeee';
  const skeletonBg = '#d6dddd';

  return (
    <PageContainer>
      {/* Breadcrumb */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          mb: 3,
        }}
      >
        <Skeleton width={140} height={30} />
        <Skeleton variant="circular" width={20} height={20} />
        <Skeleton width={180} height={30} />
      </Box>

      {/* Hero Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            md: 'row-reverse',
          },
          gap: 2,
          mb: 4,
        }}
      >
        {/* User Card */}
        <Card
          sx={{
            width: { xs: '100%', md: 280 },
            borderRadius: 5,
            overflow: 'hidden',
          }}
        >
          <Skeleton
            variant="rectangular"
            height={90}
            sx={{ bgcolor: skeletonBg }}
          />

          <Box sx={{ textAlign: 'center', mt: -6 }}>
            <Skeleton
              variant="circular"
              width={100}
              height={100}
              sx={{
                mx: 'auto',
                bgcolor: skeletonBg,
              }}
            />

            <Skeleton
              width={120}
              height={30}
              sx={{
                mx: 'auto',
                mt: 1,
              }}
            />

            <Skeleton
              width={80}
              height={28}
              sx={{
                mx: 'auto',
              }}
            />

            <Box p={2}>
              <Skeleton height={60} />
              <Skeleton height={60} />
            </Box>
          </Box>
        </Card>

        {/* Main Image */}
        <Skeleton
          variant="rounded"
          sx={{
            flex: 1,
            height: {
              xs: 280,
              md: '60vh',
            },
            borderRadius: 5,
            bgcolor: skeletonBg,
          }}
        />
      </Box>

      {/* Info Cards */}
      <Grid container spacing={2}>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item}>
            <Box
              sx={{
                p: 3,
                borderRadius: 4,
                bgcolor: cardBg,
                display: 'flex',
                gap: 2,
                alignItems: 'center',
              }}
            >
              <Skeleton
                variant="circular"
                width={56}
                height={56}
                sx={{ bgcolor: skeletonBg }}
              />

              <Box flex={1}>
                <Skeleton
                  width="50%"
                  height={18}
                  sx={{ bgcolor: skeletonBg }}
                />
                <Skeleton
                  width="70%"
                  height={28}
                  sx={{ bgcolor: skeletonBg }}
                />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Donation Images */}
      <Card
        sx={{
          mt: 4,
          p: 4,
          borderRadius: 5,
        }}
      >
        <Skeleton
          width={180}
          height={40}
          sx={{ mb: 3 }}
        />

        <Box
          sx={{
            display: 'flex',
            gap: 3,
          }}
        >
          {[1, 2, 3].map((img) => (
            <Skeleton
              key={img}
              variant="rounded"
              sx={{
                flex: 1,
                height: 260,
                borderRadius: 4,
                bgcolor: skeletonBg,
              }}
            />
          ))}
        </Box>
      </Card>
    </PageContainer>
  );
};

export default InKindDonationDetailsSkelton;