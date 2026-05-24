import { MenuItem } from '@mui/material';
import {
  useGetSectors,
  useGetStatus,
} from '../../../customHooks/queries/useProjects';
import CustomInput from '../../locations/CustomInput';

const Progress = ({ formData, setFormData, errors, styles }) => {
  const {
    data: sectorsData,
    isPending: isFetchingSectors,
    error: sectorsError,
  } = useGetSectors();

  const sectors = sectorsData?.data || [];
  const {
    data: statusData,
    isPending: isFetchingStatus,
    error: statusError,
  } = useGetStatus();

  const status = statusData?.data || [];

  const showOtherSectorInput = formData.sector === 'غير ذلك';

  return (
    <div className='form-holder'>
      {/* الحالة */}
      <div className='input-holder' style={styles}>
        <CustomInput
          label='الحالة'
          inputType='select'
          value={formData.status || ''}
          setValue={(e) =>
            setFormData((prev) => ({
              ...prev,
              status: e.target.value,
            }))
          }
          isNestedState={true}
          isDisabled={isFetchingSectors}
          helperText={
            isFetchingStatus
              ? 'جارِ جلب الحالات...'
              : statusError
                ? 'حدث خطأ أثناء جلب الحالات'
                : status.length === 0
                  ? 'لا توجد حالات متاحة حالياً'
                  : ''
          }
          errorMsg={errors?.status || null}
        >
          {status.map((stat) => (
            <MenuItem key={stat} value={stat}>
              {stat}
            </MenuItem>
          ))}
        </CustomInput>
      </div>
      {/* القطاع */}
      <div className='input-holder' style={styles}>
        <CustomInput
          label='القطاع'
          inputType='select'
          value={formData.sector || ''}
          setValue={(e) =>
            setFormData((prev) => ({
              ...prev,
              sector: e.target.value,
              on_the_other_hand: '',
            }))
          }
          isNestedState={true}
          isDisabled={isFetchingSectors}
          helperText={
            isFetchingSectors
              ? 'جارِ جلب القطاعات...'
              : sectorsError
                ? 'حدث خطأ أثناء جلب القطاعات'
                : sectors.length === 0
                  ? 'لا توجد قطاعات متاحة حالياً'
                  : ''
          }
          errorMsg={errors?.sector || null}
        >
          {sectors.map((sector) => (
            <MenuItem key={sector} value={sector}>
              {sector}
            </MenuItem>
          ))}

          <MenuItem value='غير ذلك'>غير ذلك</MenuItem>
        </CustomInput>
      </div>

      {/* قطاع آخر */}
      {showOtherSectorInput && (
        <div className='input-holder' style={styles}>
          <CustomInput
            label='اسم القطاع الجديد'
            inputType='input'
            placeholder='أدخل اسم القطاع'
            value={formData.on_the_other_hand || ''}
            setValue={(e) =>
              setFormData((prev) => ({
                ...prev,
                on_the_other_hand: e.target.value,
              }))
            }
            isNestedState={true}
            errorMsg={errors?.on_the_other_hand || null}
          />
        </div>
      )}

      {/* نسبة الإنجاز */}
      <div className='input-holder' style={styles}>
        <CustomInput
          label='نسبة الإنجاز'
          inputType='input'
          placeholder='ضع نسبة تتراوح بين 0 - 100'
          value={formData.progress_percentage || ''}
          setValue={(e) => {
            const value = e.target.value;

            if (
              value === '' ||
              (!isNaN(value) && Number(value) >= 0 && Number(value) <= 100)
            ) {
              setFormData((prev) => ({
                ...prev,
                progress_percentage: value,
              }));
            }
          }}
          isNestedState={true}
          errorMsg={errors?.progress_percentage || null}
        />
      </div>
    </div>
  );
};

export default Progress;
