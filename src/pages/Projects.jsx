import React, { useState } from 'react';
import {
  Grid,
  Box,
  Container,
  TextField,
  IconButton,
  InputAdornment,
  Pagination,
} from '@mui/material';

import ProjectCard from '../components/ProjectCard/ProjectCard';
import Title from '../components/Title';
import FilterDrawer from '../components/FilterDrawer';

import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useNavigate } from 'react-router-dom';
import projectsData from '../components/data/ProjectsData';
import { Link } from 'react-router-dom';
import { AddRounded } from '@mui/icons-material';
import CustomInput from '../components/locations/CustomInput';

export default function Projects({ isTrash = false }) {
  const [openFilter, setOpenFilter] = useState(false);
  const [page, setPage] = useState(1);

  const itemsPerPage = 6;
  const navigate = useNavigate();

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedProjects = projectsData.slice(startIndex, endIndex);

  return (
    <Container className='projects' maxWidth='lg' sx={{ px: 2 }}>
      <Title
        pageTitle={isTrash ? 'سلة مهملات المشاريع' : 'إدارة المشاريع'}
        subtitle={isTrash ? 'يمكنك استعادة أو حذف العناصر نهائياً' : null}
      >
        {!isTrash && (
          <Link to='/content/projects/add' className='btn'>
            <span>إضافة مشروع</span>
            <AddRounded />
          </Link>
        )}
      </Title>

      <div className='filters-holder'>
        {/* filter holder */}
        <div className='input-holder'>
          <CustomInput
            inputType='textField'
            placeholder='ابحث حسب الاسم'
            styles={{
              width: '400px',
              height: 'auto',
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'var(--main-color)', // لون اللابل عند focus
              },
            }}
          />

          <p style={{ fontSize: '14px' }}>عدد الحملات: {projectsData.length}</p>
        </div>
        <IconButton
          onClick={() => setOpenFilter(true)}
          sx={{
            backgroundColor: '#eeeeee',
            borderRadius: 2,
            m: 1,
          }}
          className='filter-btn'
        >
          <FilterListIcon className='icon' />
        </IconButton>
      </div>

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
          {paginatedProjects.map((project, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              size={3}
              key={index}
              sx={{ display: 'flex' }}
            >
              <ProjectCard
                project={project}
                isTrash={isTrash}
                onDetailsClick={() => navigate(`/projects/${project.id}`)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Pagination
          count={Math.ceil(projectsData.length / itemsPerPage)}
          page={page}
          onChange={(e, value) => setPage(value)}
          color='primary'
        />
      </Box>
    </Container>
  );
}
