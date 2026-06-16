import { Box, Button, Card, Chip, Typography } from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { controlSuccessDialog } from '../redux/slices/ModalContollerSlice';
import { useDispatch, useSelector } from 'react-redux';
import config from '../constants/enviroment';
import DeleteItemLogic from '../components/DeleteItemLogic';
import { useSingleNews } from '../customHooks/queries/useNews';
import { ChevronLeft } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ProjectMediaCard from '../components/ProjectMediaCard';
import { formatArabicDate } from '../utils/methods';
import { CalendarIcon } from '@mui/x-date-pickers';
import { useQueryClient } from '@tanstack/react-query';
import NewsDetailsSkeleton from '../components/Skeletons/NewsDetailsSkeleton';

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

const getParagraphs = (text) => {
  return text
    .trim()
    .split(/\r?\n\s*\r?\n+/) // split into paragraphs
    .map((p) =>
      p
        .replace(/\r?\n+/g, ' ') // Merge line breaks داخل الفقرة إلى مسافات (keep it as one paragraph)
        .replace(/\s+/g, ' ') // clean up the res
        .trim(),
    );
};

const NewsDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const id = params?.id;

  const {
    data: newsItemData,
    isPending: isFetchingNewsDetails,
    error: newsDetailsError,
  } = useSingleNews(id);

  const newsItem = newsItemData?.data || null;

  const deletedItemID = useSelector(
    (state) => state.modalController.clickedDialogID,
  );
  const deletedItemUrl = `/${config.news.delete}/${deletedItemID}`;

  const articlesArr = getParagraphs(newsItem?.content || '');

  const articles = articlesArr.map((paragraph, i) => (
    <Typography
      mb={3}
      key={i}
      dangerouslySetInnerHTML={{ __html: paragraph }}
      sx={{
        '& a': {
          color: 'var(--main-color)',
          textDecoration: 'underline',
          fontWeight: 600,
        },

        '& a:hover': {
          opacity: 0.8,
        },
      }}
    />
  ));

  if (isFetchingNewsDetails) return <NewsDetailsSkeleton />;

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
              fontWeight={700}
              onClick={() => navigate(-1)}
              sx={{
                color: '#C7BFB6',
                cursor: 'pointer',
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
              fontWeight={700}
              sx={{
                color: 'var(--main-color)',
              }}
            >
              {newsItem?.title}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant='contained'
              startIcon={<EditIcon />}
              onClick={() => navigate(`/content/news/edit/${id}`)}
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
                    type: 'delete-news',
                    id,
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
            src={config.baseUrl + newsItem?.cover_image}
            alt={newsItem?.title}
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
              label={newsItem?.on_the_other_hand ?? newsItem?.category}
              size='small'
              sx={{
                width: 'fit-content',
                mb: 1,
                py: 2,
                px: 1,
                fontWeight: 700,
                color: 'white',
                backgroundColor: '#457461',
              }}
              className={`status-conditions`}
            />

            <Typography
              variant='h2'
              fontWeight={700}
              sx={{
                mb: 2,
                fontSize: {
                  xs: 26,
                  md: 58,
                },
                lineHeight: 1.1,
              }}
            >
              {newsItem?.title}
            </Typography>
            <Typography
              variant='body2'
              sx={{
                mb: 2.5,
              }}
            >
              {newsItem?.excerpt}
            </Typography>
            <Chip
              icon={
                <CalendarIcon
                  sx={{
                    color: 'white !important',
                  }}
                />
              }
              label={`تم النشر في ${formatArabicDate(newsItem?.publish_date)}`}
              sx={{
                width: 'fit-content',
                bgcolor: 'rgba(255,255,255,0.14)',
                color: 'white',
                backdropFilter: 'blur(10px)',
              }}
            />
          </Box>
        </Box>
        {/* News Content */}
        <Card
          sx={{
            p: 4,
            borderRadius: 5,
            boxShadow: '0 4px 18px rgba(0,0,0,0.07)',
            height: '100%',
          }}
        >
          <Typography variant='h5' fontWeight={800} mb={3}>
            المقال
          </Typography>

          <Box
            sx={{
              /* height: '272px', */
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {articles}
          </Box>
        </Card>

        {/* Image GALLERY */}
        <ProjectMediaCard
          title='صور المشروع'
          mediaType='image'
          mediaItems={newsItem?.images}
          altBase={newsItem?.title}
        />
      </Box>

      {/* {typeof deletedItemID === 'string' && !deletedItemID.includes('/') && */}
      <DeleteItemLogic
        deletedItemTitle='الخبر'
        baseQuery={['news', id]}
        url={deletedItemUrl}
        onSuccess={() => {
          queryClient.invalidateQueries({ queryKey: ['news'] });
          navigate('/content/news');
        }}
        modalType='delete-news'
      />
    </Box>
  );
};

export default NewsDetails;
