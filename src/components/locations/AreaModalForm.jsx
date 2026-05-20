import { useEffect, useState } from 'react';
import { MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import CustomInput from '../locations/CustomInput';
import CustomModal from '../CustomModal';

import { controlControlLocationModal } from '../../redux/slices/ModalContollerSlice';

import useEditCity from '../../customHooks/mutations/useEditCity';
import { useFilterCitiesByGovernment } from '../../customHooks/queries/useCities';
import useAddArea from '../../customHooks/mutations/useAddArea';
import useEditArea from '../../customHooks/mutations/useEditArea';

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

  const areaId = useSelector(
    (state) => state.modalController.selectedLocationID,
  );

  const isEdit = operationType === 'edit';

  const existingArea = areas.find((area) => area.uuid === areaId);

  const existingAreaName = existingArea?.district_name || '';

  const existingGovernmentId = existingArea?.governorate_uuid || '';

  const existingCityId = existingArea?.city_uuid || '';

  const dispatch = useDispatch();

  const {
    data: filteredCities,
    isPending: isFetchingCities,
    error: citiesFetchingError,
  } = useFilterCitiesByGovernment(government !== '' ? government : null);

  const { mutate: addArea, isPending: isAdding } = useAddArea();

  const { mutate: editArea, isPending: isEditing } = useEditArea();

  const isSubmitting = isAdding || isEditing;
  const hasValidationErrors = Boolean(
    error.government || error.city || error.area,
  );

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    const errors = {
      government: null,
      city: null,
      area: null,
    };

    if (!government) {
      errors.government = 'الرجاء اختيار المحافظة';
    }

    if (!city.trim()) {
      errors.city = 'الرجاء اختيار اسم المدينة';
    }

    if (!area.trim()) {
      errors.area = 'الرجاء إدخال اسم المنطقة';
    }

    if (
      isEdit &&
      area.trim() === existingAreaName.trim() &&
      government === existingGovernmentId &&
      city === existingCityId
    ) {
      errors.area = 'الرجاء إدخال بيانات مختلفة عن الحالية';
    }

    setError(errors);

    if (errors.government || errors.city || errors.area) return;

    const data = {
      district_name: area.trim(),
      city_uuid: city,
    };

    const mutationOptions = {
      onSuccess: () => {
        toast.success(
          isEdit ? 'تم تعديل المنطقة بنجاح' : 'تمت إضافة المنطقة بنجاح',
        );
      },
      onError: (err) => {
        const message = err?.message || 'حدث خطأ أثناء حفظ البيانات';
        setFormError(message);
      },
    };

    if (isEdit) {
      editArea({ id: areaId, data }, mutationOptions);
      return;
    }

    addArea(data, mutationOptions);
  };

  useEffect(() => {
    if (!isModalOpen) {
      setGovernment('');
      setCity('');
      setArea('');
      setFormError('');

      setError({
        government: null,
        city: null,
        area: null,
      });
    } else {
      setGovernment(isEdit ? existingGovernmentId : '');
      setCity(isEdit ? existingCityId : '');
      setArea(isEdit ? existingAreaName : '');
    }
  }, [
    isModalOpen,
    isEdit,
    existingGovernmentId,
    existingCityId,
    existingAreaName,
  ]);

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
      {formError && (
        <div
          style={{
            backgroundColor: '#ffebee',
            color: '#b71c1c',
            borderRadius: '12px',
            padding: '12px 16px',
            fontSize: '14px',
            lineHeight: 1.6,
            fontFamily: 'Cairo',
            boxShadow: '0 2px 8px rgba(244, 67, 54, 0.12)',
          }}
        >
          {formError}
        </div>
      )}

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
        label='المدينة'
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
            ? 'فشل جلب المدن، حاول مرة أخرى'
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
        helperText={city === '' ? 'يتم تفعيل هذا الحقل بعد اختيار المدينة' : ''}
      />
    </CustomModal>
  );
};

export default AreaModalForm;
