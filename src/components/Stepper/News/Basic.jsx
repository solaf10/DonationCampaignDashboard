import { MenuItem } from '@mui/material';
import { useGetCategories } from '../../../customHooks/queries/useNews';
import CustomInput from '../../locations/CustomInput';
import Textarea from '../../Textarea';

const Basic = ({ formData, setFormData, errors, setErrors, styles }) => {
  const showOtherCategoryInput = formData.category === 'غير ذلك';
  const {
    data: categoriesData,
    isFetching: isFetchingCategories,
    error: categoriesError,
  } = useGetCategories();

  const categories = categoriesData?.data || [];
  return (
    <div className='form-holder'>
      <div className='input-holder' style={styles}>
        <CustomInput
          label='عنوان الخبر'
          inputType='input'
          placeholder='الرجاء إدخال اسم من 3 إلى 100 حرف عربي فقط دون استخدام أرقام أو رموز'
          value={formData.title}
          setValue={(e) => {
            setFormData((prev) => ({ ...prev, title: e.target.value }));
            setErrors((prev) => ({
              ...prev,
              title: null,
            }));
          }}
          isNestedState={true}
          errorMsg={errors?.title || null}
          isRequired={true}
        />
      </div>
      <div className='input-holder' style={styles}>
        <CustomInput
          label='وصف مختصر'
          inputType='input'
          placeholder='الرجاء إدخال اسم من 10 إلى 200 حرف عربي فقط دون استخدام أرقام أو رموز'
          value={formData.excerpt}
          setValue={(e) => {
            setFormData((prev) => ({ ...prev, excerpt: e.target.value }));
            setErrors((prev) => ({
              ...prev,
              excerpt: null,
            }));
          }}
          isNestedState={true}
          errorMsg={errors?.excerpt || null}
          isRequired={true}
        />
      </div>
      <div className='input-holder' style={styles}>
        <CustomInput
          label='الصنف'
          inputType='select'
          value={formData.category || ''}
          setValue={(e) =>
            setFormData((prev) => ({
              ...prev,
              category: e.target.value,
              on_the_other_hand: '',
            }))
          }
          isNestedState={true}
          isDisabled={isFetchingCategories}
          helperText={
            isFetchingCategories
              ? 'جارِ جلب الأصناف...'
              : categoriesError
                ? 'حدث خطأ أثناء جلب الأصناف'
                : categories.length === 0
                  ? 'لا توجد أصناف متاحة حالياً'
                  : ''
          }
          errorMsg={errors?.category || null}
          isRequired={true}
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </CustomInput>
      </div>
      {showOtherCategoryInput && (
        <div className='input-holder' style={styles}>
          <CustomInput
            label='الصنف الجديد'
            inputType='input'
            placeholder='أدخل اسم الصنف'
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
      )}
    </div>
  );
};

export default Basic;
