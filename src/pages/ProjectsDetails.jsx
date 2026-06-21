import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import {
  Grid,
  Card,
  Typography,
  Box,
  Chip,
  Avatar,
  LinearProgress,
  IconButton,
  Button,
} from '@mui/material';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CategoryIcon from '@mui/icons-material/Category';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSingleProject } from '../customHooks/queries/useProjects';
import MediaSection from '../components/MediaSection';
import { AddRounded, ChevronLeft } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import {
  controlAddBySelectionModal,
  controlSuccessDialog,
} from '../redux/slices/ModalContollerSlice';
import config from '../constants/enviroment';
import ProjectsBill from '../components/ProjectsBill';
import DeleteItemLogic from '../components/DeleteItemLogic';
import Requirements from '../components/Requirements';
import CampaignDetailsSkeleton from '../components/Skeletons/CampaignDetailsSkeleton';
import ControlMediaModal from '../components/ControlMediaModal';
import ProjectMediaCard from '../components/ProjectMediaCard';
import InfoCard from '../components/InfoCard';
import LinkIcon from '@mui/icons-material/Link';
import AddBySelectionModal from '../components/AddBySelectionModal';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

const getStatusColor = (status) => {
  switch (status) {
    case 'مخطط له':
      return 'draft-status';

    case 'قيد التنفيذ':
      return 'warning-status';

    case 'مكتمل':
      return 'success-status';

    case 'متوقف':
      return 'error-status';

    default:
      return 'draft-status';
  }
};

const buttonStyles = {
  height: '40px',
  padding: ' 0px 16px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',

  backgroundColor: 'transparent',
  border: '1px solid var(--border-color)',
  color: '#333',

  borderRadius: '99px',
  fontSize: '14px',
  fontWeight: '500',
  transition: 'all 0.2s ease',
  boxShadow: 'none',
  '&:hover': {
    boxShadow: 'none',
    background: 'rgba(255, 255, 255, 0.15)',
    transform: 'translateY(-1px)',
  },
};

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: projectData,
    isPending: isFetchingProjectDetails,
    error: projectDetailsError,
  } = useSingleProject(id);

  const project = projectData?.data?.project || null;
  const campaign = projectData?.data?.campaigns?.[0] || null;
  const progressValue = parseInt(project?.progress_percentage || '') || 0;

  const requirements = project?.requirements
    ?.split(/[،,\n]/)
    .map((item) =>
      item
        .replace(/^\d+_/, '') // يحذف 1_ أو 2_
        .trim(),
    )
    .filter(Boolean);

  const dispatch = useDispatch();

  const deletedItemID = useSelector(
    (state) => state.modalController.clickedDialogID,
  );
  const deletedItemUrl = `/${config.projects.delete}/${deletedItemID}`;

  if (isFetchingProjectDetails)
    return <CampaignDetailsSkeleton infos={[...Array(6)]} />;

  if (!project) {
    return (
      <Box sx={{ p: 5 }}>
        <Typography>المشروع غير موجود</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100%',
      }}
    >
      <Box
        sx={{
          width: '100%',
          px: { xs: 2, md: 5 },
          py: 3,
        }}
      >
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
              onClick={() => navigate(-1)}
              sx={{
                color: '#C7BFB6',
                cursor: 'pointer',
                fontWeight: 700,
              }}
            >
              إدارة المشاريع
            </Typography>

            <ChevronLeft
              sx={{
                color: '#C7BFB6',
                fontSize: 32,
              }}
            />

            <Typography
              sx={{
                color: 'var(--main-color)',
                fontWeight: 700,
              }}
            >
              {project?.name}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              onClick={() =>
                campaign
                  ? navigate(`/content/campaigns/${campaign?.uuid}`)
                  : dispatch(controlAddBySelectionModal(project?.uuid))
              }
              startIcon={campaign ? <VisibilityOutlinedIcon /> : <LinkIcon />}
              sx={{
                ...buttonStyles,
                gap: '0px',

                // الحالة المرتبطة
                ...(campaign
                  ? {
                      border: '1px solid #c8e6c9',
                      color: '#2e7d32',
                      backgroundColor: '#f1f8f4',
                      '&:hover': {
                        backgroundColor: '#e8f5e9',
                      },
                    }
                  : {
                      border: '1px solid var(--main-color)',
                      color: 'white',
                      backgroundColor: 'var(--main-color)',
                      '&:hover': {
                        backgroundColor: '#0e7c7b',
                      },
                    }),
              }}
            >
              {campaign ? 'عرض الحملة' : 'ربط بحملة'}
            </Button>
            <Button
              variant='contained'
              startIcon={<EditIcon />}
              onClick={() => navigate(`/content/projects/edit/${id}`)}
              sx={buttonStyles}
            >
              تعديل
            </Button>

            <Button
              variant='outlined'
              startIcon={<DeleteIcon />}
              sx={{
                ...buttonStyles,
                color: '#d32f2f',
                borderColor: '#d32f2f',
                '&:hover': {
                  borderColor: '#b71c1c',
                  bgcolor: '#fff5f5',
                },
              }}
              onClick={() =>
                dispatch(
                  controlSuccessDialog({
                    type: 'delete-project',
                    id: project?.uuid,
                  }),
                )
              }
            >
              حذف
            </Button>
          </Box>
        </Box>
        {/* COVER */}
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
            src={config.baseUrl + project?.cover_image}
            alt={project?.name}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />

          {/* Overlay */}
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
              label={project?.status}
              size='small'
              sx={{
                width: 'fit-content',
                mb: 1,
                py: 2,
                px: 1,
                fontWeight: 700,
              }}
              className={`status-conditions ${getStatusColor(project?.status)}`}
            />

            <Typography
              variant='h2'
              sx={{
                mb: 2,
                fontSize: {
                  xs: 26,
                  md: 58,
                },
                fontWeight: 700,
                lineHeight: 1.1,
              }}
            >
              {project?.name}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                gap: 1.5,
                flexWrap: 'wrap',
              }}
            >
              <Chip
                icon={
                  <LocationOnIcon
                    sx={{
                      color: 'white !important',
                    }}
                  />
                }
                label={
                  project?.district?.city?.governorate?.governorate_name +
                  ' - ' +
                  project?.district?.city?.city_name +
                  ' - ' +
                  project?.district?.district_name
                }
                sx={{
                  bgcolor: 'rgba(255,255,255,0.14)',
                  color: 'white',
                  backdropFilter: 'blur(10px)',
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* INFO CARDS */}
        <Grid container spacing={2} mb={4}>
          <Grid size={4}>
            <InfoCard
              icon={<LinkIcon />}
              title='الحملة المرتبطة'
              value={campaign ? campaign?.name : 'غير مرتبط بعد'}
              bg='#e8f5e9'
              color='#457461'
            />
          </Grid>

          <Grid size={4}>
            <InfoCard
              icon={<CategoryIcon />}
              title='القطاع'
              value={
                project?.on_the_other_hand
                  ? project?.on_the_other_hand
                  : project?.sector
              }
              bg='#e3f2fd'
              color='#1565c0'
            />
          </Grid>

          <Grid size={4}>
            <InfoCard
              icon={<BusinessIcon />}
              title='الجهة المنفذة'
              value={project?.funding_source}
              bg='#fff3e0'
              color='#ef6c00'
            />
          </Grid>

          <Grid size={4}>
            <InfoCard
              icon={<AccountBalanceIcon />}
              title='الجهة الممولة'
              value={project?.Implementing_party}
              bg='#fce4ec'
              color='#c2185b'
            />
          </Grid>

          <Grid size={4}>
            <InfoCard
              icon={<AttachMoneyIcon />}
              title='الكلفة'
              value={`${project?.estimated_cost}`}
              bg='#e8f5e9'
              color='#2e7d32'
            />
          </Grid>

          {/* Progress */}
          <Grid size={4}>
            <Card
              sx={{
                p: 2.5,
                borderRadius: 4,
                bgcolor: '#f8fafb',
                height: '100%',
                boxShadow: '0 4px 18px rgba(0,0,0,0.07)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar
                  sx={{
                    bgcolor: '#e3f2fd',
                    color: '#1565c0',
                  }}
                >
                  <CalendarMonthIcon />
                </Avatar>

                <Box sx={{ width: '100%' }}>
                  <Typography variant='caption'>نسبة الإنجاز</Typography>

                  <Typography fontWeight={700}>{progressValue}%</Typography>

                  <LinearProgress
                    variant='determinate'
                    value={progressValue}
                    sx={{
                      mt: 1,
                      height: 8,
                      borderRadius: 5,
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#1565c0',
                      },
                    }}
                  />
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>

        {/* REQUIREMENTS + BILL */}
        <Grid container spacing={3} sx={{ mt: 4 }}>
          {/* REQUIREMENTS */}
          <Requirements
            secTitle='متطلبات المشروع'
            requirements={requirements}
          />

          {/* BILL */}
          <ProjectsBill details={project?.details} projectID={project?.uuid} />
        </Grid>

        {/* Image GALLERY */}
        <ProjectMediaCard
          title='صور المشروع'
          mediaType='image'
          mediaItems={project?.images}
          altBase={project?.name}
        />

        {/* Videos GALLERY */}
        <ProjectMediaCard
          title='فيديوهات المشروع'
          mediaType='video'
          mediaItems={project?.videos}
          altBase={project?.name}
        />
      </Box>

      {/* {typeof deletedItemID === 'string' && !deletedItemID.includes('/') && */}
      <DeleteItemLogic
        deletedItemTitle='المشروع'
        baseQuery={['projects']}
        url={deletedItemUrl}
        onSuccess={() => navigate('/content/projects')}
        modalType='delete-project'
      />

      <AddBySelectionModal
        entriesType='campaigns'
        modalTitle='ربط المشروع بحملة'
      />
    </Box>
  );
}
