import React from 'react';
import CustomInput from '../../locations/CustomInput';
import Textarea from '../../Textarea';

const Basic = ({ formData, setFormData, errors, setErrors, styles }) => {
  return (
    <div className='form-holder'>
      {/* اسم المشروع */}
      <div className='input-holder' style={styles}>
        <CustomInput
          label='اسم المشروع'
          inputType='input'
          placeholder='الرجاء إدخال اسم من 3 إلى 100 حرف عربي فقط دون استخدام أرقام أو رموز'
          value={formData.name || ''}
          setValue={(e) => {
            setErrors((prev) => ({
              ...prev,
              name: null,
            }));
            setFormData((prev) => ({
              ...prev,
              name: e.target.value,
            }));
          }}
          isNestedState={true}
          errorMsg={errors?.name || null}
          isRequired={true}
        />
      </div>

      {/* متطلبات المشروع */}
      <div className='input-holder' style={styles}>
        <Textarea
          label='متطلبات المشروع'
          placeholder='اكتب متطلبات المشروع مفصولة بفواصل، مثال: ترميم الصفوف، تركيب نوافذ، تأهيل دورات المياه'
          value={formData.requirements || ''}
          setValue={(e) => {
            setErrors((prev) => ({
              ...prev,
              requirements: null,
            }));
            setFormData((prev) => ({
              ...prev,
              requirements: e.target.value,
            }));
          }}
          isNestedState={true}
          inputType='textarea'
          errorMsg={errors?.requirements || null}
          isRequired={true}
        />
      </div>
    </div>
  );
};

export default Basic;
