import React from 'react';
import CustomInput from '../../locations/CustomInput';
import { MenuItem } from '@mui/material';

import useGovernments from '../../../customHooks/queries/useGovernments';
import useCities from '../../../customHooks/queries/useCities';
import useAreas from '../../../customHooks/queries/useAreas';

const Location = ({ formData, setFormData, errors, styles, isRequired }) => {
  /* ================= GOVERNMENTS ================= */
  const {
    data: governmentsData,
    isPending: isFetchingGovernments,
    error: governmentsError,
  } = useGovernments();

  const governments = governmentsData?.data || [];

  /* ================= CITIES ================= */
  const {
    data: citiesData,
    isPending: isFetchingCities,
    error: citiesError,
  } = useCities();

  const cities =
    citiesData?.data?.filter(
      (city) => city?.governorate?.uuid === formData.government,
    ) || [];

  /* ================= AREAS ================= */
  const {
    data: areasData,
    isPending: isFetchingAreas,
    error: areasError,
  } = useAreas();

  const areas =
    areasData?.data?.filter((area) => area?.city?.uuid === formData.city) || [];

  return (
    <>
      {/* المحافظة */}
      <div className='input-holder' style={styles}>
        <CustomInput
          inputType='select'
          isDisabled={isFetchingGovernments}
          label='المحافظة'
          value={formData.government}
          setValue={(e) =>
            setFormData((prev) => ({
              ...prev,
              government: e.target.value,
              city: '',
              district_uuid: '',
            }))
          }
          isNestedState={true}
          errorMsg={
            governmentsError
              ? 'حدث خطأ أثناء جلب المحافظات'
              : errors?.government || null
          }
          helperText={isFetchingGovernments ? 'جار جلب المحافظات...' : ''}
          isRequired={isRequired}
        >
          {governments.map((government) => (
            <MenuItem key={government?.uuid} value={government?.uuid}>
              {government?.governorate_name}
            </MenuItem>
          ))}
        </CustomInput>
      </div>

      {/* المدينة */}
      <div className='input-holder' style={styles}>
        <CustomInput
          inputType='select'
          isDisabled={
            !formData.government || isFetchingCities || cities.length === 0
          }
          helperText={
            !formData.government
              ? 'يتم تفعيل هذا الحقل بعد اختيار المحافظة'
              : isFetchingCities
                ? 'جار جلب الأحياء...'
                : cities.length === 0
                  ? 'لا توجد أحياء متاحة لهذه المحافظة'
                  : ''
          }
          label='المدينة'
          value={formData.city}
          setValue={(e) =>
            setFormData((prev) => ({
              ...prev,
              city: e.target.value,
              district_uuid: '',
            }))
          }
          isNestedState={true}
          errorMsg={
            citiesError ? 'حدث خطأ أثناء جلب الأحياء' : errors?.city || null
          }
          isRequired={isRequired}
        >
          {cities.map((city) => (
            <MenuItem key={city?.uuid} value={city?.uuid}>
              {city?.city_name}
            </MenuItem>
          ))}
        </CustomInput>
      </div>

      {/* المنطقة */}
      <div className='input-holder' style={styles}>
        <CustomInput
          inputType='select'
          isDisabled={!formData.city || isFetchingAreas || areas.length === 0}
          helperText={
            !formData.city
              ? 'يتم تفعيل هذا الحقل بعد اختيار الحي'
              : isFetchingAreas
                ? 'جار جلب المناطق...'
                : areas.length === 0
                  ? 'لا توجد مناطق متاحة لهذه الحي'
                  : ''
          }
          label='المنطقة'
          value={formData.district_uuid}
          setValue={(e) =>
            setFormData((prev) => ({
              ...prev,
              district_uuid: e.target.value,
            }))
          }
          isNestedState={true}
          errorMsg={
            areasError
              ? 'حدث خطأ أثناء جلب المناطق'
              : errors?.district_uuid || null
          }
          isRequired={isRequired}
        >
          {areas.map((area) => (
            <MenuItem key={area?.uuid} value={area?.uuid}>
              {area?.district_name}
            </MenuItem>
          ))}
        </CustomInput>
      </div>
    </>
  );
};

export default Location;

{
  /* 
      
      <Grid container spacing={3}>
        
        <Grid size={6}>
          <CustomInput
            label='القطاع'
            inputType='input'
            placeholder='القطاع'
            value={sector}
            setValue={setSector}
            inline
          />
        </Grid>
        <Grid size={6}>
          
        </Grid>
        <Grid size={6}>
          <CustomInput
            label='نسبة الانجاز'
            inputType='input'
            placeholder='ضع نسبة تتراوح بين 0 - 100'
            value={completionRate}
            setValue={(val) => {
              if (!isNaN(val) && Number(val) <= 100) setCompletionRate(val);
            }}
            inline
          />
        </Grid>
      </Grid> */
}
