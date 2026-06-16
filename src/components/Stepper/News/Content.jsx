import Textarea from '../../Textarea';
import CustomInput from '../../locations/CustomInput';
import { Box, FormControlLabel, Switch } from '@mui/material';

const contentPlaceholder = `اكتب محتوى الخبر هنا...

• لفصل الفقرات اترك سطرًا فارغًا بين كل فقرة وأخرى.

مثال:

يسرنا الإعلان عن إطلاق المنصة الجديدة.

نشكر جميع المشاركين على دعمهم.`;

const Content = ({ formData, setFormData, errors, setErrors, styles }) => {
  return (
    <div className='form-holder'>
      <Textarea
        label='محتوى الخبر'
        placeholder={contentPlaceholder}
        setValue={(e) => {
          setErrors((prev) => ({
            ...prev,
            content: null,
          }));
          setFormData((prev) => ({ ...prev, content: e.target.value }));
        }}
        value={formData?.content}
        isNestedState={true}
        inputType='textarea'
        errorMsg={errors?.content || null}
        isRequired={true}
        styles={{ ...styles, height: '77%' }}
      />
      <FormControlLabel
        control={
          <Switch
            checked={formData?.hasLink}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, hasLink: e.target.checked }))
            }
            sx={{
              '& .MuiSwitch-switchBase.Mui-checked': {
                color: 'var(--main-color)',
              },
              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                backgroundColor: 'var(--main-color)',
              },
            }}
          />
        }
        label='إضافة رابط'
      />
      {formData?.hasLink && (
        <Box sx={{ mt: 2 }}>
          <div className='input-holder' style={styles}>
            <CustomInput
              label='نص الرابط'
              inputType='input'
              placeholder='أدخل نص الرابط'
              value={formData.linkTitle}
              setValue={(e) => {
                setFormData((prev) => ({ ...prev, linkTitle: e.target.value }));
              }}
              isNestedState={true}
            />
          </div>

          <div className='input-holder' style={styles}>
            <CustomInput
              label='الرابط'
              inputType='input'
              placeholder='https://'
              value={formData.linkHref}
              setValue={(e) => {
                setFormData((prev) => ({ ...prev, linkHref: e.target.value }));
              }}
              isNestedState={true}
            />
          </div>
        </Box>
      )}
    </div>
  );
};

export default Content;
