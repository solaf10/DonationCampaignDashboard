import React, { useState } from 'react';
import {
  Grid,
  Box,
  Container,
  TextField,
  IconButton,
  InputAdornment,
} from '@mui/material';

import ProjectCard from '../components/ProjectCard/ProjectCard';
import Title from '../components/Title';
import FilterDrawer from '../components/FilterDrawer';

import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

const projectsData = [
  {
    title: 'مشروع ترميم المنازل',
    category: 'القطاع الإنساني',
    price: '3000.00',
    location: 'دمشق',
    progress: 40,
    image: '../../public/houses-destroyed.jpg',
  },
  {
    title: 'مشروع دعم المستشفيات',
    category: 'القطاع الصحي',
    price: '5000.00',
    location: 'حلب',
    progress: 75,
    image: '../../public/hospital.jpg',
  },
  {
    title: 'مشروع إعادة تأهيل المدارس',
    category: 'القطاع التعليمي',
    price: '2000.00',
    location: 'إدلب',
    progress: 60,
    image: '../../public/school.jpeg',
  },
  {
    title: 'مشروع توزيع سلال غذائية',
    category: 'القطاع الإغاثي',
    price: '1500.00',
    location: 'حمص',
    progress: 85,
    image: '../../public/food-basketss.jpg',
  },
  {
    title: 'مشروع تأمين مياه الشرب',
    category: 'قطاع المياه',
    price: '2500.00',
    location: 'درعا',
    progress: 50,
    image: '../../public/water.jpg',
  },
  {
    title: 'مشروع دعم الأيتام',
    category: 'القطاع الاجتماعي',
    price: '4000.00',
    location: 'اللاذقية',
    progress: 30,
    image: '../../public/orphans.jpg',
  },
  {
    title: 'تأمين مواقف ثابتة للنقل الداخلي ',
    category: 'القطاع الخدمي',
    price: '4000.00',
    location: 'حمص',
    progress: 30,
    image: '../../public/مواقف-ذكية.webp',
  },
];

export default function Projects({ isTrash = false }) {
  const [openFilter, setOpenFilter] = useState(false);

  return (
    <Container maxWidth='lg' sx={{ px: 2 }}>
      <Title
        pageTitle={isTrash ? 'سلة مهملات المشاريع' : 'إدارة المشاريع'}
        subtitle={isTrash ? 'يمكنك استعادة أو حذف العناصر نهائياً' : null}
      >
        {!isTrash && (
          <button className='btn'>
            <span> + إضافة مشروع</span>
          </button>
        )}
      </Title>

      <Box
        sx={{
          width: '100%',
          border: '1px solid #e0e0e0',
          borderRadius: 3,
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#f9f9f9',
          mb: 3.5,
        }}
      >
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
          sx={{ px: 2 }}
        />

        {/*  زر الفلترة */}
        <IconButton
          onClick={() => setOpenFilter(true)}
          sx={{
            backgroundColor: '#eeeeee',
            borderRadius: 2,
            m: 1,
          }}
        >
          <FilterListIcon />
        </IconButton>
      </Box>

      <FilterDrawer open={openFilter} onClose={() => setOpenFilter(false)} />

      <Box
        sx={{
          width: '100%',
          direction: 'ltr',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Grid container spacing={4} alignItems='stretch' sx={{ width: '100%' }}>
          {projectsData.map((project, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              size={3}
              key={index}
              sx={{ display: 'flex' }}
            >
              <ProjectCard project={project} isTrash={isTrash} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
