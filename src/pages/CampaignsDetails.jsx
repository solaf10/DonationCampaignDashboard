import { Link } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import {
  AccountBalanceWalletOutlined,
  AddRounded,
  ArrowBackOutlined,
  CalendarTodayOutlined,
  Delete,
  EditCalendarRounded,
  FlagOutlined,
  GroupOutlined,
  TrendingUpOutlined,
} from '@mui/icons-material';
import './CampaignsDetails.css';
import { Box, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { controlAddBySelectionModal } from '../redux/slices/ModalContollerSlice';
import AddModal from '../components/AddBySelectionModal';
import DonorsInfoCard from '../components/DonorsInfoCard';

const relatedProjects = [
  { id: 1, name: 'مشروع التعليم الرقمي', location: 'دمشق، المزة' },
  { id: 2, name: 'منصة التبرعات الذكية', location: 'حلب، الفرقان' },
];

const infos = [
  {
    id: 1,
    icon: <FlagOutlined className='icon' />,
    label: 'المبلغ المستهدف',
    value: '500000000 ل.س',
  },
  {
    id: 2,
    icon: <AccountBalanceWalletOutlined className='icon' />,
    label: 'المبلغ المجموع',
    value: '500000000 ل.س',
  },
  {
    id: 3,
    icon: <GroupOutlined className='icon' />,
    label: 'عدد المتبرعين',
    value: '500',
  },
  {
    id: 4,
    icon: <TrendingUpOutlined className='icon' />,
    label: 'نسبة الإنجاز',
    value: '100%',
  },
];

const CampaignsDetails = () => {
  const dispatch = useDispatch();

  const remainingDays = 3;
  const status = 'ongoing';

  return (
    <div className='campaign-details'>
      <PageContainer>
        {/* 🔥 HERO IMAGE */}
        <div className='image-wrapper'>
          <img src='/campaignLogo1.png' alt='' />

          <div className='overlay' />

          {/* 🔥 الأزرار فوق يسار */}
          <div className='image-actions'>
            <Link to='/content/campaigns/edit/1' className='button'>
              <EditCalendarRounded className='icon' />
              تعديل
            </Link>

            <button className='button delete'>
              <Delete className='icon' />
              حذف
            </button>
          </div>

          {/* 🔥 المحتوى */}
          <div className='image-content'>
            <h2>حملة التعليم</h2>

            <div className='date'>
              <span>
                <CalendarTodayOutlined className='icon' />
                12 مايو 2026
              </span>

              <span className='separator'>
                <ArrowBackOutlined className='arrow-icon' />
              </span>

              <span>
                <CalendarTodayOutlined className='icon' />
                20 مايو 2026
              </span>
            </div>

            {/* 🔥 استخدام status + remainingDays */}
            {status === 'ongoing' && (
              <span className='badge'>متبقي {remainingDays} أيام</span>
            )}

            {status === 'upcoming' && (
              <span className='badge upcoming'>
                تبدأ خلال {remainingDays} أيام
              </span>
            )}

            {status === 'finished' && (
              <span className='badge finished'>انتهت الحملة</span>
            )}
          </div>
        </div>

        {/* 🔥 infos */}
        <Grid container spacing={2} mt={3} className='infos-holder'>
          {infos.map((info) => (
            <DonorsInfoCard
              key={info.id}
              size={3}
              icon={info.icon}
              label={info.label}
              value={info.value}
            />
          ))}
        </Grid>

        {/* 🔥 desc + projects */}
        <Grid container spacing={3} mt={3}>
          <Grid size={6}>
            <Box className='box desc'>
              <img src='/Goal.png' alt='' className='icon' />
              <p>
                تهدف الحملة الى إعادة إعمار سوريا عملية ضخمة ومتعددة الأوجه
                تتطلب استثمارات تقدر بمئات المليارات من الدولارات (تقديرات البنك
                الدولي تشير إلى 216 مليار دولار كحد أدنى، بينما التوقعات قد تصل
                إلى 900 مليار دولار)، وتشمل بناء البنية التحتية (مدارس،
                مستشفيات، طرق، شبكات كهرباء ومياه)، وتطوير الاقتصاد والقطاعات
                الإنتاجية (صناعة وزراعة)، وإعادة بناء النسيج الاجتماعي .
              </p>
            </Box>
          </Grid>

          <Grid size={6}>
            <Box className='related-projects'>
              <div className='section-header'>
                <h3>المشاريع المرتبطة</h3>
              </div>

              <div className='projects-table'>
                {relatedProjects.map((project) => (
                  <Link
                    key={project.id}
                    to={`/content/projects/${project.id}`}
                    className='table-row'
                  >
                    <div className='name'>{project.name}</div>
                    <div className='location'>📍 {project.location}</div>
                  </Link>
                ))}

                <button
                  className='add-row'
                  onClick={() => dispatch(controlAddBySelectionModal())}
                >
                  <AddRounded className='icon' />
                  إضافة مشروع
                </button>
              </div>
            </Box>
          </Grid>
        </Grid>
      </PageContainer>

      <AddModal />
    </div>
  );
};

export default CampaignsDetails;
