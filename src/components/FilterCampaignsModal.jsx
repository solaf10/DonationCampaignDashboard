import { useState } from 'react';
import CustomModal from './CustomModal';
import CustomInput from './locations/CustomInput';
import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  MenuItem,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { controlControlLocationModal } from '../redux/slices/ModalContollerSlice';
import { useGetStatus } from '../customHooks/queries/useCampaigns';
import useProjects from '../customHooks/queries/useProjects';
import Location from './Stepper/Projects/Location';

const checkboxStyle = {
  '&.Mui-checked': {
    color: 'var(--main-color)',
  },
};
const subtitleStyles = {
  fontSize: '16px',
  marginBottom: '-10px',
};

const FilterCampaignsModal = () => {
  const [formData, setFormData] = useState({
    government: '',
    city: '',
    district_uuid: '',
    project_uuid: '',
  });
  const [project, setProject] = useState('');
  /* const [status, setStatus] = useState({
    upcoming: false,
    finished: false,
    ongoing: false,
  }); */
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
    projectsData?.data?.filter(
      (project) => project.district.uuid === formData.district_uuid,
    ) || [];

  /* const handleCheckbox = (key) => {
    setStatus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }; */

  return (
    <CustomModal
      isOpen={isModalOpen}
      modalTitle='تصفية متقدمة'
      submitBtnTitle='تطبيق'
      /* onSubmit={handleSubmit}
      isLoading={isAdding} */
      closeHandler={() =>
        dispatch(
          controlControlLocationModal({
            type: 'add',
            id: null,
          }),
        )
      }
    >
      <h2 style={subtitleStyles}>معلومات المكان والمشروع</h2>

      <Location formData={formData} setFormData={setFormData} errors={errors} />
      <CustomInput
        inputType='autocomplete'
        label='المشروع'
        value={formData}
        setValue={(e) =>
          setFormData((prev) => ({
            ...prev,
            project_uuid: e.target.value,
          }))
        }
        isNestedState={true}
        placeholder='ابحث عن مشروع...'
        isDisabled={formData?.district_uuid === ''}
      >
        {projects}
      </CustomInput>

      <h2 style={subtitleStyles}>حالة الحملة</h2>
      <div
        className='checkboxes-holder'
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        {statusCases?.map((inp) => (
          <FormControlLabel
            control={
              <Checkbox
                key={inp}
                /* checked={status[inp.value]}
                onChange={() => handleCheckbox(inp.value)} */
                sx={checkboxStyle}
              />
            }
            label={inp}
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
