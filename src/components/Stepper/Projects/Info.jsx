import { Grid, MenuItem } from '@mui/material';
import {
  useGetFundingSources,
  useGetSectors,
} from '../../../customHooks/queries/useProjects';
import CustomInput from '../../locations/CustomInput';

const Info = ({ styles, formData, setFormData, errors }) => {
  /* ================= FUNDING SOURCES ================= */
  const {
    data: fundingSourcesData,
    isPending: isFetchingFundingSources,
    error: fundingSourcesError,
  } = useGetFundingSources();

  const fundingSources = fundingSourcesData?.data || [];

  /* ================= SECTORS ================= */
  const {
    data: sectorsData,
    isPending: isFetchingSectors,
    error: sectorsError,
  } = useGetSectors();

  const sectors = sectorsData?.data || [];

  const showOtherSectorInput = formData.sector === 'غير ذلك';

  return (
    <div className='form-holder'>
      <Grid container spacing={3}>
        {/* ================= LEFT SIDE ================= */}
        <Grid size={6}>
          {/* الجهات الممولة */}
          <div className='input-holder' style={styles}>
            <CustomInput
              label='الجهات الممولة'
              inputType='select'
              value={formData.funding_source || ''}
              setValue={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  funding_source: e.target.value,
                }))
              }
              isNestedState={true}
              isDisabled={isFetchingFundingSources}
              helperText={
                isFetchingFundingSources
                  ? 'جارِ جلب الجهات الممولة...'
                  : fundingSourcesError
                    ? 'حدث خطأ أثناء جلب الجهات الممولة'
                    : fundingSources.length === 0
                      ? 'لا توجد جهات ممولة حالياً'
                      : ''
              }
              errorMsg={errors?.funding_source || null}
            >
              {fundingSources.map((src) => (
                <MenuItem key={src} value={src}>
                  {src}
                </MenuItem>
              ))}
            </CustomInput>
          </div>

          {/* الجهة المنفذة */}
          <div className='input-holder' style={styles}>
            <CustomInput
              label='الجهة المنفذة'
              inputType='input'
              placeholder='أدخل اسم الجهة المنفذة'
              value={formData.Implementing_party || ''}
              setValue={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  Implementing_party: e.target.value,
                }))
              }
              isNestedState={true}
              errorMsg={errors?.Implementing_party || null}
            />
          </div>

          {/* الكلفة المقدرة */}
          <div className='input-holder' style={styles}>
            <CustomInput
              label='الكلفة المقدرة'
              inputType='input'
              placeholder='أدخل الكلفة التقديرية للمشروع'
              value={formData.estimated_cost || ''}
              setValue={(e) => {
                const value = e.target.value;

                if (!isNaN(value)) {
                  setFormData((prev) => ({
                    ...prev,
                    estimated_cost: value,
                  }));
                }
              }}
              isNestedState={true}
              errorMsg={errors?.estimated_cost || null}
            />
          </div>
        </Grid>

        {/* ================= RIGHT SIDE ================= */}
        <Grid size={6}>
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
        </Grid>
      </Grid>
    </div>
  );
};

export default Info;
