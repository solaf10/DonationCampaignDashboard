import React, { useRef, useState } from 'react';
import { Typography, Box } from '@mui/material';
import CustomInput from '../../locations/CustomInput';

const styles = {
  marginBottom: '24px',
};

const Media = ({ formData, setFormData, errors }) => {
  const extraInputRef = useRef(null);

  return (
    <div className='form-holder'>
      <div className='image-upload' style={{ marginTop: '24px' }}>
        {/* {errors?.cover_image && (
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
        )} */}

        {/* ================= الصور الإضافية ================= */}
        <div
          style={{
            marginBottom: '24px',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Cairo',
              fontSize: '16px',
              color: '#374151',
              whiteSpace: 'nowrap',
              mb: 2,
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
            {formData.images?.map((img, index) => (
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
                      images: prev.images.filter((_, i) => i !== index),
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
                    images: [...(prev.images || []), ...files],
                  }));
                }
              }}
            />
          </Box>
        </div>

        {errors?.images && (
          <Typography
            sx={{
              color: 'var(--error-color)',
              fontSize: '13px',
              fontFamily: 'Cairo',
              mb: 2,
            }}
          >
            {errors.images}
          </Typography>
        )}

        {/* ================= الفيديو ================= */}
        <div>
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

          <CustomInput
            label=''
            inputType='input'
            placeholder='https://youtube.com/...'
            value={formData.videos || ''}
            setValue={(e) =>
              setFormData((prev) => ({
                ...prev,
                videos: e.target.value,
              }))
            }
            isNestedState={true}
            styles={styles}
            errorMsg={errors?.videos || null}
            isRequired={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Media;
