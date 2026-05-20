import {
  EventOutlined,
  InfoOutline,
  PaymentsOutlined,
} from '@mui/icons-material';
import { useActiveStep } from '../contexts/ActiveStepContext';
import StepperForm from './Stepper/StepperForm';
import { useState } from 'react';
import CustomInput from './locations/CustomInput';
import Textarea from './Textarea';
import { Grid, Typography } from '@mui/material';
import './CampaignsForm.css';
import AddBySelectionModal from './AddBySelectionModal';
import SuccessMessageDialog from './SuccessMessageDialog';
const steps = ['معلومات الحملة', 'جدولة للحملة', 'التمويل والوسائط'];

const projects = [
  {
    id: 1,
    name: 'مشروع التخرج',
    location: 'حمص-الحمراء',
  },
  {
    id: 2,
    name: 'تعليم إلكتروني',
    location: 'حمص-الحميدية',
  },
  {
    id: 3,
    name: 'متجر إلكتروني',
    location: 'دمشق-الحميدية',
  },
  {
    id: 4,
    name: 'تطبيق حجوزات',
    location: 'حماة-ابن رشد',
  },
];

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
  const [targetFunding, setTargetFunding] = useState('');
  const [selectedImage, setSelectedImage] = useState('');

  const icons = {
    1: <InfoOutline fontSize='small' />,
    2: <EventOutlined fontSize='small' />,
    3: <PaymentsOutlined fontSize='small' />,
  };
  // custom input custom styles
  const styles = {
    marginBottom: '24px',
  };

  // first step content
  const infoForm = (
    <div className='form-holder'>
      <CustomInput
        label='اسم الحملة'
        inputType='input'
        placeholder='اسم الحملة'
        value={name}
        setValue={setName}
        styles={styles}
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

  // second step content
  const timingForm = (
    <Grid container spacing={3}>
      <Grid size={6}>
        <CustomInput
          label='تاريخ البدء'
          inputType='date'
          value={startDate}
          setValue={setStartDate}
        />
      </Grid>
      <Grid size={6}>
        <CustomInput
          label='تاريخ الانتهاء'
          placeholder='يوم/شهر/سنة'
          inputType='date'
          value={endDate}
          setValue={setEndDate}
        />
      </Grid>
      <Grid size={6}>
        <CustomInput
          label='وقت البدء'
          inputType='time'
          placeholder='مثال: 00:00'
          value={startTime}
          setValue={setStartTime}
        />
      </Grid>
      <Grid size={6}>
        <CustomInput
          label='وقت الإنتهاء'
          inputType='time'
          placeholder='مثال: 00:00'
          value={endTime}
          setValue={setEndTime}
        />
      </Grid>
    </Grid>
  );

  // last step content
  const paymentForm = (
    <div className='form-holder'>
      <CustomInput
        label='التمويل المستهدف (ل.س)'
        inputType='input'
        placeholder='مثال: 50,000,000'
        helperText='سيتم عرض المبلغ المجموع تلقائيًا بعد بدء الحملة'
        value={targetFunding}
        setValue={setTargetFunding}
        styles={{ ...styles, marginBottom: '8px' }}
      />
      <div className='image-upload' style={{ marginTop: '24px' }}>
        <Typography
          sx={{
            mb: 1,
            fontFamily: 'Cairo',
            fontSize: '16px',
            color: '#374151',
          }}
        >
          صورة غلاف الحملة
        </Typography>
        <div className='product-image' style={{ padding: '16.5px 14px' }}>
          <label
            htmlFor='upload'
            className={selectedImage != '' ? 'image-selected' : ''}
          >
            {selectedImage != '' ? (
              <img src={selectedImage} alt="campaign's cover image" />
            ) : (
              <svg
                stroke='currentColor'
                fill='currentColor'
                strokeWidth='0'
                viewBox='0 0 512 512'
                className='icon'
                height='1em'
                width='1em'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='32'
                  d='M320 367.79h76c55 0 100-29.21 100-83.6s-53-81.47-96-83.6c-8.89-85.06-71-136.8-144-136.8-69 0-113.44 45.79-128 91.2-60 5.7-112 43.88-112 106.4s54 106.4 120 106.4h56'
                ></path>
                <path
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='32'
                  d='m320 255.79-64-64-64 64m64 192.42V207.79'
                ></path>
              </svg>
            )}
            <span>
              {selectedImage != '' ? '' : 'اسحب الصورة هنا أو اضغط للرفع'}
            </span>
          </label>
          <input
            className='upload-input'
            id='upload'
            type='file'
            onChange={(e) => {
              setSelectedImage(URL.createObjectURL(e?.target?.files?.[0]));
            }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <StepperForm icons={icons} submitBtnTitle='إضافة الحملة' steps={steps}>
        {activeStep === 0
          ? infoForm
          : activeStep === 1
          ? timingForm
          : paymentForm}
      </StepperForm>
      {/* Projects Modal */}
      <SuccessMessageDialog
        title='تم إنشاء الحملة بنجاح!'
        desc='تم إنشاء حملتك بنجاح. يمكنك الآن إضافة مشاريع مرتبطة أو القيام بذلك لاحقًا.'
        btnTitle='إضافة مشاريع الآن'
      />
      <AddBySelectionModal
        entriesType='projects'
        entries={projects}
        modalTitle='إضافة مشاريع مرتبطة'
      />
    </>
  );
};

export default CampaignsForm;
