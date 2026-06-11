import { Box, Skeleton } from '@mui/material';
import PageContainer from '../PageContainer';
import Title from '../Title';

const InKindDonationSkeleton = () => {
  const cardBg = '#e9eeee';
  const skeletonBg = '#d6dddd';

  return (
    <PageContainer>
      <Title
        pageTitle='إدارة التبرعات'
        subtitle='التبرعات العينية'
      />

      {/* Search + Filter */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          mb: 4,
        }}
      >
        <Box>
          <Skeleton
            variant='rounded'
            width={400}
            height={50}
            sx={{
              bgcolor: skeletonBg,
              borderRadius: 2,
            }}
          />

          <Skeleton
            variant='text'
            width={120}
            height={30}
            sx={{
              mt: 1,
              bgcolor: skeletonBg,
            }}
          />
        </Box>

        <Skeleton
          variant='circular'
          width={48}
          height={48}
          sx={{
            bgcolor: skeletonBg,
          }}
        />
      </Box>

      {/* Table Header */}
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          mb: 1,
        }}
      >
        {[...Array(8)].map((_, i) => (
          <Skeleton
            key={i}
            variant='rounded'
            height={55}
            sx={{
              flex: 1,
              bgcolor: skeletonBg,
            }}
          />
        ))}
      </Box>

      {/* Table Rows */}
      {[...Array(8)].map((_, row) => (
        <Box
          key={row}
          sx={{
            display: 'flex',
            gap: 1,
            mb: 1,
            p: 1,
            borderRadius: 2,
            bgcolor: cardBg,
          }}
        >
          {[...Array(8)].map((_, col) => (
            <Skeleton
              key={col}
              variant='rounded'
              height={60}
              sx={{
                flex: 1,
                bgcolor: skeletonBg,
              }}
            />
          ))}
        </Box>
      ))}
    </PageContainer>
  );
};

export default InKindDonationSkeleton;