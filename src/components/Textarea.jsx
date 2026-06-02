import {
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material';

const Textarea = ({
  label,
  placeholder,
  value,
  setValue,
  inputType,
  styles,
  isNestedState,
  errorMsg,
  isRequired = false,
}) => {
  const customStyles = {
    width: '100%',
    fontFamily: 'Cairo',
    /* 🔹 شكل الحقل */
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      backgroundColor: '#fff',

      '& fieldset': {
        borderColor: '#d1d5db',
      },

      '&:hover:not(.Mui-error) fieldset': {
        borderWidth: '2px',
        borderColor: 'var(--secondary-color)',
      },

      '&.Mui-focused:not(.Mui-error) fieldset': {
        borderColor: 'var(--secondary-color)',
        borderWidth: '2px',
      },

      /* 🔴 Disabled */
      '&.Mui-disabled': {
        backgroundColor: '#F5F6F8',
      },

      '&.Mui-disabled fieldset': {
        borderColor: '#DADDE3',
      },
    },

    /* 🔹 النص داخل الحقل */
    '& .MuiInputBase-input': {
      color: '#374151',
      fontFamily: 'Cairo',
    },

    /* 🔹 placeholder */
    '& .MuiInputBase-input::placeholder': {
      color: '#9AA0A6',
      opacity: 1,
      fontSize: '14px',
    },
    ...styles,
  };
  return (
    <FormControl sx={customStyles}>
      <Typography
        sx={{
          mb: 1,
          color: '#374151',
          fontFamily: 'Cairo',
        }}
      >
        {label}
        {isRequired && <span style={{ color: 'var(--error-color)' }}>*</span>}
      </Typography>
      {inputType === 'textarea' ? (
        <TextField
          placeholder={placeholder}
          multiline
          rows={5}
          variant='outlined'
          fullWidth
          value={value}
          onChange={(e) =>
            isNestedState ? setValue(e) : setValue(e.target.value)
          }
          error={!!errorMsg}
        />
      ) : (
        <TextField
          placeholder={placeholder}
          variant='standard'
          fullWidth
          value={value}
          onChange={(e) =>
            isNestedState ? setValue(e) : setValue(e.target.value)
          }
          error={!!errorMsg}
        />
      )}
      {errorMsg && (
        <FormHelperText
          error={!!errorMsg}
          sx={{ color: '#9AA0A6', marginLeft: '0px' }}
        >
          {errorMsg}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default Textarea;
