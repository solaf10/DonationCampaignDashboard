import { MenuItem, Grid, Typography } from '@mui/material';
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

  const selectedImage = formData.cover_image
    ? URL.createObjectURL(formData.cover_image)
    : '';

  return (
    <div className='form-holder'>
      <Grid container spacing={3}>
        {/* الحالة */}
        <Grid size={{ xs: 12, md: 6 }}>
          <div className='input-holder'>
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
              isDisabled={isFetchingStatus}
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
              isRequired={true}
            >
              {status.map((stat) => (
                <MenuItem key={stat} value={stat}>
                  {stat}
                </MenuItem>
              ))}
            </CustomInput>
          </div>
        </Grid>

        {/* القطاع */}
        <Grid size={{ xs: 12, md: 6 }}>
          <div className='input-holder'>
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
              isRequired={true}
            >
              {sectors.map((sector) => (
                <MenuItem key={sector} value={sector}>
                  {sector}
                </MenuItem>
              ))}
            </CustomInput>
          </div>
        </Grid>

        {/* قطاع آخر */}
        {showOtherSectorInput && (
          <Grid size={12}>
            <div className='input-holder'>
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
                isRequired={true}
              />
            </div>
          </Grid>
        )}

        {/* نسبة الإنجاز */}
        <Grid size={12}>
          <div className='input-holder'>
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
              isRequired={false}
            />
          </div>
        </Grid>
        {/* ================= صورة الغلاف ================= */}
        <Grid size={12}>
          <div className='input-holder' style={styles}>
            <Typography
              sx={{
                mb: 1,
                fontFamily: 'Cairo',
                fontSize: '16px',
                color: '#374151',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              صورة غلاف المشروع
              <span style={{ color: 'var(--error-color)' }}>*</span>
            </Typography>

            <div
              className='product-image'
              style={{
                padding: '20px',
                height: '220px',
                borderColor: errors?.cover_image
                  ? 'var(--error-color)'
                  : '#d1d5db',
              }}
            >
              <label
                htmlFor='upload-cover'
                className={selectedImage ? 'image-selected' : ''}
              >
                {selectedImage ? (
                  <img src={selectedImage} alt='project cover' />
                ) : (
                  <>
                    <svg
                      stroke='currentColor'
                      fill='currentColor'
                      strokeWidth='0'
                      viewBox='0 0 512 512'
                      height='1em'
                      width='1em'
                      xmlns='http://www.w3.org/2000/svg'
                      className='icon'
                    >
                      <path
                        fill='none'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='32'
                        d='M320 367.79h76c55 0 100-29.21 100-83.6s-53-81.47-96-83.6c-8.89-85.06-71-136.8-144-136.8-69 0-113.44 45.79-128 91.2-60 5.7-112 43.88-112 106.4s54 106.4 120 106.4h56'
                      />

                      <path
                        fill='none'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='32'
                        d='m320 255.79-64-64-64 64m64 192.42V207.79'
                      />
                    </svg>

                    <span>اسحب الصورة هنا أو اضغط لاختيار صورة</span>
                  </>
                )}
              </label>

              <input
                className='upload-input'
                id='upload-cover'
                type='file'
                accept='image/*'
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  if (file) {
                    setFormData((prev) => ({
                      ...prev,
                      cover_image: file,
                    }));
                  }
                }}
              />
            </div>

            {errors?.cover_image && (
              <Typography
                sx={{
                  color: 'var(--error-color)',
                  fontSize: '13px',
                  fontFamily: 'Cairo',
                  mt: 1,
                }}
              >
                {errors.cover_image}
              </Typography>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Progress;
