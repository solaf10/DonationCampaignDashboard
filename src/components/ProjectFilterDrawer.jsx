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

  return (
    <>
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
    </>
  );
};

export default ProjectFilterDrawer;
