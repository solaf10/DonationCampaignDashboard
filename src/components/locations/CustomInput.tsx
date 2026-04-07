import { useState } from 'react';
import {
  FormControl,
  Select,
  FormHelperText,
  Typography,
  TextField,
  Input,
} from '@mui/material';

export default function CustomInput({
  label,
  isDisabled,
  helperText,
  children,
  inputType,
  placeholder,
  styles,
}) {
  const [value, setValue] = useState('');
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      {/* 🔹 LABEL */}
      <Typography
        sx={{
          mb: 1,
          color: '#4B5563',
          fontFamily: 'Cairo',
          fontSize: '14px',
        }}
      >
        {label}
      </Typography>

      <FormControl
        fullWidth
        variant='standard'
        disabled={isDisabled}
        sx={{
          /* 🔹 underline default */
          '& .MuiInput-underline:before': {
            borderBottomColor: '#ccc',
          },
          '& .MuiInput-underline:hover:before': {
            borderBottomColor: 'var(--secondary-color)',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: 'var(--secondary-color)',
          },

          /* 🔹 النص داخل select */
          '& .MuiSelect-select': {
            color: '#333',
            fontFamily: 'Cairo',
            padding: '8px 0',
          },

          /* 🔴 Disabled fix */
          '& .Mui-disabled': {
            backgroundColor: '#F5F6F8',
            cursor: 'not-allowed',
          },

          '& .Mui-disabled:before': {
            borderBottomColor: '#DADDE3',
            borderBottomStyle: 'solid', // ❌ منع المنقط
          },

          '& .Mui-disabled:after': {
            borderBottomColor: '#DADDE3',
            borderBottomStyle: 'solid',
          },

          '& .MuiSelect-select.Mui-disabled': {
            color: '#9AA0A6',
            WebkitTextFillColor: '#9AA0A6', // مهم جداً
          },
        }}
      >
        {inputType == 'select' ? (
          <Select
            sx={{ minHeight: '48px' }}
            value={value}
            onChange={handleChange}
            displayEmpty
            renderValue={(selected) => {
              if (!selected) {
                return <span style={{ color: '#9AA0A6' }}>اختر {label}</span>;
              }
              return selected;
            }}
          >
            {children}
          </Select>
        ) : inputType == 'input' ? (
          <Input
            sx={{ minHeight: '48px' }}
            placeholder='ادخل قيمة'
            value={value}
            onChange={handleChange}
          />
        ) : (
          <TextField
            id='standard-basic'
            label={placeholder ? placeholder : 'ادخل قيمة'}
            variant='standard'
            value={value}
            onChange={handleChange}
            sx={styles}
          />
        )}
      </FormControl>
      {/* 🔹 Helper text */}
      {isDisabled && (
        <FormHelperText sx={{ color: '#9AA0A6' }}>{helperText}</FormHelperText>
      )}
    </div>
  );
}
