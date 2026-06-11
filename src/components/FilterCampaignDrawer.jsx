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

  return (
    <>
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
          projects.find((p) => p.uuid === campaignFilters.project_uuid) || null
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
    </>
  );
};

export default FilterCampaignsDrawer;
