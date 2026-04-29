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
    mb: 3.5,
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
      <Grid container spacing={2}>
        {infoCards}
      </Grid>
    </PageContainer>
  );
};

export default Donars;
