import { useEffect } from 'react';
import {
  Drawer,
  Box,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Slider,
  MenuItem,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

import { useDispatch, useSelector } from 'react-redux';

import Location from './Stepper/Projects/Location';
import CustomInput from './locations/CustomInput';

import { useFilters } from '../contexts/FilterContext';
import {
  useGetFundingSources,
  useGetSectors,
  useGetStatus,
} from '../customHooks/queries/useProjects';
import ErrorMessage from './Messages/ErrorMessage';

const checkboxStyle = {
  '&.Mui-checked': {
    color: 'var(--main-color)',
  },
};

const ProjectFilterDrawer = ({ refilterProjects, filterProjectsError }) => {
  const { projectFilters, setProjectFilters } = useFilters();

  const isOpen = useSelector(
    (state) => state.modalController.isControlLocationModalOpen,
  );

  const dispatch = useDispatch();

  const {
    data: sectorsData,
    isFetching: isFetchingSectors,
    error: sectorsError,
  } = useGetSectors();
  const sectors =
    sectorsData?.data?.filter((sector) => sector !== 'غير ذلك') || [];

  const {
    data: statusData,
    /* isFetching: isFetchingStatus,
    error: statusError, */
  } = useGetStatus();
  const status = statusData?.data || [];

  const {
    data: fundingSrcData,
    isFetching: isFetchingFundingSrc,
    error: fundingSrcError,
  } = useGetFundingSources();
  const funders = fundingSrcData?.data || [];

  useEffect(() => {
    refilterProjects();
  }, [projectFilters, refilterProjects]);

  const handleCheckbox = (value) => {
    setProjectFilters((prev) => ({
      ...prev,
      status: prev.status.includes(value)
        ? prev.status.filter((s) => s !== value)
        : [...prev.status, value],
    }));
  };

  const handleReset = () => {
    setProjectFilters((prev) => ({
      ...prev,
      government: '',
      city: '',
      district_uuid: '',
      funding_source: '',
      sector: '',
      status: [],
      progress_percentage: 0,
    }));
  };

  const handleClose = () =>
    dispatch({
      type: 'modalController/controlControlLocationModal',
      payload: { type: 'add', id: null },
    });

  return (
    <Drawer anchor='right' open={isOpen} onClose={handleClose}>
      <Box
        sx={{
          width: 320,
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography fontSize={20} fontWeight='bold'>
            تصفية متقدمة
          </Typography>

          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {filterProjectsError && (
          <ErrorMessage>{filterProjectsError.message}</ErrorMessage>
        )}

        {/* الموقع */}
        <Location formData={projectFilters} setFormData={setProjectFilters} />

        <CustomInput
          label='الجهة الممولة'
          inputType='select'
          value={projectFilters.funding_source || ''}
          setValue={(e) =>
            setProjectFilters((prev) => ({
              ...prev,
              funding_source: e.target.value,
            }))
          }
          isNestedState={true}
          isDisabled={isFetchingFundingSrc}
          helperText={
            isFetchingFundingSrc
              ? 'جارِ جلب الجهات الممولة...'
              : fundingSrcError
                ? 'حدث خطأ أثناء جلب الجهات الممولة'
                : funders.length === 0
                  ? 'لا توجد جهات ممولة حالياً'
                  : ''
          }
          isRequired={true}
        >
          {funders.map((src) => (
            <MenuItem key={src} value={src}>
              {src}
            </MenuItem>
          ))}
        </CustomInput>

        {/* الحالة */}
        <Typography fontSize={16} fontWeight='bold'>
          حالة المشروع
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {status.map((status) => (
            <FormControlLabel
              key={status}
              control={
                <Checkbox
                  checked={projectFilters.status.includes(status)}
                  onChange={() => handleCheckbox(status)}
                  sx={checkboxStyle}
                />
              }
              label={status}
            />
          ))}
        </Box>

        <CustomInput
          label='القطاع'
          inputType='select'
          value={projectFilters.sector || ''}
          setValue={(e) =>
            setProjectFilters((prev) => ({
              ...prev,
              sector: e.target.value,
            }))
          }
          isNestedState={true}
          isDisabled={isFetchingSectors}
          helperText={
            isFetchingSectors
              ? 'جارِ جلب القطاعات...'
              : sectorsError
                ? 'حدث خطأ أثناء جلب القطاعات'
                : sectors.length === 0
                  ? 'لا توجد قطاعات متاحة حالياً'
                  : ''
          }
        >
          {sectors.map((sector) => (
            <MenuItem key={sector} value={sector}>
              {sector}
            </MenuItem>
          ))}
        </CustomInput>

        {/* نسبة الإنجاز */}
        <Typography fontSize={16} fontWeight='bold'>
          نسبة الإنجاز
        </Typography>

        <Box px={1}>
          <Slider
            value={projectFilters.progress_percentage}
            onChange={(_, value) =>
              setProjectFilters((prev) => ({
                ...prev,
                progress_percentage: value,
              }))
            }
            valueLabelDisplay='auto'
            sx={{
              color: 'var(--main-color)',
            }}
          />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography fontSize={13}>
              {projectFilters?.progress_percentage}%
            </Typography>
            <Typography fontSize={13}>100%</Typography>
          </Box>
        </Box>

        {/* Reset */}
        <Button
          variant='contained'
          onClick={handleReset}
          sx={{
            mt: 2,
            borderRadius: '999px',
            backgroundColor: '#E5E7EB',
            color: '#000',
            boxShadow: 'none',

            '&:hover': {
              boxShadow: 'none',
              backgroundColor: '#D1D5DB',
            },
          }}
        >
          إعادة تعيين
        </Button>
      </Box>
    </Drawer>
  );
};

export default ProjectFilterDrawer;
