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

const CampaignsForm = () => {
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

  // last step content
  const paymentForm = (
    <div className='form-holder'>
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

  return <></>;
};

export default CampaignsForm;
