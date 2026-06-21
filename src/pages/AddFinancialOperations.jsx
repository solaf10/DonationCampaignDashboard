import { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  MenuItem,
  TextField,
  Typography,
  Paper,
  Divider,
  Button,
  Chip,
  Fade,
  Select,
  FormControl,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import React from 'react';
import { Link } from 'react-router-dom';
import CustomInput from '../components/locations/CustomInput';
import PageContainer from '../components/PageContainer';
import Title from '../components/Title';
import {
  useAddPayment,
  useDetails,
  useProjects,
} from '../customHooks/queries/usePayments';
import { useNavigate } from 'react-router-dom';
export default function AddFinancialOperations() {
  const navigate = useNavigate();
  const styles = {
    marginBottom: '16px',
  };
  const [formData, setFormData] = useState({
    project: '',
    project_name: '',
    detail: '',
    detail_name: '',
    pending_date: null,
    paid_amount: '',
  });
  const {
    data: projectData,
    isPending: isFetchingProjectDetails,
    error: projectDetailsError,
  } = useProjects();

  console.log(projectData);

  const {
    data: detailsData,
    isPending: isFetchingDetails,
    // error: detailsError,
  } = useDetails(formData.project);
  const {
    mutate: addPayment,
    isPending: isAdding,
    // error: addError,
    // isSuccess,
  } = useAddPayment();

  const projects = projectData?.data || [];
  const details = detailsData?.data || [];
  console.log(details);
  // console.log(projectDetailsError);
  // console.log(isFetchingProjectDetails);

  const handleProjectChange = (e) => {
    const value = e?.target?.value ?? e;
    const selectedProject = projects.find((p) => p.uuid === value);
    setFormData((prev) => ({
      ...prev,
      project: value,
      project_name: selectedProject?.name || '',
      detail: '',
      detail_name: '',
    }));
  };
  // console.log(projectData?.data?.[0]?.name);
  // console.log(projectData?.data);
  // console.log(isFetchingProjectDetails);
  // console.log(projectDetailsError);
  const handleSubmit = () => {
    const payload = {
      project_uuid: formData.project,
      detail_uuid: formData.detail,
      pending_date: formData.pending_date?.format('YYYY-MM-DD'),
      paid_amount: formData.paid_amount,
    };
    console.log(payload);
    addPayment(payload, {
      onSuccess: () => {
        navigate('/content/financial-operations');
      },
      onError: (error) => {
        console.log('صار خطأ:', error);
      },
    });
  };

  return (
    <div>
      <PageContainer className={'title'}>
        {/* حطي الـ Link بس على العنوان أو زر رجوع */}
        <Link to={'/content/financial-operations'}>
          <Title
            pageTitle='إضافة عملية مالية'
            subtitle='يمكنك إضافة عملية دفع واحدة فقط للتفصيل خلال اليوم'
          />
        </Link>
        <Box
          sx={{
            flex: 1,
            height: '300px',
            backgroundColor: '#fff',
            borderRadius: '14px',
            padding: 3,
            boxShadow: '0 4px 12px rgba(1,74,91,0.08)',
          }}
        >
          <Grid container spacing={4}>
            <Grid size={6}>
              <CustomInput
                styles={styles}
                inputType='select'
                label='اسم المشروع'
                value={formData.project}
                setValue={handleProjectChange}
                // errorMsg={error.government}
                InputProps={{
                  startAdornment: (
                    <FolderOpenIcon sx={{ color: '#aaa', fontSize: 18 }} />
                  ),
                }}
              >
                <MenuItem value='' disabled>
                  اختر المشروع...
                </MenuItem>

                {projects?.map((project, index) => (
                  <MenuItem key={project.uuid} value={project.uuid}>
                    {project.name}
                  </MenuItem>
                ))}
              </CustomInput>
            </Grid>
            <Grid size={6}>
              <CustomInput
                inputType='select'
                styles={styles}
                label='التفاصيل'
                value={formData.detail}
                setValue={(value) => {
                  console.log('detail value:', value); // ← شوفي شو بيوصل
                  const selectedDetail = details.find((d) => d.uuid === value);
                  setFormData((prev) => ({
                    ...prev,
                    detail: value,
                    detail_name: selectedDetail?.name,
                  }));
                }}
                disabled={!formData.project || isFetchingDetails}
                helperText={
                  !formData.project
                    ? 'اختر المشروع أولاً'
                    : details.length === 0 && !isFetchingDetails
                      ? 'لا توجد تفاصيل لهذا المشروع'
                      : ''
                }
              >
                <MenuItem value='' disabled>
                  {isFetchingDetails
                    ? 'جاري التحميل...'
                    : details.length === 0
                      ? 'لا توجد تفاصيل'
                      : 'اختر التفاصيل...'}
                </MenuItem>
                {details.map((detail, index) => (
                  <MenuItem key={detail.uuid} value={detail.uuid}>
                    {detail.name}
                  </MenuItem>
                ))}
              </CustomInput>
            </Grid>
            <Grid size={6}>
              <CustomInput
                label='تاريخ الدفع'
                inputType='time'
                placeholder='مثال: 00:00'
                styles={styles}
                value={formData.pending_date || null}
                setValue={(newValue) =>
                  setFormData((prev) => ({
                    ...prev,
                    pending_date: newValue,
                  }))
                }
                isNestedState={true}
                // errorMsg={errors?.start_time || null}
                isRequired={true}
              />
            </Grid>
            <div
              className='input-holder'
              // style={styles}
            >
              <CustomInput
                label='الكلفة المقدرة'
                styles={styles}
                inputType='input'
                placeholder='أدخل الكلفة التقديرية للمشروع'
                value={formData.paid_amount || ''}
                setValue={(e) => {
                  const value = e.target.value;

                  if (!isNaN(value)) {
                    setFormData((prev) => ({
                      ...prev,
                      paid_amount: value,
                    }));
                  }
                }}
                isNestedState={true}
                // errorMsg={errors?.estimated_cost || null}
                isRequired={true}
              />
            </div>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
              onClick={handleSubmit}
              disabled={
                !formData.project ||
                !formData.detail ||
                !formData.pending_date ||
                !formData.paid_amount ||
                isAdding
              }
              variant='contained'
              sx={{
                color: 'white',
                backgroundColor: 'var(--main-color)',
                px: 4,
              }}
            >
              {isAdding ? 'جاري الحفظ...' : 'حفظ العملية'}
            </Button>
          </Box>
        </Box>
      </PageContainer>
    </div>
  );
}
