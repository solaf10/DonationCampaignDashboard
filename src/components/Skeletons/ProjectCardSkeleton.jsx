import { Card, CardContent, Skeleton, Box } from '@mui/material';

export default function ProjectCardSkeleton({ isTrash = false }) {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: '300px',
        width: '100%',
        borderRadius: 2,
      }}
    >
      {/* الصورة */}
      <Skeleton variant='rectangular' height={180} animation='wave' />
      <CardContent
        sx={{
          p: 2,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
        }}
      >
        {/* العنوان */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Skeleton
            variant='text'
            height={30}
            width='80%'
            sx={{ mx: 'auto' }}
          />
          <Skeleton
            variant='text'
            height={30}
            width='55%'
            sx={{ mx: 'auto' }}
          />
        </Box>

        {/* الموقع */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Skeleton variant='circular' width={20} height={20} />
          <Skeleton variant='text' width={100} />
        </Box>

        {/* القطاع + التكلفة */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Skeleton variant='text' width={80} />
          <Skeleton variant='text' width={100} />
        </Box>

        {/* شريط التقدم */}
        <Box sx={{ pt: 1 }}>
          <Skeleton variant='rounded' height={10} animation='wave' />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: 1,
            }}
          >
            <Skeleton variant='text' width={70} />
            <Skeleton variant='text' width={120} />
          </Box>
        </Box>

        {/* الأزرار */}
        {isTrash ? (
          <Skeleton
            variant='rounded'
            width='100%'
            height={36}
            sx={{ borderRadius: 99 }}
          />
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 'auto',
              pt: 2,
            }}
          >
            <Skeleton
              variant='rounded'
              width={110}
              height={36}
              sx={{ borderRadius: 2 }}
            />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Skeleton variant='circular' width={34} height={34} />
              <Skeleton variant='circular' width={34} height={34} />
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
