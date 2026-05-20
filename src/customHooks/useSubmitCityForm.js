import { useEffect } from 'react';
import { toast } from 'react-toastify';
import useEditCity from './mutations/useEditCity';
import useAddCity from './mutations/useAddCity';
import { useSelector } from 'react-redux';

const useSubmitCityForm = ({
  isEdit,
  cities,
  cityState,
  governmentState,
  setError,
  isModalOpen,
}) => {
  const { city, setCity } = cityState;
  const { government, setGovernment } = governmentState;

  const cityId = useSelector(
    (state) => state.modalController.selectedLocationID,
  );

  const existingCity = cities.find((city) => city.uuid === cityId);

  const existingCityName = existingCity?.city_name || '';

  const existingGovernmentId = existingCity?.governorate_uuid || '';

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
  }, [
    isModalOpen,
    isEdit,
    existingGovernmentId,
    existingCityName,
    setGovernment,
    setCity,
    setError,
  ]);
  return { handleSubmit, isAdding, isEditing };
};

export default useSubmitCityForm;
