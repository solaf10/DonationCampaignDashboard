import { Avatar, Box, Grid, Typography } from '@mui/material';
import PageTable from '../components/PageTable';
import PageContainer from '../components/PageContainer';
import {
  AttachMoneyOutlined,
  MonetizationOnOutlined,
  PaymentsOutlined,
  ReceiptLongOutlined,
  ShowChartOutlined,
  Title,
} from '@mui/icons-material';
import DonorsInfoCard from '../components/DonorsInfoCard';
import { useSingleDonar } from '../customHooks/queries/useDonars';
import { useParams } from 'react-router-dom';
import { getCurrency } from '../utils/methods';
import InfoCard from '../components/InfoCard';
import PersonIcon from '@mui/icons-material/Person';
import { formatDate } from '../customHooks/useGetCampaignsLogic';
import DonarDetailsSkeleton from '../components/Skeletons/DonarDetailsSkeleton';
import PaycheckVerifyModal from '../components/PaycheckVerifyModal';

const columns = [
  { id: 'last_donation', label: 'آخر تبرع' },
  { id: 'date', label: 'تاريخ الاستحقاق' },
  { id: 'campaignName', label: 'الحملة', width: '180px' },
  { id: 'method', label: 'نوع التبرع' },
  { id: 'status', label: 'حالة التبرع' },
  { id: 'pending', label: 'حالة الدفع' },
  { id: 'verify', label: 'الإجراءات' },
];

const DonarDetails = () => {
  const params = useParams();
  const id = params.id;

  const {
    data: donarDetailsData,
    isFetching: isFetchingDonar,
    error: donarError,
  } = useSingleDonar(id);

  const donar = donarDetailsData?.data || null;

  const { user } = donar || { user: null };

  const userTypeBg =
    user?.type === 'منظمات'
      ? '#e8f5e9'
      : user?.type === 'فرد'
        ? '#eaf2ff'
        : '#f3e5f5';
  const userTypeColor =
    user?.type === 'منظمات'
      ? '#2e7d32'
      : user?.type === 'فرد'
        ? '#35618f'
        : '#6a1b9a';

  const infos = [
    {
      id: 1,
      title: 'إجمالي التبرعات',
      value: donar?.total_donations,
      icon: <AttachMoneyOutlined className='icon' />,
      bg: '#e8f5e9',
      color: '#2e7d32', // success
    },
    {
      id: 2,
      title: 'عدد التبرعات',
      value: donar?.donations_count,
      icon: <ReceiptLongOutlined className='icon' />,
      bg: '#eaf2ff',
      color: '#35618f', // draft / info
    },
    {
      id: 3,
      title: 'متوسط التبرعات',
      value: donar?.average_donations,
      icon: <ShowChartOutlined className='icon' />,
      bg: '#f3e5f5',
      color: '#6a1b9a', // completed
    },
    {
      id: 4,
      title: 'آخر تبرع',
      value: `${donar?.last_donation?.amount} ${getCurrency(
        donar?.last_donation?.currency_type,
      )}`,
      icon: <PaymentsOutlined className='icon' />,
      bg: '#fff3e0',
      color: '#ed6c02', // warning
    },
  ];

  const rows = donar?.donations?.map((donation) => ({
    ...donation,
    name: donation?.user?.name,
    date: formatDate(donation?.date),
    campaignName: donation?.campaing?.name,
    last_donation: `${donation?.last_donation}\u00A0${getCurrency(donation?.currency_type)}`,
  }));

  const infoCards = infos.map((info) => (
    <Grid key={info.id} size={3}>
      <InfoCard
        icon={info.icon}
        title={info.title}
        value={info.value}
        bg={info.bg}
        color={info.color}
      />
    </Grid>
  ));

  if (isFetchingDonar) return <DonarDetailsSkeleton />;
  return (
    <PageContainer>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 3,
          mb: 2,
          p: 3,
          borderRadius: 4,
          background: '#f8fafb',
        }}
      >
        {/* Avatar */}
        <Avatar
          src={
            user?.profile && user.profile !== 'null' ? user.profile : undefined
          }
          sx={{
            width: 110,
            height: 110,
            border: '4px solid white',
            backgroundColor: '#d9d9d9',
          }}
        >
          {!user?.profile && <PersonIcon sx={{ fontSize: 50 }} />}
        </Avatar>

        {/* Info */}
        <Box sx={{ flex: 1 }}>
          {/* Name */}
          <Typography
            sx={{
              fontSize: '28px',
              fontWeight: 700,
              mb: 0.5,
            }}
          >
            {user?.name}
          </Typography>

          {/* Type badge */}
          <Box
            sx={{
              display: 'inline-block',
              px: 1.5,
              py: 0.3,
              borderRadius: 99,
              fontSize: 12,
              bgcolor: userTypeBg,
              color: userTypeColor,
              mb: 2,
            }}
          >
            {user?.type}
          </Box>

          {/* Contact */}
          <Box
            sx={{
              display: 'flex',
              gap: 3,
              flexWrap: 'wrap',
              color: 'text.secondary',
              fontSize: 14,
            }}
          >
            <span>📧 {user?.email}</span>
            <span>📱 {user?.phone}</span>
          </Box>
        </Box>
      </Box>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {infoCards}
      </Grid>
      <PageTable
        columns={columns}
        rows={rows}
        /* isLoading={isDonarsFetching} */
        /* hasNoResult={isFiltered && rows?.length === 0} */
        /* error={donarsError?.message} */
      />
      <PaycheckVerifyModal />
    </PageContainer>
  );
};

export default DonarDetails;
