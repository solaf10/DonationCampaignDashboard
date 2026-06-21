import { Box, Button, Card, Typography } from '@mui/material';
import { AddRounded } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { controlControlMediaModal } from '../redux/slices/ModalContollerSlice';
import MediaSection from './MediaSection';
import './ProjectMediaCard.css';
import { useState } from 'react';

const ProjectMediaCard = ({ title, mediaType, mediaItems, altBase }) => {
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const dispatch = useDispatch();

  return (
    <Card
      sx={{
        mt: 4,
        p: 4,
        borderRadius: 5,
        boxShadow: '0 4px 18px rgba(0,0,0,0.07)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Typography variant='h5' sx={{ fontWeight: 800 }}>
          {title}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            startIcon={<AddRounded />}
            className='media-btn'
            onClick={() =>
              dispatch(controlControlMediaModal({ type: mediaType }))
            }
          >
            {mediaType === 'image' ? 'إضافة صورة' : 'إضافة فيديو'}
          </Button>

          <Button
            className={`media-btn ${isDeleteMode ? 'media-btn-active' : ''}`}
            onClick={() => setIsDeleteMode((prev) => !prev)}
          >
            {isDeleteMode
              ? 'إنهاء الحذف'
              : mediaType === 'image'
                ? 'إدارة الصور'
                : 'إدارة الفيديوهات'}
          </Button>
        </Box>
      </Box>

      <MediaSection
        mediaType={mediaType}
        mediaItems={mediaItems}
        altBase={altBase}
        isDeleteMode={isDeleteMode}
      />
    </Card>
  );
};

export default ProjectMediaCard;
