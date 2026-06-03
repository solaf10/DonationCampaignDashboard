import { useEffect, useState } from 'react';
import CustomModal from './CustomModal';
import CustomInput from './locations/CustomInput';
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { controlControlLocationModal } from '../redux/slices/ModalContollerSlice';
import { useGetStatus } from '../customHooks/queries/useCampaigns';
import useProjects from '../customHooks/queries/useProjects';
import Location from './Stepper/Projects/Location';
import { useFilteredCampaigns } from '../contexts/FilterCampaignsContext';
import { hasFormData } from '../utils/methods';

const checkboxStyle = {
  '&.Mui-checked': {
    color: 'var(--main-color)',
  },
};
const subtitleStyles = {
  fontSize: '16px',
  marginBottom: '-10px',
};

const FilterCampaignsModal = ({
  refilterCampaigns,
  isFiltering,
  filterCampaignsError,
  isFilterSuccess,
}) => {
  const { formData, setFormData, isFiltered, setIsFiltered } =
    useFilteredCampaigns();
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({
    government: null,
    city: null,
    district_uuid: null,
    project: null,
  });

  const isModalOpen = useSelector(
    (state) => state.modalController.isControlLocationModalOpen,
  );

  const dispatch = useDispatch();

  const {
    data: statusData,
    error: statusError,
    isFetching: isGettingStatus,
  } = useGetStatus();

  const statusCases = statusData?.data || [];

  // fetch projects
  const {
    data: projectsData,
    isPending: isFetchingProjects,
    error: projectsError,
  } = useProjects();

  const projects =
    projectsData?.data?.filter((project) =>
      formData.district_uuid
        ? project?.district?.uuid === formData.district_uuid
        : formData.city
          ? project?.district?.city?.uuid === formData.city
          : formData.government
            ? project?.district?.city?.governorate?.uuid === formData.government
            : true,
    ) || [];

  const handleCheckbox = (value) => {
    setFormData((prev) => ({
      ...prev,
      status: [
        ...(prev.status.includes(value)
          ? prev.status.filter((s) => s !== value)
          : [...prev.status, value]),
      ],
    }));
  };

  const isFilterEnabled = hasFormData(formData);
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    if (!isFilterEnabled) {
      setIsFiltered(false);
      return;
    }
    setIsFiltered(true);
    refilterCampaigns();
  };

  useEffect(() => {
    if (isFilterSuccess && isModalOpen) {
      dispatch(
        controlControlLocationModal({
          type: 'add',
          id: null,
        }),
      );
      setIsFiltered(false);
    }
  }, [isFilterSuccess, setIsFiltered, isModalOpen]);

  const handleResetFilters = () => {
    setFormData((prev) => ({
      ...prev,
      government: '',
      city: '',
      district_uuid: '',
      project_uuid: '',
      status: [],
    }));
  };

  return (
    <CustomModal
      isOpen={isModalOpen}
      modalTitle='تصفية متقدمة'
      submitBtnTitle='تطبيق'
      onSubmit={handleSubmit}
      isLoading={isFiltered ? isFiltering : false}
      isDisabled={!isFilterEnabled}
      closeHandler={() =>
        dispatch(
          controlControlLocationModal({
            type: 'add',
            id: null,
          }),
        )
      }
      extraActions={
        <Button
          variant='contained'
          sx={{
            marginLeft: '8px',
            minWidth: '85px',
            borderRadius: '999px',
            padding: '8px 24px',
            backgroundColor: '#E5E7EB',
            color: '#1F1F1F',
            boxShadow: 'none',
            transition: '0.5s',
            '&:hover': {
              boxShadow: 'none',
              transform: ' translateY(-1px)',
            },
          }}
          onClick={handleResetFilters}
        >
          إعادة التعيين
        </Button>
      }
    >
      {(error || filterCampaignsError) && (
        <Typography
          sx={{
            fontFamily: 'Cairo',
            fontSize: '14px',
            color: '#B3261E',
            backgroundColor: '#FDECEC',
            padding: '10px 12px',
            borderRadius: '8px',
          }}
        >
          {filterCampaignsError?.message || error}
        </Typography>
      )}
      <h2 style={subtitleStyles}>معلومات المكان والمشروع</h2>

      <Location formData={formData} setFormData={setFormData} errors={errors} />
      <CustomInput
        inputType='autocomplete'
        label='المشروع'
        value={
          projects.find((project) => project.uuid === formData.project_uuid) ||
          null
        }
        setValue={(project) =>
          setFormData((prev) => ({
            ...prev,
            project_uuid: project?.uuid || '',
          }))
        }
        placeholder='ابحث عن مشروع...'
        isNestedState={true}
      >
        {projects}
      </CustomInput>

      <h2 style={subtitleStyles}>حالة الحملة</h2>
      <div
        className='checkboxes-holder'
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        {statusCases?.map((status) => (
          <FormControlLabel
            control={
              <Checkbox
                key={status}
                checked={formData.status.includes(status)}
                onChange={() => handleCheckbox(status)}
                sx={checkboxStyle}
              />
            }
            label={status}
            sx={{
              fontWeight: '400',
              color: '#374151',
              fontFamily: 'Cairo',
            }}
          />
        ))}
      </div>
    </CustomModal>
  );
};

export default FilterCampaignsModal;
