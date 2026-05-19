import { useEffect, useState } from 'react';
import CustomModal from '../components/CustomModal';
import CustomInput from '../components/locations/CustomInput';
import { Checkbox, FormControlLabel, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { controlControlLocationModal } from '../redux/slices/ModalContollerSlice';
import useAddGovernment from '../customHooks/mutations/useAddGovernment';

const ControlLocationModal = ({ title, locationType, isEdit }) => {
  const [government, setGovernment] = useState('');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [project, setProject] = useState('');
  const [status, setStatus] = useState({
    upcoming: false,
    finished: false,
    ongoing: false,
  });
  const [errors, setErrors] = useState({
    government: null,
    city: null,
    area: null,
    project: null,
  });
  const isModalOpen = useSelector(
    (state) => state.modalController.isControlLocationModalOpen,
  );

  const { mutate: addGovernment, isPending: isAdding } = useAddGovernment();

  const dispatch = useDispatch();

  const checkboxStyle = {
    '&.Mui-checked': {
      color: 'var(--main-color)',
    },
  };
  const subtitleStyles = {
    fontSize: '16px',
    marginBottom: '-10px',
  };

  const checkboxInps = [
    { id: 1, label: 'لم تبدأ', value: 'upcoming' },
    { id: 2, label: 'منتهية', value: 'finished' },
    { id: 3, label: 'نشطة', value: 'ongoing' },
  ];

  const handleCheckbox = (key) => {
    setStatus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (locationType === 'governments' && !!government.trim()) {
      addGovernment(government, {
        onSuccess: () => {
          setGovernment('');
        },
        onError: (err) =>
          setErrors((prev) => ({ ...prev, government: err.message })),
      });
    }
  };
  useEffect(() => {
    const clearErrorOnchange = () => {
      if (errors.government) {
        setErrors({
          government: null,
          city: null,
          area: null,
          project: null,
        });
      }
    };
    clearErrorOnchange();
  }, [government]);

  const isProject = locationType === 'projects';
  return (
    <CustomModal
      isOpen={isModalOpen}
      closeHandler={() => dispatch(controlControlLocationModal())}
      modalTitle={title}
      submitBtnTitle={isEdit ? 'تعديل' : isProject ? 'تعيين' : 'إضافة'}
      onSubmit={handleSubmit}
      isLoading={isAdding}
    >
      {isProject && <h2 style={subtitleStyles}>معلومات المكان والمشروع</h2>}
      <CustomInput
        inputType={locationType === 'governments' ? 'input' : 'select'}
        isDisabled={false}
        label='المحافظة'
        value={government}
        setValue={setGovernment}
        errorMsg={errors.government ? errors.government : null}
      >
        <MenuItem value='homs'>حمص</MenuItem>
        <MenuItem value='hama'>حماة</MenuItem>
      </CustomInput>
      {locationType != 'governments' && (
        <CustomInput
          inputType={locationType === 'cities' ? 'input' : 'select'}
          isDisabled={government === ''}
          helperText='يتم تفعيل هذا الحقل بعد اختيار المحافظة'
          label='المدينة'
          value={city}
          setValue={setCity}
        >
          <MenuItem value='homs'>حمص</MenuItem>
          <MenuItem value='hama'>حماة</MenuItem>
        </CustomInput>
      )}
      {(locationType == 'areas' || locationType == 'projects') && (
        <CustomInput
          inputType={locationType === 'areas' ? 'input' : 'select'}
          isDisabled={city === ''}
          helperText='يتم تفعيل هذا الحقل بعد اختيار المدينة'
          label='المنطقة'
          value={area}
          setValue={setArea}
        />
      )}
      {isProject && (
        <CustomInput
          inputType={isProject ? 'input' : 'select'}
          isDisabled={project === ''}
          helperText='يتم تفعيل هذا الحقل بعد اختيار المنطقة'
          label='المشروع'
          value={project}
          setValue={setProject}
        />
      )}
      {isProject && (
        <>
          <h2 style={subtitleStyles}>حالة الحملة</h2>
          <div
            className='checkboxes-holder'
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            {checkboxInps.map((inp) => (
              <FormControlLabel
                control={
                  <Checkbox
                    key={inp.id}
                    checked={status[inp.value]}
                    onChange={() => handleCheckbox(inp.value)}
                    sx={checkboxStyle}
                  />
                }
                label={inp.label}
                sx={{
                  fontWeight: '400',
                  color: '#374151',
                  fontFamily: 'Cairo',
                }}
              />
            ))}
          </div>
        </>
      )}
    </CustomModal>
  );
};

export default ControlLocationModal;
