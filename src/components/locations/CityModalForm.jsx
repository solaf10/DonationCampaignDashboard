import { useState } from 'react';
import { MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import CustomInput from '../locations/CustomInput';
import CustomModal from '../CustomModal';

import { controlControlLocationModal } from '../../redux/slices/ModalContollerSlice';
import useSubmitCityForm from '../../customHooks/useSubmitCityForm';

const CityModalForm = ({ governments, cities }) => {
  const [government, setGovernment] = useState('');
  const [city, setCity] = useState('');

  const [error, setError] = useState({
    government: null,
    city: null,
  });

  const isModalOpen = useSelector(
    (state) => state.modalController.isControlLocationModalOpen,
  );

  const operationType = useSelector(
    (state) => state.modalController.controlLocationModalType,
  );

  const isEdit = operationType === 'edit';

  const { handleSubmit, isAdding, isEditing } = useSubmitCityForm({
    isEdit,
    cities,
    cityState: { city, setCity },
    governmentState: { government, setGovernment },
    setError,
    isModalOpen,
  });

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
      modalTitle={isEdit ? 'تعديل المدينة' : 'إضافة مدينة'}
      submitBtnTitle={isEdit ? 'تعديل' : 'إضافة'}
      onSubmit={handleSubmit}
      isLoading={isAdding || isEditing}
      isDisabled={error.government !== null || error.city !== null}
    >
      <CustomInput
        inputType='select'
        label='المحافظة'
        value={government}
        setValue={(value) => {
          setGovernment(value);

          if (error.government) {
            setError((prev) => ({
              ...prev,
              government: null,
            }));
          }
        }}
        errorMsg={error.government}
      >
        {governments.map((government) => (
          <MenuItem key={government.uuid} value={government.uuid}>
            {government.governorate_name}
          </MenuItem>
        ))}
      </CustomInput>

      <CustomInput
        inputType='input'
        label='المدينة'
        value={city}
        setValue={(value) => {
          setCity(value);

          if (error.city) {
            setError((prev) => ({
              ...prev,
              city: null,
            }));
          }
        }}
        errorMsg={error.city}
      />
    </CustomModal>
  );
};

export default CityModalForm;
