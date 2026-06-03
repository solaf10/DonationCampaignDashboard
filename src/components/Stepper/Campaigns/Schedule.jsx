import { Grid } from '@mui/material';
import CustomInput from '../../locations/CustomInput';
import dayjs from 'dayjs';
import { useLocation } from 'react-router-dom';

const Schedule = ({ formData, setFormData, errors }) => {
  const location = useLocation();
  const isEdit = location.pathname.includes('edit');
  return (
    <Grid container spacing={3}>
      <Grid size={6}>
        <CustomInput
          label='تاريخ البدء'
          inputType='date'
          value={formData.start_date || null}
          setValue={(newValue) =>
            setFormData((prev) => ({
              ...prev,
              start_date: newValue,
            }))
          }
          isNestedState={true}
          errorMsg={errors?.start_date || null}
          isRequired={true}
          minDate={
            isEdit && formData.start_date
              ? formData.start_date
              : dayjs().add(1, 'day')
          }
          helperText='يجب أن يكون تاريخ البدء بعد اليوم بيوم واحد على الأقل'
        />
      </Grid>
      <Grid size={6}>
        <CustomInput
          label='تاريخ الانتهاء'
          placeholder='يوم/شهر/سنة'
          inputType='date'
          value={formData.end_date || null}
          setValue={(newValue) =>
            setFormData((prev) => ({
              ...prev,
              end_date: newValue,
            }))
          }
          isNestedState={true}
          errorMsg={errors?.end_date || null}
          isRequired={true}
          minDate={
            formData.start_date
              ? dayjs(formData.start_date).add(1, 'day')
              : dayjs().add(2, 'day')
          }
          helperText='يجب أن يكون تاريخ الانتهاء بعد تاريخ البدء'
        />
      </Grid>
      <Grid size={6}>
        <CustomInput
          label='وقت البدء'
          inputType='time'
          placeholder='مثال: 00:00'
          value={formData.start_time || null}
          setValue={(newValue) =>
            setFormData((prev) => ({
              ...prev,
              start_time: newValue,
            }))
          }
          isNestedState={true}
          errorMsg={errors?.start_time || null}
          isRequired={true}
        />
      </Grid>
      <Grid size={6}>
        <CustomInput
          label='وقت الإنتهاء'
          inputType='time'
          placeholder='مثال: 00:00'
          value={formData.end_time || null}
          setValue={(newValue) =>
            setFormData((prev) => ({
              ...prev,
              end_time: newValue,
            }))
          }
          isNestedState={true}
          errorMsg={errors?.end_time || null}
          isRequired={true}
        />
      </Grid>
    </Grid>
  );
};

export default Schedule;
