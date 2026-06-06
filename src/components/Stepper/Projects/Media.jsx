import React, { useRef } from 'react';
import { Typography, Box } from '@mui/material';
import CustomInput from '../../locations/CustomInput';
import config from '../../../constants/enviroment';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { useLocation } from 'react-router-dom';

const styles = {
  marginBottom: '24px',
};

const Media = ({ formData, setFormData, errors, mediaType = 'both' }) => {
  const extraInputRef = useRef(null);
  const location = useLocation();
  const isEdit = location?.pathname.includes('edit');

  const displayedImages = isEdit
    ? [...(formData.images || []), ...(formData.newImages || [])]
    : formData.images || [];

  return (
    <div className='form-holder'>
      <div className='image-upload' style={{ marginTop: '24px' }}>
        {/* ================= الصور الإضافية ================= */}
        {(mediaType == 'both' || mediaType == 'image') && (
          <>
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
                {/* الصور القديمة */}
                {isEdit &&
                  formData.images?.map((img, index) => (
                    <Box
                      key={`old-${index}`}
                      sx={{
                        width: '72px',
                        height: '72px',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        border: '1px solid #e5e7eb',
                      }}
                    >
                      <img
                        src={config.baseUrl + img.url}
                        alt={`old-${index}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </Box>
                  ))}

                {/* الصور الجديدة */}
                {(isEdit ? formData.newImages : formData.images)?.map(
                  (img, index) => (
                    <Box
                      key={`new-${index}`}
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
                        alt={`new-${index}`}
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
                            ...(isEdit
                              ? {
                                  newImages: prev.newImages.filter(
                                    (_, i) => i !== index,
                                  ),
                                }
                              : {
                                  images: prev.images.filter(
                                    (_, i) => i !== index,
                                  ),
                                }),
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
                  ),
                )}

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

                        ...(isEdit
                          ? {
                              newImages: [...(prev.newImages || []), ...files],
                            }
                          : {
                              images: [...(prev.images || []), ...files],
                            }),
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
          </>
        )}

        {/* ================= الفيديو ================= */}
        {(mediaType == 'both' || mediaType == 'video') && (
          <div>
            <Typography
              sx={{
                fontFamily: 'Cairo',
                fontSize: '16px',
                color: '#374151',
              }}
            >
              فيديوهات توضيحية
            </Typography>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {(formData.videos || []).map((video, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'end',
                    gap: 1,
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <CustomInput
                      label=''
                      inputType='input'
                      placeholder='https://youtube.com/...'
                      value={
                        typeof video === 'string' ? video : video?.url || ''
                      }
                      setValue={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          videos: prev.videos.map((v, i) =>
                            i === index ? e.target.value : v,
                          ),
                        }))
                      }
                      isNestedState={true}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                    }}
                  >
                    {video && (
                      <Box
                        component='button'
                        type='button'
                        onClick={() => window.open(video, '_blank')}
                        sx={{
                          width: 36,
                          height: 36,
                          borderRadius: '50%',
                          border: '1px solid #dbe3e6',
                          backgroundColor: '#f8fafb',
                          color: 'var(--main-color)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: '0.3s',
                          '&:hover': {
                            backgroundColor: '#eef7f7',
                            borderColor: 'var(--main-color)',
                          },
                        }}
                      >
                        <VisibilityOutlinedIcon fontSize='small' />
                      </Box>
                    )}

                    <Box
                      component='button'
                      type='button'
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          videos: prev.videos.filter((_, i) => i !== index),
                        }))
                      }
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        border: '1px solid #ffd6d6',
                        backgroundColor: '#fff5f5',
                        color: 'var(--error-color)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: '0.3s',
                        '&:hover': {
                          backgroundColor: '#fdecec',
                        },
                      }}
                    >
                      <DeleteOutlineRoundedIcon fontSize='small' />
                    </Box>
                  </Box>
                </Box>
              ))}

              <Box
                component='button'
                type='button'
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    videos: [...(prev.videos || []), ''],
                  }))
                }
                sx={{
                  mt: 2,
                  width: 'fit-content',
                  border: '2px dashed #d1d5db',
                  background: 'transparent',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  color: 'var(--secondary-color)',
                  transition: '0.3s',
                  '&:hover': {
                    borderColor: 'var(--main-color)',
                    color: 'var(--main-color)',
                  },
                }}
              >
                + إضافة فيديو
              </Box>
            </Box>

            {errors?.videos && (
              <Typography
                sx={{
                  color: 'var(--error-color)',
                  fontSize: '13px',
                  fontFamily: 'Cairo',
                  mt: 1,
                }}
              >
                {errors.videos}
              </Typography>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Media;
