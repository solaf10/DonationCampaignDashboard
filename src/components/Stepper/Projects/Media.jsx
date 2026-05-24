import React, { useRef } from 'react';
import { Typography, Box } from '@mui/material';
import CustomInput from '../../locations/CustomInput';

const Media = ({ styles, formData, setFormData, errors }) => {
  const extraInputRef = useRef(null);

  /* ================= COVER IMAGE ================= */
  const selectedImage = formData.cover_image
    ? URL.createObjectURL(formData.cover_image)
    : '';

  return (
    <div className='form-holder'>
      <div className='image-upload' style={{ marginTop: '24px' }}>
        {/* ================= صورة الغلاف ================= */}
        <div
          style={{
            display: 'flex',
            gap: '20px',
            marginBottom: '24px',
            alignItems: 'flex-start',
            direction: 'rtl',
          }}
        >
          <Typography
            sx={{
              mb: 1,
              fontFamily: 'Cairo',
              fontSize: '16px',
              color: '#374151',
              whiteSpace: 'nowrap',
              mt: 1,
            }}
          >
            صورة غلاف المشروع
          </Typography>

          <div className='product-image' style={{ padding: '16.5px 14px' }}>
            <label
              htmlFor='upload-cover'
              className={selectedImage ? 'image-selected' : ''}
            >
              {selectedImage ? (
                <img src={selectedImage} alt='project cover' />
              ) : (
                <svg
                  stroke='currentColor'
                  fill='currentColor'
                  strokeWidth='0'
                  viewBox='0 0 512 512'
                  height='1em'
                  width='1em'
                  xmlns='http://www.w3.org/2000/svg'
                  className='icon'
                >
                  <path
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='32'
                    d='M320 367.79h76c55 0 100-29.21 100-83.6s-53-81.47-96-83.6c-8.89-85.06-71-136.8-144-136.8-69 0-113.44 45.79-128 91.2-60 5.7-112 43.88-112 106.4s54 106.4 120 106.4h56'
                  />
                  <path
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='32'
                    d='m320 255.79-64-64-64 64m64 192.42V207.79'
                  />
                </svg>
              )}

              <span>
                {selectedImage ? '' : 'اسحب الصورة هنا أو اضغط لاختيار صورة'}
              </span>
            </label>

            <input
              className='upload-input'
              id='upload-cover'
              type='file'
              accept='image/*'
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (file) {
                  setFormData((prev) => ({
                    ...prev,
                    cover_image: file,
                  }));
                }
              }}
            />
          </div>
        </div>

        {errors?.cover_image && (
          <Typography
            sx={{
              color: 'var(--error-color)',
              fontSize: '13px',
              fontFamily: 'Cairo',
              mb: 2,
            }}
          >
            {errors.cover_image}
          </Typography>
        )}

        {/* ================= الصور الإضافية ================= */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '24px',
            direction: 'rtl',
            marginBottom: '28px',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Cairo',
              fontSize: '16px',
              color: '#374151',
              whiteSpace: 'nowrap',
              mt: 1,
            }}
          >
            صور إضافية للمشروع
          </Typography>

          <Box
            sx={{
              display: 'flex',
              gap: 1.5,
              flexWrap: 'wrap',
            }}
          >
            {/* الصور المختارة */}
            {formData.extra_images?.map((img, index) => (
              <Box
                key={index}
                sx={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  position: 'relative',
                  border: '1px solid #e5e7eb',
                }}
              >
                <img
                  src={URL.createObjectURL(img)}
                  alt={`extra-${index}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />

                <Box
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      extra_images: prev.extra_images.filter(
                        (_, i) => i !== index,
                      ),
                    }))
                  }
                  sx={{
                    position: 'absolute',
                    top: 4,
                    left: 4,
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    color: '#fff',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  ×
                </Box>
              </Box>
            ))}

            {/* زر إضافة صورة */}
            <Box
              onClick={() => extraInputRef.current?.click()}
              sx={{
                width: '72px',
                height: '72px',
                border: '2px dashed #d1d5db',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: '0.3s',
                color: '#9AA0A6',
                '&:hover': {
                  borderColor: 'var(--main-color)',
                  color: 'var(--main-color)',
                },
              }}
            >
              <span style={{ fontSize: '22px', lineHeight: 1 }}>+</span>

              <Typography
                sx={{
                  fontFamily: 'Cairo',
                  fontSize: '11px',
                }}
              >
                إضافة
              </Typography>
            </Box>

            <input
              ref={extraInputRef}
              type='file'
              accept='image/*'
              multiple
              style={{ display: 'none' }}
              onChange={(e) => {
                const files = Array.from(e.target.files || []);

                if (files.length > 0) {
                  setFormData((prev) => ({
                    ...prev,
                    extra_images: [...(prev.extra_images || []), ...files],
                  }));
                }
              }}
            />
          </Box>
        </div>

        {errors?.extra_images && (
          <Typography
            sx={{
              color: 'var(--error-color)',
              fontSize: '13px',
              fontFamily: 'Cairo',
              mb: 2,
            }}
          >
            {errors.extra_images}
          </Typography>
        )}

        {/* ================= الفيديو ================= */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            direction: 'rtl',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Cairo',
              fontSize: '16px',
              color: '#374151',
              whiteSpace: 'nowrap',
            }}
          >
            فيديو توضيحي
          </Typography>

          <div style={{ width: '100%' }}>
            <CustomInput
              label=''
              inputType='input'
              placeholder='https://youtube.com/...'
              value={formData.video_url || ''}
              setValue={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  video_url: e.target.value,
                }))
              }
              isNestedState={true}
              styles={styles}
              errorMsg={errors?.video_url || null}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Media;
