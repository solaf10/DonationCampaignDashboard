import CustomInput from '../../locations/CustomInput';
import Textarea from '../../Textarea';

const Basic = ({ formData, setFormData, errors, styles }) => {
  return (
    <div className='form-holder'>
      <div className='input-holder' style={styles}>
        <CustomInput
          label='اسم الحملة'
          inputType='input'
          placeholder='الرجاء إدخال اسم من 3 إلى 100 حرف عربي فقط دون استخدام أرقام أو رموز'
          value={formData.name}
          setValue={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          isNestedState={true}
          errorMsg={errors?.name || null}
          isRequired={true}
        />
      </div>
      <Textarea
        label='أهداف الحملة'
        placeholder='اكتب أهداف الحملة مفصولة بفواصل، مثال: دعم الأسر المحتاجة، توفير الرعاية الصحية، تحسين البنية التحتية'
        value={formData.purposes}
        setValue={(e) =>
          setFormData((prev) => ({ ...prev, purposes: e.target.value }))
        }
        isNestedState={true}
        inputType='textarea'
        errorMsg={errors?.purposes || null}
        isRequired={true}
      />
    </div>
  );
};

export default Basic;
