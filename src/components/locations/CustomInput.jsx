import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  Select,
  FormHelperText,
  Typography,
  TextField,
  Input,
  InputLabel,
  NativeSelect,
  IconButton,
  InputAdornment,
  Autocomplete,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { useState } from "react";

const inputsStyles = {
  "& .MuiInputBase-input": {
    color: "#333",
  },

  /* ===== DEFAULT BORDER ===== */
  "& .MuiInput-underline:before": {
    borderBottomColor: "#ccc",
  },

  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
    borderBottomColor: "var(--secondary-color)",
  },

  "& .MuiInput-underline:after": {
    borderBottomColor: "var(--secondary-color)",
  },

  /* ===== ERROR STATE ===== */
  "& .Mui-error:before": {
    borderBottomColor: "var(--error-color)",
  },

  "& .Mui-error:hover:not(.Mui-disabled):before": {
    borderBottomColor: "var(--error-color)",
  },

  "& .Mui-error:after": {
    borderBottomColor: "var(--error-color)",
  },

  "& .MuiFormLabel-root.Mui-error": {
    color: "var(--error-color)",
  },

  "& .MuiFormHelperText-root.Mui-error": {
    color: "var(--error-color)",
    fontFamily: "Cairo",
  },

  /* ===== SELECT ===== */
  "& .MuiSelect-select": {
    color: "#333",
    fontFamily: "Cairo",
    padding: "8px 0",
  },

  /* ===== DISABLED ===== */
  "& .Mui-disabled": {
    backgroundColor: "#F5F6F8",
    cursor: "not-allowed",
  },

  "& .Mui-disabled:before": {
    borderBottomColor: "#DADDE3",
    borderBottomStyle: "solid",
  },

  "& .Mui-disabled:after": {
    borderBottomColor: "#DADDE3",
    borderBottomStyle: "solid",
  },

  "& .MuiSelect-select.Mui-disabled": {
    color: "#9AA0A6",
    WebkitTextFillColor: "#9AA0A6",
  },

  /* ===== LABEL ===== */
  "& .MuiInputLabel-root": {
    color: "#8c9ea0",
    fontFamily: "Cairo",
  },

  "& .MuiInputLabel-root.Mui-focused": {
    color: "var(--main-color)",
  },

  /* ===== PLACEHOLDER ===== */
  "& .MuiInputBase-input::placeholder": {
    fontSize: "14px",
    color: "#9AA0A6",
    opacity: 1,
  },
};

const pickerStyles = {
  "& .MuiPickersInputBase-root": { minHeight: "48px", color: "#333" },
  "& .MuiPickersInputBase-root:before": { borderBottomColor: "#ccc" },
  "& .MuiPickersInputBase-root:hover:not(.Mui-disabled):before": {
    borderBottomColor: "var(--secondary-color)",
  },
  "& .MuiPickersInputBase-root:after": {
    borderBottomColor: "var(--secondary-color)",
  },
  "& .MuiSelect-select": {
    color: "#333",
    fontFamily: "Cairo",
    padding: "8px 0",
  },
  "& .Mui-disabled": { backgroundColor: "#F5F6F8", cursor: "not-allowed" },
  "& .Mui-disabled:before": {
    borderBottomColor: "#DADDE3",
    borderBottomStyle: "solid",
  },
  "& .Mui-disabled:after": {
    borderBottomColor: "#DADDE3",
    borderBottomStyle: "solid",
  },
  "& .MuiSelect-select.Mui-disabled": {
    color: "#9AA0A6",
    WebkitTextFillColor: "#9AA0A6",
  },
  "& .MuiInputLabel-root": { color: "#8c9ea0", fontFamily: "Cairo" },
  "& .MuiInputLabel-root.Mui-focused": { color: "var(--main-color)" },
  "& .MuiInputBase-input::placeholder": {
    fontSize: "14px",
    color: "#9AA0A6",
    opacity: 1,
  },
};

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
  inline,
  errorMsg,
  isNestedState,
  isRequired = false,
  minDate,
}) {
  const handleChange = (e) => {
    if (isNestedState) setValue(e);
    else setValue(e.target.value);
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      style={
        inline ? { display: "flex", alignItems: "center", gap: "16px" } : {}
      }
    >
      {/* 🔹 LABEL */}
      {inputType !== "nativeSelect" && (
        <Typography
          sx={{
            mb: inline ? 0 : 1,
            fontFamily: "Cairo",
            fontSize: "16px",
            color: "#374151",
            whiteSpace: "nowrap",
          }}
        >
          {label}
          {isRequired && <span style={{ color: "var(--error-color)" }}>*</span>}
        </Typography>
      )}

      <FormControl
        fullWidth
        variant="standard"
        disabled={isDisabled}
        sx={styles ? { ...inputsStyles, ...styles } : inputsStyles}
        error={!!errorMsg}
      >
        {inputType === "select" ? (
          <Select
            sx={{ minHeight: "48px" }}
            value={value}
            onChange={handleChange}
            displayEmpty
            required={isRequired}
            renderValue={(selected) => {
              if (!selected) {
                return (
                  <span style={{ color: "#9AA0A6", fontSize: "14px" }}>
                    اختر {label}
                  </span>
                );
              }

              const selectedChild = Array.isArray(children)
                ? children.find((child) => {
                    if (!child?.props) return false;
                    return child.props.value === selected;
                  })
                : null;

              return selectedChild?.props?.children || selected;
            }}
          >
            {children}
          </Select>
        ) : inputType === "autocomplete" ? (
          <Autocomplete
            options={children || []}

            getOptionLabel={(option) => option?.name || ''}
            value={value || ''}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            disabled={isDisabled}
            isRequired={isRequired}
            sx={{
              ...inputsStyles,

              // 🔥 أهم جزء
              "& .MuiInputBase-root": {
                padding: "6px 0",
              },

              "& .MuiAutocomplete-inputRoot": {
                padding: "6px 0 !important",
              },

              "& .MuiInputBase-input": {
                padding: "8px 0 !important",
              },
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                placeholder={placeholder}
                sx={{ backgroundColor: "transparent" }}
              />
            )}
          />
        ) : inputType === "input" ||
          inputType === "password" ||
          inputType === "email" ? (
          <Input
            type={
              inputType === "password"
                ? showPassword
                  ? "text"
                  : "password"
                : inputType === "email"
                  ? "email"
                  : "text"
            }
            sx={{ minHeight: "48px" }}
            placeholder={placeholder ?? "ادخل قيمة"}
            value={value}
            onChange={handleChange}
            endAdornment={
              inputType === "password" && (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }
            required={isRequired}
          />
        ) : inputType === "nativeSelect" ? (
          <>
            <InputLabel variant="standard" htmlFor={label}>
              {label}
            </InputLabel>
            <NativeSelect
              inputProps={{ name: label, id: label }}
              sx={{
                minWidth: "100px",
                "& .MuiInput-underline:before": { borderBottomColor: "#ccc" },
                "& .MuiInput-underline:hover:before": {
                  borderBottomColor: "var(--secondary-color)",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "var(--secondary-color)",
                },
                "& .MuiInputBase-input": { color: "#333", fontFamily: "Cairo" },
                "& .MuiInputLabel-root": {
                  color: "#8c9ea0",
                  fontFamily: "Cairo",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "var(--main-color)",
                },
                "& .MuiSelect-select": { padding: "8px 0" },
              }}
              value={value}
              onChange={handleChange}
            >
              {children}
            </NativeSelect>
          </>
        ) : inputType === "date" ? (
          <DatePicker
            value={value}
            onChange={(newValue) => setValue(newValue)}
            slotProps={{
              textField: {
                variant: "standard",
                fullWidth: true,
                placeholder: "يوم/شهر/سنة",
                sx: styles ? { ...pickerStyles, ...styles } : pickerStyles,
              },
            }}
<<<<<<< HEAD
            format="YYYY/MM/DD"
=======
            format='YYYY/MM/DD'
            minDate={minDate}
>>>>>>> 7d19358618c742354439779e0672f856d1f03eb4
          />
        ) : inputType === "time" ? (
          <TimePicker
            value={value}
            onChange={(newValue) => setValue(newValue)}
            slotProps={{
              textField: {
                variant: "standard",
                fullWidth: true,
                placeholder,
                sx: styles ? { ...pickerStyles, ...styles } : pickerStyles,
              },
            }}
            format="HH:mm"
          />
        ) : (
          <TextField
            id="standard-basic"
            label={placeholder ? placeholder : "ادخل قيمة"}
            variant="standard"
            value={value}
            onChange={handleChange}
          />
        )}
      </FormControl>

      {/* 🔹 Helper text */}
<<<<<<< HEAD
      {((helperText && isDisabled) || errorMsg) && (
        <FormHelperText error={!!errorMsg} sx={{ color: "#9AA0A6" }}>
=======
      {(helperText || errorMsg) && (
        <FormHelperText error={!!errorMsg} sx={{ color: '#9AA0A6' }}>
>>>>>>> 7d19358618c742354439779e0672f856d1f03eb4
          {errorMsg || helperText}
        </FormHelperText>
      )}
    </div>
  );
}
