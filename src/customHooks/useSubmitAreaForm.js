import { useSelector } from 'react-redux';
import { useFilterCitiesByGovernment } from './queries/useCities';
import useAddArea from './mutations/useAddArea';
import useEditArea from './mutations/useEditArea';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const useSubmitAreaForm = ({
  isEdit,
  areas,
  setFormError,
  governmentState,
  cityState,
  areaState,
  errorState,
  isModalOpen,
}) => {
  const areaId = useSelector(
    (state) => state.modalController.selectedLocationID,
  );

  const { government, setGovernment } = governmentState;
  const { city, setCity } = cityState;
  const { area, setArea } = areaState;
  const { error, setError } = errorState;

  const existingArea = areas.find((area) => area.uuid === areaId);

  const existingAreaName = existingArea?.district_name || '';

  const existingGovernmentId = existingArea?.governorate_uuid || '';

  const existingCityId = existingArea?.city_uuid || '';

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
    setGovernment,
    setCity,
    setArea,
    setFormError,
    setError,
  ]);

  return {
    handleSubmit,
    isSubmitting,
    hasValidationErrors,
    isFetchingCities,
    citiesFetchingError,
    filteredCities,
  };
};

export default useSubmitAreaForm;
