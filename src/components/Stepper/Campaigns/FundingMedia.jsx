import { useEffect, useState } from 'react';
import CustomInput from '../../locations/CustomInput';
import { Typography } from '@mui/material';
import config from '../../../constants/enviroment';

const FundingMedia = ({ formData, setFormData, errors, styles }) => {
  const [selectedImage, setSelectedImage] = useState('');
  useEffect(() => {
    if (formData?.fetchedImage) {
      setSelectedImage(config.baseUrl + formData.fetchedImage);
    }
  }, [formData?.fetchedImage]);
  return (
    <div className='form-holder'>
      <div className='input-holder' style={styles}>
        <CustomInput
          label='التمويل المستهدف (ل.س)'
          inputType='input'
          placeholder='مثال: 50,000,000'
          helperText='سيتم عرض المبلغ المجموع تلقائيًا بعد بدء الحملة'
          value={formData.target_amount}
          setValue={(e) => {
            const value = e.target.value;

            if (!isNaN(value)) {
              setFormData((prev) => ({
                ...prev,
                target_amount: value,
              }));
            }
          }}
          isNestedState={true}
          errorMsg={errors?.target_amount || null}
          isRequired={true}
        />
      </div>
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
              setFormData((prev) => ({
                ...prev,
                image: e?.target?.files?.[0],
              }));
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FundingMedia;
