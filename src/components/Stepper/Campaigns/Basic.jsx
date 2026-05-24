import CustomInput from '../../locations/CustomInput';
import Textarea from '../../Textarea';

const Basic = ({ formData, setFormData, errors, styles }) => {
  return (
    <div className='form-holder'>
      <div className='input-holder' style={styles}>
        <CustomInput
          label='اسم الحملة'
          inputType='input'
          placeholder='اسم الحملة'
          value={formData.name}
          setValue={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          isNestedState={true}
          errorMsg={errors?.name || null}
        />
      </div>
      <Textarea
        label='أهداف الحملة'
        placeholder='اكتب أهداف الحملة باختصار...'
        value={formData.purposes}
        setValue={(e) =>
          setFormData((prev) => ({ ...prev, purposes: e.target.value }))
        }
        isNestedState={true}
        inputType='textarea'
        errorMsg={errors?.purposes || null}
      />
    </div>
  );
};

export default Basic;
