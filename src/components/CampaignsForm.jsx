import {
  CalendarMonthOutlined,
  FactCheckOutlined,
  FolderOutlined,
  RequestQuoteOutlined,
} from '@mui/icons-material';
import { useActiveStep } from '../contexts/ActiveStepContext';
import StepperForm from './Stepper/StepperForm';
import { useState } from 'react';
import CustomInput from './locations/CustomInput';
import Textarea from './Textarea';
import { Grid } from '@mui/material';

const CampaignsForm = () => {
  const { activeStep } = useActiveStep();
  const [name, setName] = useState('');
  const [purpose, setPurpose] = useState('');
  //   second step
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  //   third step
  const [targetAmount, setTargetAmount] = useState('');

  const icons = {
    1: <FolderOutlined fontSize='small' />,
    2: <CalendarMonthOutlined fontSize='small' />,
    3: <RequestQuoteOutlined fontSize='small' />,
    4: <FactCheckOutlined fontSize='small' />,
  };
  const styles = {
    marginBottom: '24px',
    '& .MuiInputBase-input::placeholder': {
      fontSize: '14px', // 👈 حجم الخط
      color: '#9AA0A6',
      opacity: 1, // مهم لأن MUI بيخفف الشفافية
    },
  };
  const infoForm = (
    <div className='form-holder'>
      <CustomInput
        label='اسم الحملة'
        inputType='input'
        placeholder='اسم الحملة'
        value={name}
        setValue={setName}
        styles={styles}
        labelStyles={{ fontSize: '16px', color: '#374151' }}
      />
      <Textarea
        label='أهداف الحملة'
        placeholder='اكتب أهداف الحملة باختصار...'
        value={purpose}
        setValue={setPurpose}
        inputType='textarea'
      />
    </div>
  );

  const timingForm = (
    <Grid container spacing={2}>
      <Grid size={6}>
        <CustomInput
          label='تاريخ البدء'
          inputType='date'
          value={startDate}
          setValue={setStartDate}
          styles={styles}
          labelStyles={{ fontSize: '16px', color: '#374151' }}
        />
      </Grid>
      <Grid size={6}>
        <CustomInput
          label='تاريخ الانتهاء'
          placeholder='يوم/شهر/سنة'
          inputType='date'
          value={endDate}
          setValue={setEndDate}
          styles={styles}
          labelStyles={{ fontSize: '16px', color: '#374151' }}
        />
      </Grid>
      <Grid size={6}>
        <CustomInput
          label='وقت البدء'
          inputType='time'
          placeholder='مثال: 00:00'
          value={startTime}
          setValue={setStartTime}
          styles={styles}
          labelStyles={{ fontSize: '16px', color: '#374151' }}
        />
      </Grid>
      <Grid size={6}>
        <CustomInput
          label='وقت الإنتهاء'
          inputType='time'
          placeholder='مثال: 00:00'
          value={endTime}
          setValue={setEndTime}
          styles={styles}
          labelStyles={{ fontSize: '16px', color: '#374151' }}
        />
      </Grid>
    </Grid>
  );

  const projectsForm = <div>hi</div>;

  const paymentForm = (
    <div className='form-holder'>
      <CustomInput
        label='المبلغ المستهدف (ل.س)'
        inputType='input'
        placeholder='مثال: 50,000,000'
        helperText='سيتم عرض المبلغ المجموع تلقائيًا بعد بدء الحملة'
        value={targetAmount}
        setValue={setTargetAmount}
        styles={{ ...styles, marginBottom: '8px' }}
        labelStyles={{ fontSize: '16px', color: '#374151' }}
      />
    </div>
  );

  return (
    <StepperForm icons={icons} submitBtnTitle='إضافة الحملة'>
      {activeStep === 0
        ? infoForm
        : activeStep === 1
        ? timingForm
        : activeStep === 2
        ? paymentForm
        : projectsForm}
    </StepperForm>
  );
};

export default CampaignsForm;
