import { Grid, Box } from '@mui/material';
import { useState } from 'react';
import config from '../constants/enviroment';

/* تحويل روابط يوتيوب لأي صيغة إلى embed */
const getYoutubeEmbedUrl = (url) => {
  if (!url) return '';

  // shorts
  if (url.includes('/shorts/')) {
    const id = url.split('/shorts/')[1].split('?')[0];
    return `https://www.youtube.com/embed/${id}`;
  }

  // watch
  if (url.includes('watch?v=')) {
    const id = url.split('watch?v=')[1].split('&')[0];
    return `https://www.youtube.com/embed/${id}`;
  }

  // youtu.be
  if (url.includes('youtu.be/')) {
    const id = url.split('youtu.be/')[1].split('?')[0];
    return `https://www.youtube.com/embed/${id}`;
  }

  return url;
};

const MediaSection = ({ mediaType = 'image', mediaItems, altBase }) => {
  const [lightboxMedia, setLightboxMedia] = useState(null);

  const isVideo = mediaType === 'video';

  return (
    <>
      <Grid container spacing={4}>
        {mediaItems?.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            {isVideo ? (
              <Box
                component='iframe'
                src={getYoutubeEmbedUrl(item.url)}
                sx={{
                  width: '100%',
                  height: 260,
                  borderRadius: 4,
                  border: 'none',
                }}
                allow='autoplay; encrypted-media'
                allowFullScreen
              />
            ) : (
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
            )}
          </Grid>
        ))}
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
