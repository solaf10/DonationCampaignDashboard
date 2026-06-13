import { Grid, Box, IconButton } from '@mui/material';
import { useState } from 'react';
import config from '../constants/enviroment';
import CloseIcon from '@mui/icons-material/Close';
import ControlMediaModal from './ControlMediaModal';
import DeleteItemLogic from './DeleteItemLogic';
import { useLocation, useParams } from 'react-router-dom';
import { controlSuccessDialog } from '../redux/slices/ModalContollerSlice';
import { useDispatch } from 'react-redux';

/* تحويل روابط يوتيوب لأي صيغة إلى embed */
const getYoutubeEmbedUrl = (url) => {
  if (!url) return '';

  // shorts
  if (url?.includes('/shorts/')) {
    const id = url.split('/shorts/')[1].split('?')[0];
    return `https://www.youtube.com/embed/${id}`;
  }

  // watch
  if (url?.includes('watch?v=')) {
    const id = url.split('watch?v=')[1].split('&')[0];
    return `https://www.youtube.com/embed/${id}`;
  }

  // youtu.be
  if (url?.includes('youtu.be/')) {
    const id = url.split('youtu.be/')[1].split('?')[0];
    return `https://www.youtube.com/embed/${id}`;
  }

  return url;
};

const MediaSection = ({
  mediaType = 'image',
  mediaItems,
  altBase,
  isDeleteMode,
}) => {
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const [lightboxMedia, setLightboxMedia] = useState(null);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(null);

  const isVideo = mediaType === 'video';
  const isProject = location.pathname?.includes('project');

  const projectDeletedMedia = isVideo
    ? config.projects.media.deleteVideo
    : config.projects.media.deleteImage;
  const newsDeletedMedia = isVideo
    ? config.news.media.deleteVideo
    : config.news.media.deleteImage;

  const deletedItemUrl = `/${isProject ? projectDeletedMedia : newsDeletedMedia}/${params?.id}/${selectedMediaIndex}`;

  const handleDelete = (mediaIndex) => {
    (dispatch(
      controlSuccessDialog({
        type: `delete-${mediaType}`,
        id: mediaIndex,
      }),
    ),
      setSelectedMediaIndex(mediaIndex));
  };
  return (
    <>
      <Grid container spacing={4}>
        {mediaItems?.map((item, index) => (
          <Grid size={4} key={item?.index}>
            {isVideo ? (
              <Box sx={{ position: 'relative' }}>
                <Box
                  component='iframe'
                  src={getYoutubeEmbedUrl(item?.url)}
                  sx={{
                    width: '100%',
                    height: 260,
                    borderRadius: 4,
                    border: 'none',
                  }}
                  allow='autoplay; encrypted-media'
                  allowFullScreen
                />
                {isDeleteMode && (
                  <IconButton
                    onClick={() => handleDelete(item?.index)}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      left: 8,
                      bgcolor: 'rgba(0,0,0,.65)',
                      color: '#fff',
                    }}
                  >
                    <CloseIcon fontSize='small' />
                  </IconButton>
                )}
              </Box>
            ) : (
              <Box
                sx={{
                  position: 'relative',
                }}
              >
                <Box
                  component='img'
                  src={config.baseUrl + item.url}
                  alt={`${altBase}-${index + 1}`}
                  onClick={() => setLightboxMedia(item.url)}
                  sx={{
                    width: '100%',
                    height: 260,
                    borderRadius: 4,
                    objectFit: 'cover',
                    cursor: 'pointer',
                    transition: '0.3s',
                    '&:hover': {
                      transform: 'scale(1.03)',
                      boxShadow: '0 12px 35px rgba(0,0,0,0.2)',
                    },
                  }}
                />

                {isDeleteMode && (
                  <IconButton
                    onClick={() => handleDelete(item.index)}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      left: 8,
                      bgcolor: 'rgba(0,0,0,.65)',
                      color: '#fff',

                      '&:hover': {
                        bgcolor: 'error.main',
                      },
                    }}
                  >
                    <CloseIcon fontSize='small' />
                  </IconButton>
                )}
              </Box>
            )}
          </Grid>
        ))}

        <ControlMediaModal />
        <DeleteItemLogic
          deletedItemTitle={isVideo ? 'الفيديو' : 'الصورة'}
          baseQuery={[isProject ? 'projects' : 'news', params?.id]}
          url={deletedItemUrl}
          modalType={`delete-${mediaType}`}
        />
      </Grid>

      {/* Lightbox للصور فقط */}
      {lightboxMedia && (
        <Box
          onClick={() => setLightboxMedia(null)}
          sx={{
            position: 'fixed',
            inset: 0,
            bgcolor: 'rgba(0,0,0,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            p: 3,
          }}
        >
          <Box
            component='img'
            src={config.baseUrl + lightboxMedia}
            alt='preview'
            sx={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              borderRadius: 4,
            }}
          />
        </Box>
      )}
    </>
  );
};

export default MediaSection;
