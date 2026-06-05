import React, { useEffect, useState } from 'react';
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
import { Link } from 'react-router-dom';
import { AddRounded } from '@mui/icons-material';
import CustomInput from '../components/locations/CustomInput';
import useProjects from '../customHooks/queries/useProjects';
import SuccessMessageDialog from '../components/SuccessMessageDialog';
import DeleteItemLogic from '../components/DeleteItemLogic';
import CustomPagination from '../components/CustomPagination';
import config from '../constants/enviroment';
import { useSelector } from 'react-redux';
import ProjectCardSkeleton from '../components/Skeletons/ProjectCardSkeleton';

export default function Projects({ isTrash = false }) {
  const [openFilter, setOpenFilter] = useState(false);
  const [page, setPage] = useState(0);

  const {
    data: projectsData,
    isPending: isFetchingProjects,
    error: projectsError,
  } = useProjects();

  const projects = projectsData?.data || [];

  const itemsPerPage = 8;
  const navigate = useNavigate();

  const startIndex = page * itemsPerPage;

  const paginatedProjects = projects.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const deletedItemID = useSelector(
    (state) => state.modalController.clickedDialogID,
  );
  const deletedItemUrl = `/${config.projects.delete}/${deletedItemID}`;

  useEffect(() => {
    const totalPages = Math.ceil(projects.length / itemsPerPage);

    if (page >= totalPages && totalPages > 0) {
      setPage(totalPages - 1);
    }

    if (totalPages === 0) {
      setPage(0);
    }
  }, [projects.length, page]);

  const cards = isFetchingProjects
    ? Array.from({ length: 8 }).map((_, index) => (
        <Grid item size={3} key={index}>
          <ProjectCardSkeleton />
        </Grid>
      ))
    : paginatedProjects.map((project) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          size={3}
          key={project.uuid}
          sx={{ display: 'flex' }}
        >
          <ProjectCard
            name={project.name}
            governorate_name={
              project.district.city.governorate.governorate_name
            }
            cover_image={config.baseUrl + project.cover_image}
            progress_percentage={project?.progress_percentage}
            estimated_cost={project.estimated_cost}
            sector={
              project.on_the_other_hand
                ? project.on_the_other_hand
                : project.sector
            }
            uuid={project.uuid}
            isTrash={isTrash}
            onDetailsClick={() => navigate(`/projects/${project.uuid}`)}
          />
        </Grid>
      ));

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

          <p style={{ fontSize: '14px' }}>عدد الحملات: {projects.length}</p>
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
        <Grid container spacing={3} alignItems='stretch' sx={{ width: '100%' }}>
          {cards}
        </Grid>
      </Box>

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <CustomPagination
          count={projects.length}
          page={page}
          rowsPerPage={8}
          onPageChange={setPage}
        />
      </Box>
      <DeleteItemLogic
        deletedItemTitle='المشروع'
        baseQuery={['projects']}
        url={deletedItemUrl}
      />
    </Container>
  );
}
