import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Container, Grid, IconButton, Typography } from '@mui/material';
import { AddRounded, FilterList } from '@mui/icons-material';
import CustomInput from '../components/locations/CustomInput';
import FilterDrawer from '../components/FilterDrawer';
import Title from '../components/Title';
import PageTable from '../components/PageTable';
import usePayments from '../customHooks/queries/usePayments';
export default function FinancialOperations() {
  const [openFilter, setOpenFilter] = useState(false);
  // const {
  //   data: paymentsData,
  //   // isPending: isFetchingProjects,
  //   error: paymentsError,
  // } = usePayments();
  // console.log("data =", paymentsData);
  // console.log("error =", paymentsError);
  const {
    data: paymentsData,
    isPending,
    isError,
    error: paymentsError,
  } = usePayments();

  // console.log("isPending =", isPending);
  // console.log("data =", paymentsData?.data);
  // console.log("error =", paymentsError);

  // if (isPending) return <p>جاري التحميل...</p>;
  // if (isError) return <p>حدث خطأ: {paymentsError.message}</p>;
  const navigate = useNavigate();

  /*   if (isPending) return <p>جاري التحميل...</p>;
  if (isError) return <p>حدث خطأ: {paymentsError.message}</p>; */
  // const projects = paymentsData?.data || [];
  const columns = [
    { id: 'project-name', label: 'اسم المشروع' },
    { id: 'details', label: ' المتطلب' },
    { id: 'pending-date', label: ' تاريخ الاستحقاق' },
    { id: 'cost', label: ' الكلفة' },
    { id: 'paid-amount', label: ' المبلغ المدفوع' },
    { id: 'remaining-amount', label: ' المبلغ المتبقي' },
    { id: 'status', label: 'الحالة' },
    { id: 'action', label: 'الإجراءات' },
  ];
  const rows =
    paymentsData?.data?.map((item) => ({
      id: item.uuid,
      project_name: item.project?.name,
      detail: item.detail?.detail,
      pending_date: item.pending_date,
      paid_amount: item.paid_amount,
      cost: item.cost,
      remaining_amount: item.remaining_amount,
      status: parseFloat(item.remaining_amount) === 0 ? 'مكتمل' : 'غير مكتمل',
    })) || [];
  console.log(rows[0]?.status);
  console.log(rows);
  return (
    <Container className='projects' maxWidth='lg' sx={{ px: 2 }}>
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

          {/* <p style={{ fontSize: "14px" }}>عدد التفاصيل {projects.length}</p> */}
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
        pageLink='/content/financial-operations'
        onEdit={(uuid) =>
          navigate(`/content/financial-operations/edit/${uuid}`)
        }
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
