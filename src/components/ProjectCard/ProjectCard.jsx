import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  LinearProgress,
  IconButton,
  Button,
  Chip,
} from '@mui/material';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { RecyclingRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { controlSuccessDialog } from '../../redux/slices/ModalContollerSlice';
import SuccessMessageDialog from '../SuccessMessageDialog';
import { getStatusColor } from '../../utils/methods';
import config from '../../constants/enviroment';

export default function ProjectCard({
  uuid,
  name,
  governorate_name,
  estimated_cost,
  progress_percentage,
  cover_image,
  sector,
  status,
  isTrash,
  restore,
}) {
  const navigate = useNavigate();

  const progressValue = parseInt(progress_percentage) || 0;

  const remainingPrecentage = 100 - progressValue;

  const dispatch = useDispatch();

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: '300px',
        width: '100%',
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
        '&:hover': {
          boxShadow: 4,
        },
      }}
    >
      {/* حالة المشروع */}
      <Chip
        label={status}
        size='small'
        className={'status-conditions ' + getStatusColor(status || '')}
        sx={{
          position: 'absolute',
          top: 12,
          left: 12,
          zIndex: 2,

          fontWeight: 700,
          px: 1,
          backdropFilter: 'blur(6px)',

          '& .MuiChip-label': {
            px: 1,
          },
        }}
      />

      <CardMedia
        component='img'
        height='180'
        image={cover_image || 'https://via.placeholder.com/300'}
        alt='project'
        sx={{
          aspectRatio: '16/11',
          width: '100%',
          objectFit: 'cover',
        }}
      />

      <CardContent
        sx={{
          p: 2,
          pb: 1,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          textAlign: 'right',
        }}
      >
        {/* العنوان */}
        <Typography
          variant='subtitle1'
          fontWeight='bold'
          sx={{
            textAlign: 'center',
            overflow: 'hidden',
            textOverflow: 'ellipsis',

            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,

            lineHeight: 1.6,
            height: '3.2em', // سطرين
          }}
        >
          {name}
        </Typography>

        {/* الموقع */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: 'text.secondary',
            mb: 0.5,
            justifyContent: 'flex-start',
          }}
        >
          <LocationOnIcon
            fontSize='small'
            sx={{ color: 'var(--main-color)' }}
          />
          <Typography variant='body2' sx={{ fontSize: 16 }}>
            {governorate_name}
          </Typography>
        </Box>

        {/* التصنيف والسعر */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            direction: 'rtl',
            border: 'none',
          }}
        >
          <Typography sx={{ color: '#ed6c02', fontWeight: 600, fontSize: 13 }}>
            {sector}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography fontWeight='bold' fontSize={15}>
              {estimated_cost}
            </Typography>
          </Box>
        </Box>

        {/* التقدم */}
        <Box sx={{ pt: 1, border: 'none', direction: 'rtl' }}>
          <LinearProgress
            variant='determinate'
            value={progressValue}
            sx={{
              height: 7,
              borderRadius: 5,
              mb: 0.7,
              backgroundColor: '#e0e0e0',
              '& .MuiLinearProgress-bar': {
                backgroundColor: 'var(--main-color)',
              },
            }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant='caption'>
              %متبقي {remainingPrecentage}
            </Typography>
            <Typography variant='caption'>
              %{progressValue} نسبة إنجاز المشروع
            </Typography>
          </Box>
        </Box>

        {/* الأزرار */}

        {isTrash ? (
          <div className='table-holder'>
            <Button
              className='button restore'
              onClick={() => restore(`/${config.projects.restore}/${uuid}`)}
              sx={{ width: '100%', mt: 1.5, gap: 1 }}
            >
              <RecyclingRounded fortSize='small' />
              <span>استعادة</span>
            </Button>
          </div>
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              pt: 2,
              direction: 'rtl',
              border: 'none',
            }}
          >
            {/* أيقونات التعديل والحذف */}

            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                size='small'
                sx={{ color: '#607d8b', border: '1px solid #e0e0e0' }}
                onClick={() => navigate(`/content/projects/edit/${uuid}`)}
              >
                <EditOutlinedIcon fontSize='small' />
              </IconButton>
              <IconButton
                size='small'
                sx={{
                  color: 'red',
                  border: '1px solid #ffcccc',
                  backgroundColor: '#fff5f5',
                }}
                onClick={() =>
                  dispatch(controlSuccessDialog({ type: 'delete', id: uuid }))
                }
              >
                <DeleteOutlinedIcon fontSize='small' />
              </IconButton>
            </Box>

            <Button
              variant='contained'
              size='small'
              onClick={() => navigate(`/content/projects/${uuid}`)}
              sx={{
                backgroundColor: 'var(--main-color)',
                color: 'white',
                px: 3,
                borderRadius: 2,
                textTransform: 'none',
                '&:hover': { backgroundColor: 'var(--main-color)' },
                fontSize: 13,
              }}
            >
              معرفة المزيد
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
