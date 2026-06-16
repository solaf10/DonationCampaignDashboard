import { Typography } from '@mui/material';

const CoverImage = ({ formData, setFormData, errors, styles }) => {
  return (
    <div className='image-upload' style={{ marginTop: '24px' }}>
      <Typography
        sx={{
          mb: 1,
          fontFamily: 'Cairo',
          fontSize: '16px',
          color: '#374151',
        }}
      >
        صورة غلاف الخبر
      </Typography>
      <div className='product-image' style={{ padding: '16.5px 14px' }}>
        <label
          htmlFor='upload'
          className={formData?.selectedImageLink != '' ? 'image-selected' : ''}
        >
          {formData?.selectedImageLink != '' ? (
            <img src={formData?.selectedImageLink} alt="news' cover image" />
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
            {formData?.selectedImageLink != ''
              ? ''
              : 'اسحب الصورة هنا أو اضغط للرفع'}
          </span>
        </label>
        <input
          className='upload-input'
          id='upload'
          type='file'
          onChange={(e) => {
            setFormData((prev) => ({
              ...prev,
              cover_image: e?.target?.files?.[0],
              selectedImageLink: URL.createObjectURL(e?.target?.files?.[0]),
            }));
          }}
        />
      </div>
    </div>
  );
};

export default CoverImage;
