import { Link, useNavigate, useParams } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import {
  AccountBalanceWalletOutlined,
  AddRounded,
  ArrowBackOutlined,
  CalendarTodayOutlined,
  ChevronLeft,
  Delete,
  EditCalendarRounded,
  FlagOutlined,
  TrendingUpOutlined,
  WorkOutlineOutlined,
} from '@mui/icons-material';
import PauseCircleOutline from '@mui/icons-material/PauseCircleOutline';
import PlayCircleOutline from '@mui/icons-material/PlayCircleOutline';
import './CampaignsDetails.css';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import AddModal from '../components/AddBySelectionModal';
import DonorsInfoCard from '../components/DonorsInfoCard';
import AddBySelectionModal from '../components/AddBySelectionModal';
import Requirements from '../components/Requirements';
import CampaignRelatedProjects from '../components/CampaignRelatedProjects';
import { useSingleCampaign } from '../customHooks/queries/useCampaigns';
import config from '../constants/enviroment';
import {
  formatArabicDate,
  formatArabicTime,
  getCampaignStatusText,
  getStatusColor,
} from '../utils/methods';
import useControlState from '../customHooks/mutations/useControlState';
import { toast } from 'react-toastify';
import DeleteItemLogic from '../components/DeleteItemLogic';
import { useDispatch } from 'react-redux';
import { controlSuccessDialog } from '../redux/slices/ModalContollerSlice';
import CampaignDetailsSkeleton from '../components/Skeletons/CampaignDetailsSkeleton';

const CampaignsDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const {
    data: campaignData,
    isFetching,
    error: campaignError,
  } = useSingleCampaign(params.id);

  const campaign = campaignData?.data || {};

  const infos = [
    {
      id: 1,
      icon: <FlagOutlined className='icon' />,
      label: 'المبلغ المستهدف',
      value: campaign?.target_amount ?? '0$',
    },
    {
      id: 2,
      icon: <AccountBalanceWalletOutlined className='icon' />,
      label: 'المبلغ المجموع',
      value: campaign?.collected_amount ?? '0$',
    },
    {
      id: 3,
      icon: <WorkOutlineOutlined className='icon' />,
      label: 'عدد المشاريع المرتبطة',
      value: campaign?.projects?.length ?? 0,
    },
    {
      id: 4,
      icon: <TrendingUpOutlined className='icon' />,
      label: 'نسبة الإنجاز',
      value: campaign?.progress_percentage ?? '0%',
    },
  ];

  const { mutate: stopCampaign, isPending: isStopping } = useControlState(
    `/${config.campaigns.stop}/${params.id}`,
    ['campaigns', params.id],
  );

  const { mutate: resumeCampaign, isPending: isResumming } = useControlState(
    `/${config.campaigns.resume}/${params.id}`,
    ['campaigns'],
  );

  const handlePause = () => {
    stopCampaign(undefined, {
      onSuccess: () => {
        toast.success('تم إيقاف الحملة بنجاح!');
      },
      onError: (err) => {
        toast.error(err?.message || 'حدث خطأ أثناء إيقاف الحملة');
      },
    });
  };
  const handleResume = () => {
    resumeCampaign(undefined, {
      onSuccess: () => {
        toast.success('تم استئناف الحملة بنجاح!');
      },
      onError: (err) => {
        toast.error(err?.message || 'حدث خطأ أثناء استئناف الحملة');
      },
    });
  };

  /* const handleResume = () => {
    resumeCampaign(undefined, {
      onSuccess: () => {
        toast.success('تم استئناف الحملة بنجاح!');
      },
      onError: (err) => {
        toast.error(err?.message || 'حدث خطأ أثناء الاستئناف');
      },
    });
  }; */

  const deletedItemUrl = `/${config.campaigns.delete}/${params.id}`;

  if (isFetching || isStopping || isResumming)
    return <CampaignDetailsSkeleton />;

  return (
    <div className='campaign-details'>
      <PageContainer>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              fontWeight={700}
              onClick={() => navigate(-1)}
              sx={{
                color: '#C7BFB6',
                cursor: 'pointer',
              }}
            >
              إدارة الحملات
            </Typography>

            <ChevronLeft
              sx={{
                color: '#C7BFB6',
                fontSize: 32,
              }}
            />

            <Typography
              fontWeight={700}
              sx={{
                color: 'var(--main-color)',
              }}
            >
              {campaign?.name}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            {/* 🟠 إيقاف الحملة */}
            {campaign?.status === 'جديدة' && (
              <button className='button warning' onClick={handlePause}>
                <PauseCircleOutline className='icon' />
                إيقاف
              </button>
            )}

            {/* 🟢 استئناف الحملة */}
            {campaign?.status === 'متوقفة' && (
              <button className='button success' onClick={handleResume}>
                <PlayCircleOutline className='icon' />
                استئناف
              </button>
            )}
            <Link
              to={`/content/campaigns/edit/${params.id}`}
              className='button'
            >
              <EditCalendarRounded className='icon' />
              تعديل
            </Link>

            <button
              className='button delete'
              onClick={() => dispatch(controlSuccessDialog(params.id))}
            >
              <Delete className='icon' />
              حذف
            </button>
          </Box>
        </Box>
        {/* 🔥 HERO IMAGE */}
        <Box
          sx={{
            position: 'relative',
            height: { xs: 320, md: '72vh' },
            borderRadius: 5,
            overflow: 'hidden',
            mb: 4,
            boxShadow: '0 15px 50px rgba(0,0,0,0.08)',
          }}
        >
          <Box
            component='img'
            src={config.baseUrl + campaign?.image}
            alt=''
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: ' rgba(0, 0, 0, 0.45);',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              p: { xs: 3, md: 6 },
              color: 'white',
            }}
          >
            <Chip
              label={campaign?.status}
              size='small'
              sx={{
                width: 'fit-content',
                mb: 1,
                py: 2,
                px: 1,
                fontWeight: 700,
              }}
              className={
                'status-conditions ' + getStatusColor(campaign?.status || '')
              }
            />

            <Typography
              variant='h2'
              fontWeight={700}
              sx={{
                mb: 1.5,
                fontSize: {
                  xs: 26,
                  md: 58,
                },
                lineHeight: 1.1,
              }}
            >
              {campaign?.name}
            </Typography>

            <div className='date-block'>
              <div className='date-item'>
                <CalendarTodayOutlined className='icon' />
                <div>
                  <span className='label'>تاريخ البداية</span>
                  <span className='value'>
                    {formatArabicDate(campaign?.start_date)} -{' '}
                    {formatArabicTime(campaign?.start_time)}
                  </span>
                </div>
              </div>

              <div className='date-divider' />

              <div className='date-item'>
                <CalendarTodayOutlined className='icon' />
                <div>
                  <span className='label'>تاريخ النهاية</span>
                  <span className='value'>
                    {formatArabicDate(campaign?.end_date)} -{' '}
                    {formatArabicTime(campaign?.end_time)}
                  </span>
                </div>
              </div>
            </div>

            <Box
              sx={{
                display: 'flex',
                gap: 1.5,
                flexWrap: 'wrap',
              }}
            >
              <Chip
                className='ongoing'
                label={getCampaignStatusText(campaign)?.text}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.14)',
                  color: 'white',
                  backdropFilter: 'blur(10px)',
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* 🔥 infos */}
        <Grid container spacing={2} mt={3} className='infos-holder'>
          {infos.slice(0, 3).map((info) => (
            <DonorsInfoCard
              key={info.id}
              size={4}
              icon={info.icon}
              label={info.label}
              value={info.value}
            />
          ))}
        </Grid>

        {/* 🔥 desc + projects */}
        <Grid container spacing={3} mt={3}>
          <Requirements
            secTitle='أهداف الحملة'
            requirements={campaign?.purposes?.trim().split(/,|،/)}
          />

          <CampaignRelatedProjects
            campaignId={campaign?.uuid}
            projects={campaign?.projects}
          />
        </Grid>
      </PageContainer>

      <AddBySelectionModal
        entriesType='projects'
        modalTitle='إضافة مشاريع مرتبطة'
      />
      <DeleteItemLogic
        deletedItemTitle='الحملة'
        baseQuery={['campaigns']}
        url={deletedItemUrl}
        onSuccess={() => {
          navigate(-1);
        }}
      />
    </div>
  );
};

export default CampaignsDetails;
