import React, { useState } from 'react';
import useProjects from '../customHooks/queries/useProjects';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Container, Grid, IconButton, Typography } from '@mui/material';
import { AddRounded, FilterList } from '@mui/icons-material';
import CustomInput from '../components/locations/CustomInput';
import FilterDrawer from '../components/FilterDrawer';
import Title from '../components/Title';
import PageTable from '../components/PageTable';
export default function FinancialOperations() {
  const [openFilter, setOpenFilter] = useState(false);
  const {
    data: projectsData,
    // isPending: isFetchingProjects,
    // error: projectsError,
  } = useProjects();
  // const navigate = useNavigate();
  const projects = projectsData?.data || [];
  const columns = [
    { id: 'project-name', label: 'اسم المشروع' },
    { id: 'details', label: 'تفاصيل المشروع' },
    { id: 'pending-date', label: ' تاريخ الدفع' },
    { id: 'cost', label: ' الكلفة' },
    { id: 'paid-amount', label: ' المبلغ المدفوع' },
    { id: 'remaining-amount', label: ' المبلغ المتبقي' },
    { id: 'status', label: 'الحالة' },
    { id: 'action', label: 'الإجراءات' },
  ];
  const rows = [
    {
      name: 'حملة رمضان',
      type: 'تبرعات',
      /* status: <button onClick={() => setIsOpen(true)}>edit</button>, */
      status: 'مكتملة',
    },
  ];
  return (
    <Container className='projects' maxWidth='lg' sx={{ px: 2 }}>
      {/* <Grid container spacing={4} className="title">
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          //  key={index}
        >
          {" "}
          <Typography
            fontWeight={700}
            lineHeight={1.8}
            className={"Toastify__toast-body"}
            // onClick={() => navigate(-1)}
            sx={{
              fontSize: "var(--main-title-font)",
              color: "var(--toastify-color-dark);",
              cursor: "pointer",
            }}
          >
            إضافة عملية مالية{" "}
          </Typography>
          <Typography
            lineHeight={1.8}
            className={"Toastify__toast-body"}
            // onClick={() => navigate(-1)}
            sx={{
              fontFamily: "-apple-system",
              fontSize: "var(--body-text)",
              color: " #7a7a7a",
              marginBottom: "24px",
            }}
          >
            يمكنك إضافة عملية دفع واحدة فقط للتفصيل خلال اليوم{" "}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          //  key={index}
        >
          <Link to="/content/financial-operations/add" className="btn">
            <span>إضافة عملية مالية</span>
            <AddRounded />
          </Link>
        </Grid>
      </Grid> */}
      <Title pageTitle='إدارة العمليات المالية' subtitle=''>
        <Link to='/content/financial-operations/add' className='btn'>
          <span>إضافة عملية مالية</span>
          <AddRounded />
        </Link>
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

          <p style={{ fontSize: '14px' }}>عدد التفاصيل {projects.length}</p>
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
          <FilterList className='icon' />
        </IconButton>
      </div>

      <FilterDrawer open={openFilter} onClose={() => setOpenFilter(false)} />

      {/* <Box
        sx={{
          width: "100%",
          direction: "ltr",
          display: "flex",
          justifyContent: "center",
        }}
      > */}
      <PageTable
        columns={columns}
        rows={rows}
        oageLink='/content/financial-operations'
      />
      {/* <Grid container spacing={4} alignItems="stretch" sx={{ width: "100%" }}>
          {projects.map((project) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              size={3}
              key={project.uuid}
              sx={{ display: "flex" }}
            >
              {/* <ProjectCard
                name={project.name}
                governorate_name={
                  project.district.city.governorate.governorate_name
                }
                cover_image={config.baseUrl + project.cover_image}
                progress_precentage={project.progress_percentage}
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
          ))}
        </Grid> */}
      {/* </Box> */}

      {/* Pagination */}
      {/* <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <CustomPagination
          count={projects.length}
          page={page}
          rowsPerPage={8}
          onPageChange={setPage}
        />
      </Box>
      <DeleteItemLogic
        deletedItemTitle="المشروع"
        baseQuery={["projects"]}
        url={deletedItemUrl}
      /> */}
    </Container>
  );
}
