import {
  FormControl,
  Select,
  FormHelperText,
  Typography,
  TextField,
  Input,
  InputLabel,
  NativeSelect,
} from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';

export default function CustomInput({
  label,
  isDisabled,
  helperText,
  children,
  inputType,
  placeholder,
  styles,
  value,
  setValue,
  labelStyles,
}) {
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const inputsStyles = {
    /* 🔹 underline default */
    '& .MuiInputBase-input': {
      color: '#333',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: '#ccc',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
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
    // nativeSelect?
    '& .MuiInputLabel-root': {
      color: '#8c9ea0', // لون اللابل
      fontFamily: 'Cairo',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: 'var(--main-color)', // لون اللابل عند focus
    },
    ...styles,
  };
  const pickerStyles = {
    /* 🔹 underline default */
    '& .MuiPickersInputBase-root': {
      minHeight: '48px',
      color: '#333',
    },
    '& .MuiPickersInputBase-root:before': {
      borderBottomColor: '#ccc',
    },
    '& .MuiPickersInputBase-root:hover:not(.Mui-disabled):before': {
      borderBottomColor: 'var(--secondary-color)',
    },
    '& .MuiPickersInputBase-root:after': {
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
    // nativeSelect?
    '& .MuiInputLabel-root': {
      color: '#8c9ea0', // لون اللابل
      fontFamily: 'Cairo',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: 'var(--main-color)', // لون اللابل عند focus
    },
    ...styles,
  };

  return (
    <div>
      {/* 🔹 LABEL */}
      {inputType !== 'nativeSelect' && (
        <Typography
          sx={{
            mb: 1,
            color: '#4B5563',
            fontFamily: 'Cairo',
            fontSize: '14px',
            ...labelStyles,
          }}
        >
          {label}
        </Typography>
      )}

      <FormControl
        fullWidth
        variant='standard'
        disabled={isDisabled}
        sx={inputsStyles}
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
            placeholder={placeholder ?? 'ادخل قيمة'}
            value={value}
            onChange={handleChange}
          />
        ) : inputType === 'nativeSelect' ? (
          <>
            <InputLabel variant='standard' htmlFor={label}>
              {label}
            </InputLabel>
            <NativeSelect
              defaultValue=''
              inputProps={{
                name: label,
                id: label,
              }}
              sx={{
                minWidth: '100px',
                '& .MuiInput-underline:before': {
                  borderBottomColor: '#ccc', // الخط قبل الفوكاس
                },
                '& .MuiInput-underline:hover:before': {
                  borderBottomColor: 'var(--secondary-color)', // عند hover
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: 'var(--secondary-color)', // عند focus
                },
                '& .MuiInputBase-input': {
                  color: '#333', // لون النص داخل select
                  fontFamily: 'Cairo',
                },
                '& .MuiInputLabel-root': {
                  color: '#8c9ea0', // لون اللابل
                  fontFamily: 'Cairo',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: 'var(--main-color)', // لون اللابل عند focus
                },
                '& .MuiSelect-select': {
                  padding: '8px 0', // تباعد النص داخل select
                },
              }}
              value={value}
              onChange={handleChange}
            >
              {children}
            </NativeSelect>
          </>
        ) : inputType === 'date' ? (
          <DatePicker
            value={value}
            onChange={(newValue) => setValue(newValue)}
            slotProps={{
              textField: {
                variant: 'standard',
                fullWidth: true,
                placeholder: 'يوم/شهر/سنة',
                sx: pickerStyles,
              },
            }}
            format='YYYY/MM/DD'
          />
        ) : inputType === 'time' ? (
          <TimePicker
            value={value}
            onChange={(newValue) => setValue(newValue)}
            slotProps={{
              textField: {
                variant: 'standard',
                fullWidth: true,
                placeholder,
                sx: pickerStyles,
              },
            }}
            format='HH:mm'
          />
        ) : (
          <TextField
            id='standard-basic'
            label={placeholder ? placeholder : 'ادخل قيمة'}
            variant='standard'
            value={value}
            onChange={handleChange}
          />
        )}
      </FormControl>
      {/* 🔹 Helper text */}
      {helperText && (
        <FormHelperText sx={{ color: '#9AA0A6' }}>{helperText}</FormHelperText>
      )}
    </div>
  );
}
