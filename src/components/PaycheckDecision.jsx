import { Box, MenuItem, Typography } from '@mui/material';
import CustomInput from './locations/CustomInput';

const PaycheckDecision = ({
  formData,
  setFormData,
  reasons,
  isVerifying,
  reasonsError,
}) => {
  const isRemaining =
    formData.reason ===
    'عدم التطابق بين المبلغ المدفوع والمبلغ الموجود داخل الملف';
  return (
    <>
      {/* =========================
              DECISION
          ========================= */}
      <Box
        sx={{
          pt: 0.5,
          mb: 2,
        }}
      >
        <Typography sx={{ fontWeight: 700, fontSize: 14, mb: 1.2 }}>
          القرار
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: 1,
          }}
        >
          {/* Compatible Chip */}
          <Box
            component='button'
            type='button'
            onClick={() =>
              setFormData((prev) => ({ ...prev, status: 'متوافق', reason: '' }))
            }
            disabled={isVerifying}
            sx={{
              border: '1px solid',
              borderColor: formData.status === 'متوافق' ? '#2e7d32' : '#d8e2e3',

              backgroundColor:
                formData.status === 'متوافق' ? '#e8f5e9' : '#fff',

              color: formData.status === 'متوافق' ? '#2e7d32' : '#647477',

              borderRadius: '999px',
              px: 2,
              py: 0.8,

              display: 'flex',
              alignItems: 'center',
              gap: 0.8,

              cursor: isVerifying ? 'default' : 'pointer',

              fontFamily: 'inherit',

              transition: 'all 0.2s ease',

              '&:hover': {
                borderColor: '#2e7d32',
                backgroundColor: '#e8f5e9',
              },
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor:
                  formData.status === 'متوافق' ? '#2e7d32' : '#aab5b7',
              }}
            />

            <Typography component='span' fontSize={13} fontWeight={600}>
              متوافق
            </Typography>
          </Box>

          {/* Not Compatible Chip */}
          <Box
            component='button'
            type='button'
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                status: 'غير متوافق',
                reason: '',
              }))
            }
            disabled={isVerifying}
            sx={{
              border: '1px solid',
              borderColor:
                formData.status === 'غير متوافق' ? '#d32f2f' : '#d8e2e3',

              backgroundColor:
                formData.status === 'غير متوافق' ? '#fdecec' : '#fff',

              color: formData.status === 'غير متوافق' ? '#d32f2f' : '#647477',

              borderRadius: '999px',
              px: 2,
              py: 0.8,

              display: 'flex',
              alignItems: 'center',
              gap: 0.8,

              cursor: isVerifying ? 'default' : 'pointer',

              fontFamily: 'inherit',

              transition: 'all 0.2s ease',

              '&:hover': {
                borderColor: '#d32f2f',
                backgroundColor: '#fdecec',
              },
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor:
                  formData.status === 'غير متوافق' ? '#d32f2f' : '#aab5b7',
              }}
            />

            <Typography component='span' fontSize={13} fontWeight={600}>
              غير متوافق
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* =========================
              REJECTION DETAILS
          ========================= */}
      {formData.status === 'غير متوافق' && (
        <Box
          sx={{
            border: '1px solid #f0dddd',
            borderRadius: 3,
            p: 2,
            mb: 1,
            backgroundColor: '#fffafa',
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 14,
              mb: 1.5,
              color: '#b3261e',
            }}
          >
            تفاصيل عدم التوافق
          </Typography>

          {/* Reason */}
          <CustomInput
            label='سبب الرفض'
            inputType='select'
            value={formData?.reason || ''}
            setValue={(e) =>
              setFormData((prev) => ({
                ...prev,
                reason: e.target.value,
                remaining_amount: '',
              }))
            }
            isNestedState={true}
            isDisabled={isVerifying}
            helperText={
              reasonsError
                ? 'حدث خطأ أثناء جلب الأسباب'
                : reasons.length === 0
                  ? 'لا توجد أسباب حالياً'
                  : ''
            }
            isRequired={true}
          >
            {reasons.map((reason) => (
              <MenuItem key={reason} value={reason}>
                {reason}
              </MenuItem>
            ))}
          </CustomInput>

          {/* Remaining Amount */}
          <Box sx={{ mt: 2 }}>
            {isRemaining && (
              <CustomInput
                label='المبلغ المتبقي'
                inputType='input'
                placeholder='أدخل المبلغ المتبقي'
                styles={{
                  height: 'auto',

                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'var(--main-color)',
                  },
                }}
                value={formData?.remaining_amount || ''}
                setValue={(e) => {
                  if (!isNaN(e.target.value)) {
                    setFormData((prev) => ({
                      ...prev,
                      remaining_amount: e.target.value,
                    }));
                  }
                }}
                isNestedState={true}
              />
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default PaycheckDecision;
