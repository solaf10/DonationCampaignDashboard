import { useEffect } from 'react';
import {
  Drawer,
  Box,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  MenuItem,
} from '@mui/material';

import Location from './Stepper/Projects/Location';
import CustomInput from './locations/CustomInput';
import { useFilters } from '../contexts/FilterContext';
import CloseIcon from '@mui/icons-material/Close';
import { useGetCategories } from '../customHooks/queries/useNews';

const checkboxStyle = {
  '&.Mui-checked': {
    color: 'var(--main-color)',
  },
};

const FilterNewsDrawer = ({ refilterNews, filterNewsError }) => {
  const { newsFilters, setNewsFilters } = useFilters();

  const { data: categoriesData } = useGetCategories();
  const categories = categoriesData?.data || [];

  // 🔥 LIVE FILTER (أي تغيير مباشرة)
  useEffect(() => {
    refilterNews();
  }, [newsFilters, refilterNews]);

  const handleCheckbox = (value) => {
    setNewsFilters((prev) => ({
      ...prev,
      category: prev.category.includes(value)
        ? prev.category.filter((s) => s !== value)
        : [...prev.category, value],
    }));
  };

  return (
    <>
      {filterNewsError && (
        <Typography sx={{ color: 'red' }}>{filterNewsError.message}</Typography>
      )}

      <CustomInput
        label='الترتيب'
        inputType='select'
        value={newsFilters.method || ''}
        setValue={(value) =>
          setNewsFilters((prev) => ({
            ...prev,
            method: value,
          }))
        }
        sx={{ minWidth: '100px' }}
      >
        <MenuItem value='من الأحدث'>الأحدث أولاً</MenuItem>
        <MenuItem value='من الأقدم'>الأقدم أولاً</MenuItem>
      </CustomInput>

      <Typography fontSize={16} fontWeight='bold' sx={{ mt: 2 }}>
        التصنيف
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {categories.map((category) => (
          <FormControlLabel
            key={category}
            control={
              <Checkbox
                checked={newsFilters.category?.includes(category)}
                onChange={() => handleCheckbox(category)}
                sx={checkboxStyle}
              />
            }
            label={category}
          />
        ))}
      </Box>
    </>
  );
};

export default FilterNewsDrawer;
