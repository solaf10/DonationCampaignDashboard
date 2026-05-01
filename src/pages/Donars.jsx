import { Box, Grid, InputAdornment, TextField } from '@mui/material';
import PageContainer from '../components/PageContainer';
import Title from '../components/Title';
import SearchIcon from '@mui/icons-material/Search';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import {
  HistoryEduOutlined,
  VolunteerActivismOutlined,
} from '@mui/icons-material';
import DonorsInfoCard from '../components/DonorsInfoCard';
import StarDonarsSection from '../components/StarDonarsSection';

const infos = [
  {
    id: 1,
    icon: <GroupsOutlinedIcon className='icon' />,
    label: 'إجمالي المتبرعين',
    value: '5345',
    details: {
      label: 'هذا الشهر',
      value: '+89 جديد',
    },
  },
  {
    id: 2,
    icon: <AttachMoneyOutlinedIcon className='icon' />,
    label: 'إجمالي التبرعات',
    value: '600,000$',
    details: {
      label: 'هذا الشهر',
      value: '3000$+',
    },
  },
  {
    id: 3,
    icon: <HistoryEduOutlined className='icon' />,
    label: 'إجمالي التعهدات',
    value: '230,000$',
    details: {
      label: 'مسدد',
      value: '43',
    },
  },
  {
    id: 4,
    icon: <VolunteerActivismOutlined className='icon' />,
    label: 'متوسط التبرع',
    value: '89,000$',
    details: {
      label: 'أعلى تبرع',
      value: '3000$',
    },
  },
];

const topDonors = [
  {
    id: 1,
    name: 'أحمد محمد',
    type: 'فرد',
    amount: '100,000 ل.س',
    image: '/1st-place-medal.png',
  },
  {
    id: 2,
    name: 'شركة النور',
    type: 'منظمة',
    amount: '500,000 ل.س',
    image: '/2nd-place-medal.png',
  },
  {
    id: 3,
    name: 'خالد العلي',
    type: 'رجل أعمال',
    amount: '1,200,000 ل.س',
  },
  {
    id: 4,
    name: 'مبادرة الخير',
    type: 'منظمة',
    amount: '300,000 ل.س',
  },
  {
    id: 5,
    name: 'سارة حسن',
    type: 'فرد',
    amount: '75,000 ل.س',
  },
];

const Donars = () => {
  const searchInputStyles = {
    width: '500px',
    height: '48px',
    justifyContent: 'center',
    px: 2,
    border: '1px solid #e0e0e0',
    borderRadius: 3,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  };
  const infoCards = infos.map((info) => (
    <DonorsInfoCard
      size={3}
      key={info.id}
      icon={info.icon}
      label={info.label}
      value={info.value}
      details={info.details}
    />
  ));
  return (
    <PageContainer>
      <Title pageTitle='إدارة المتبرعين'>
        {/*  البحث */}
        <TextField
          fullWidth
          placeholder='ابحث حسب الاسم'
          variant='standard'
          InputProps={{
            disableUnderline: true,
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon sx={{ color: 'gray' }} />
              </InputAdornment>
            ),
          }}
          sx={searchInputStyles}
        />
      </Title>
      <Grid container spacing={2} marginBottom={2}>
        {infoCards}
      </Grid>
      <Grid container spacing={3}>
        <Grid size={6}>
          <h2
            style={{
              fontSize: '32px',
              fontWeight: '600',
              marginBottom: '8px',
            }}
          >
            أبرز المتبرعين
          </h2>
          <StarDonarsSection topDonors={topDonors} />
        </Grid>
        <Grid size={6}></Grid>
      </Grid>
    </PageContainer>
  );
};

export default Donars;
