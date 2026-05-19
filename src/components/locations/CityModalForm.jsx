import { useEffect, useState } from 'react';
import { MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import CustomInput from '../locations/CustomInput';
import CustomModal from '../CustomModal';

import { controlControlLocationModal } from '../../redux/slices/ModalContollerSlice';

import useAddCity from '../../customHooks/mutations/useAddCity';
import useEditCity from '../../customHooks/mutations/useEditCity';

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

  const cityId = useSelector(
    (state) => state.modalController.selectedLocationID,
  );

  const isEdit = operationType === 'edit';

  const existingCity = cities.find((city) => city.uuid === cityId);

  const existingCityName = existingCity?.city_name || '';

  const existingGovernmentId = existingCity?.governorate_uuid || '';

  const dispatch = useDispatch();

  const { mutate: addCity, isPending: isAdding } = useAddCity();

  const { mutate: editCity, isPending: isEditing } = useEditCity();

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {
      government: null,
      city: null,
    };

    if (!government) {
      errors.government = 'الرجاء اختيار المحافظة';
    }

    if (!city.trim()) {
      errors.city = 'الرجاء إدخال اسم المدينة';
    }

    if (
      isEdit &&
      city === existingCityName &&
      government === existingGovernmentId
    ) {
      errors.city = 'الرجاء إدخال بيانات مختلفة عن الحالية';
    }

    setError(errors);

    if (errors.government || errors.city) return;

    const data = {
      city_name: city,
      governorate_uuid: government,
    };

    if (isEdit) {
      editCity(
        {
          id: cityId,
          data,
        },
        {
          onSuccess: () => {
            toast.success('تم تعديل المدينة بنجاح');
          },
          onError: (err) => {
            setError((prev) => ({
              ...prev,
              city: err.message,
            }));
          },
        },
      );
      return;
    }

    addCity(data, {
      onSuccess: () => {
        setCity('');
        setGovernment('');

        setError({
          government: null,
          city: null,
        });

        toast.success('تمت إضافة المدينة بنجاح');
      },

      onError: (err) => {
        setError((prev) => ({
          ...prev,
          city: err.message,
        }));
      },
    });
  };

  useEffect(() => {
    if (!isModalOpen) {
      setGovernment('');
      setCity('');

      setError({
        government: null,
        city: null,
      });
    } else {
      setGovernment(isEdit ? existingGovernmentId : '');

      setCity(isEdit ? existingCityName : '');
    }
  }, [isModalOpen, isEdit, existingGovernmentId, existingCityName]);

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
