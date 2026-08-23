import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Container, IconButton } from '@mui/material';
import { AddRounded, FilterList } from '@mui/icons-material';
import CustomInput from '../components/locations/CustomInput';
import FilterDrawer from '../components/FilterDrawer';
import Title from '../components/Title';
import PageTable from '../components/PageTable';
import usePayments from '../customHooks/queries/usePayments';
import { useDispatch } from 'react-redux';
import { controlExchangeModal } from '../redux/slices/ModalContollerSlice';
import ExchangeRatesModal from '../components/ExchangeRatesModal';
function FinancialOperations() {
  const [openFilter, setOpenFilter] = useState(false);
  const { data: paymentsData } = usePayments();

  const navigate = useNavigate();

  const columns = [
    { id: 'project_name', label: 'اسم المشروع' },
    { id: 'detail', label: ' المتطلب' },
    { id: 'pending_date', label: ' تاريخ الاستحقاق' },
    { id: 'cost', label: ' الكلفة' },
    { id: 'paid_amount', label: ' المبلغ المدفوع' },
    { id: 'remaining_amount', label: ' المبلغ المتبقي' },
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
  const dispatch = useDispatch();
  return (
    <Container className='projects' maxWidth='lg' sx={{ px: 2 }}>
      <Title pageTitle='إدارة العمليات المالية' subtitle=''>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Link to='/content/financial-operations/add' className='btn'>
            <span>إضافة عملية مالية</span>
            <AddRounded />
          </Link>
          <Button
            className='button'
            onClick={() => dispatch(controlExchangeModal())}
          >
            <div
              className='btn'
              style={{
                backgroundColor: 'var(--secondary-color)',
                color: 'white',
              }}
            >
              <span>إدارة أسعار الصرف</span>
              <AddRounded />
            </div>
          </Button>
        </Box>
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

      <PageTable
        columns={columns}
        rows={rows}
        pageLink='/content/financial-operations'
        onEdit={(uuid) =>
          navigate(`/content/financial-operations/edit/${uuid}`)
        }
        isSelectedEditable={true}
      />
      <ExchangeRatesModal />
    </Container>
  );
}
export default FinancialOperations;
