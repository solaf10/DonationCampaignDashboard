import { useEffect } from 'react';
import {
  Drawer,
  Box,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { useGetStatus } from '../customHooks/queries/useCampaigns';
import useProjects from '../customHooks/queries/useProjects';
import Location from './Stepper/Projects/Location';
import CustomInput from './locations/CustomInput';
import { useFilters } from '../contexts/FilterContext';
import CloseIcon from '@mui/icons-material/Close';

const checkboxStyle = {
  '&.Mui-checked': {
    color: 'var(--main-color)',
  },
};

const FilterCampaignsDrawer = ({ refilterCampaigns, filterCampaignsError }) => {
  const { campaignFilters, setCampaignFilters } = useFilters();

  const isOpen = useSelector(
    (state) => state.modalController.isControlLocationModalOpen,
  );

  const dispatch = useDispatch();

  const { data: statusData } = useGetStatus();
  const statusCases = statusData?.data || [];

  const { data: projectsData } = useProjects();

  const projects =
    projectsData?.data?.filter((project) =>
      campaignFilters.district_uuid
        ? project?.district?.uuid === campaignFilters.district_uuid
        : campaignFilters.city
          ? project?.district?.city?.uuid === campaignFilters.city
          : campaignFilters.government
            ? project?.district?.city?.governorate?.uuid ===
              campaignFilters.government
            : true,
    ) || [];

  // 🔥 LIVE FILTER (أي تغيير مباشرة)
  useEffect(() => {
    refilterCampaigns();
  }, [campaignFilters, refilterCampaigns]);

  const handleCheckbox = (value) => {
    setCampaignFilters((prev) => ({
      ...prev,
      status: prev.status.includes(value)
        ? prev.status.filter((s) => s !== value)
        : [...prev.status, value],
    }));
  };

  const handleReset = () => {
    setCampaignFilters((prev) => ({
      ...prev,
      government: '',
      city: '',
      district_uuid: '',
      project_uuid: '',
      status: [],
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

        {filterCampaignsError && (
          <Typography sx={{ color: 'red' }}>
            {filterCampaignsError.message}
          </Typography>
        )}

        {/* نفس تصميمك الأصلي */}
        <Location formData={campaignFilters} setFormData={setCampaignFilters} />

        {/* project autocomplete بنفس CustomInput */}
        <CustomInput
          inputType='autocomplete'
          label='المشروع'
          value={
            projects.find((p) => p.uuid === campaignFilters.project_uuid) ||
            null
          }
          setValue={(project) =>
            setCampaignFilters((prev) => ({
              ...prev,
              project_uuid: project?.uuid || '',
            }))
          }
          placeholder='ابحث عن مشروع...'
          isNestedState
        >
          {projects}
        </CustomInput>

        {/* status */}
        <Typography fontSize={16} fontWeight='bold'>
          حالة الحملة
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {statusCases.map((status) => (
            <FormControlLabel
              key={status}
              control={
                <Checkbox
                  checked={campaignFilters.status.includes(status)}
                  onChange={() => handleCheckbox(status)}
                  sx={checkboxStyle}
                />
              }
              label={status}
            />
          ))}
        </Box>

        {/* RESET فقط */}
        <Button
          variant='contained'
          onClick={handleReset}
          sx={{
            mt: 2,
            borderRadius: '999px',
            backgroundColor: '#E5E7EB',
            color: '#000',
            boxShadow: 'none',
            '&:hover': { boxShadow: 'none' },
          }}
        >
          إعادة تعيين
        </Button>
      </Box>
    </Drawer>
  );
};

export default FilterCampaignsDrawer;
