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
import FilterListIcon from '@mui/icons-material/FilterList';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AddRounded, FilterAltOutlined } from '@mui/icons-material';
import CustomInput from '../components/locations/CustomInput';
import SuccessMessageDialog from '../components/SuccessMessageDialog';
import DeleteItemLogic from '../components/DeleteItemLogic';
import CustomPagination from '../components/CustomPagination';
import config from '../constants/enviroment';
import { useDispatch, useSelector } from 'react-redux';
import ProjectCardSkeleton from '../components/Skeletons/ProjectCardSkeleton';
import ProjectFilterDrawer from '../components/ProjectFilterDrawer';
import { controlControlLocationModal } from '../redux/slices/ModalContollerSlice';
import { useFilters } from '../contexts/FilterContext';
import TableMessage from '../components/TableMessage';
import useRestore from '../customHooks/mutations/useRestore';
import useGetProjectsLogic from '../customHooks/useGetProjectsLogic';

export default function Projects({ isTrash = false }) {
  const { projectFilters, setProjectFilters } = useFilters();

  const [page, setPage] = useState(0);

  const dispatch = useDispatch();

  const {
    projects,
    isFetchingProjects,
    isFiltering,
    projectsError,
    filterProjectsError,
    refetch,
    hasFilters,
  } = useGetProjectsLogic(isTrash);

  // PaginationLogic
  const itemsPerPage = 8;
  const navigate = useNavigate();

  const startIndex = page * itemsPerPage;

  const paginatedProjects = projects?.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // deleteLogic
  const deletedItemID = useSelector(
    (state) => state.modalController.clickedDialogID,
  );
  const deletedItemUrl = `/${config.projects.delete}/${deletedItemID}`;

  useEffect(() => {
    const totalPages = Math.ceil(projects?.length / itemsPerPage);

    if (page >= totalPages && totalPages > 0) {
      setPage(totalPages - 1);
    }

    if (totalPages === 0) {
      setPage(0);
    }
  }, [projects?.length, page]);

  // RestoreLogic
  const { mutate: restore, isPending: isRestoring } = useRestore(['projects']);

  const cards =
    isFetchingProjects || isFiltering || isRestoring
      ? Array.from({ length: 8 }).map((_, index) => (
          <Grid item size={3} key={index}>
            <ProjectCardSkeleton isTrash={isTrash} />
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
              status={project.status}
              uuid={project.uuid}
              isTrash={isTrash}
              onDetailsClick={() => navigate(`/projects/${project.uuid}`)}
              restore={restore}
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

      {!isTrash && (
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
              value={projectFilters?.name || ''}
              setValue={(e) =>
                setProjectFilters((prev) => ({ ...prev, name: e.target.value }))
              }
              isNestedState={true}
            />

            <p style={{ fontSize: '14px' }}>عدد الحملات: {projects?.length}</p>
          </div>
          <IconButton
            onClick={() =>
              dispatch(controlControlLocationModal({ type: 'add', id: null }))
            }
            sx={{
              backgroundColor: '#eeeeee',
              borderRadius: 2,
              m: 1,
            }}
            className='filter-btn'
          >
            <FilterAltOutlined className='icon' />
          </IconButton>
        </div>
      )}

      {/* <FilterDrawer open={openFilter} onClose={() => setOpenFilter(false)} /> */}
      <ProjectFilterDrawer
        refilterProjects={refetch}
        filterProjectsError={filterProjectsError}
      />

      <Box
        sx={{
          width: '100%',
          direction: 'ltr',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: '100%',
            minHeight: 450,
            mt: 2,
          }}
        >
          {projectsError ? (
            <Box
              sx={{
                height: 450,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TableMessage
                message={
                  projectsError?.message || 'حدث خطأ أثناء تحميل المشاريع'
                }
                isError={true}
              />
            </Box>
          ) : !isFetchingProjects && !isFiltering && projects?.length === 0 ? (
            <Box
              sx={{
                height: 450,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '475px',
                  borderRadius: '14px',
                  backgroundColor: 'white',
                }}
              >
                <TableMessage
                  message={
                    hasFilters
                      ? 'لا توجد مشاريع مطابقة للفلاتر المحددة'
                      : 'لا توجد مشاريع حالياً'
                  }
                />
              </Box>
            </Box>
          ) : (
            <Grid
              container
              spacing={3}
              alignItems='stretch'
              sx={{ width: '100%' }}
            >
              {cards}
            </Grid>
          )}
        </Box>
      </Box>

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <CustomPagination
          count={projects?.length || 0}
          page={page}
          rowsPerPage={8}
          onPageChange={setPage}
        />
      </Box>
      {!isTrash && (
        <DeleteItemLogic
          deletedItemTitle='المشروع'
          baseQuery={['projects']}
          url={deletedItemUrl}
        />
      )}
    </Container>
  );
}
