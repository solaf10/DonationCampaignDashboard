import { useState } from 'react';
import { MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import CustomInput from '../locations/CustomInput';
import CustomModal from '../CustomModal';

import { controlControlLocationModal } from '../../redux/slices/ModalContollerSlice';

import useSubmitAreaForm from '../../customHooks/useSubmitAreaForm';
import ErrorMessage from '../Messages/ErrorMessage';

const AreaModalForm = ({ governments, areas }) => {
  const [government, setGovernment] = useState('');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');

  const [error, setError] = useState({
    government: null,
    city: null,
    area: null,
  });
  const [formError, setFormError] = useState('');

  const isModalOpen = useSelector(
    (state) => state.modalController.isControlLocationModalOpen,
  );

  const operationType = useSelector(
    (state) => state.modalController.controlLocationModalType,
  );

  const governmentState = { government, setGovernment };
  const cityState = { city, setCity };
  const areaState = { area, setArea };
  const errorState = { error, setError };

  const isEdit = operationType === 'edit';

  const {
    handleSubmit,
    isSubmitting,
    hasValidationErrors,
    isFetchingCities,
    citiesFetchingError,
    filteredCities,
  } = useSubmitAreaForm({
    isEdit,
    areas,
    setFormError,
    governmentState,
    cityState,
    areaState,
    errorState,
    isModalOpen,
  });

  const handleGovernmentChange = (value) => {
    setGovernment(value);
    setCity('');
    setError((prev) => ({
      ...prev,
      government: null,
      city: null,
    }));
    setFormError('');
  };

  const handleCityChange = (value) => {
    setCity(value);
    setError((prev) => ({
      ...prev,
      city: null,
    }));
    setFormError('');
  };

  const handleAreaChange = (value) => {
    setArea(value);
    setError((prev) => ({
      ...prev,
      area: null,
    }));
    setFormError('');
  };

  const dispatch = useDispatch();

  return (
    <CustomModal
      isOpen={isModalOpen}
      closeHandler={() =>
        dispatch(
          controlControlLocationModal({
            type: isEdit ? 'edit' : 'add',
            id: null,
          }),
        )
      }
      modalTitle={isEdit ? 'تعديل المنطقة' : 'إضافة منطقة'}
      submitBtnTitle={isEdit ? 'تعديل' : 'إضافة'}
      onSubmit={handleSubmit}
      isLoading={isSubmitting}
      isDisabled={hasValidationErrors}
    >
      {formError && <ErrorMessage>{formError}</ErrorMessage>}

      <CustomInput
        inputType='select'
        label='المحافظة'
        value={government}
        setValue={handleGovernmentChange}
        errorMsg={error.government}
      >
        {governments.map((government) => (
          <MenuItem key={government.uuid} value={government.uuid}>
            {government.governorate_name}
          </MenuItem>
        ))}
      </CustomInput>

      <CustomInput
        inputType='select'
        label='الحي'
        value={city}
        setValue={handleCityChange}
        errorMsg={error.city}
        isDisabled={
          government === '' ||
          isFetchingCities ||
          (isEdit && !!citiesFetchingError)
        }
        helperText={
          isEdit && citiesFetchingError
            ? 'فشل جلب الأحياء، حاول مرة أخرى'
            : government === ''
              ? 'يتم تفعيل هذا الحقل بعد اختيار المحافظة'
              : ''
        }
      >
        {filteredCities?.data.map((city) => (
          <MenuItem key={city.uuid} value={city.uuid}>
            {city.city_name}
          </MenuItem>
        ))}
      </CustomInput>

      <CustomInput
        inputType='input'
        label='المنطقة'
        value={area}
        setValue={handleAreaChange}
        errorMsg={error.area}
        isDisabled={city === ''}
        helperText={city === '' ? 'يتم تفعيل هذا الحقل بعد اختيار الحي' : ''}
      />
    </CustomModal>
  );
};

export default AreaModalForm;
