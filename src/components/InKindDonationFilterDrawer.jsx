import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { IconButton } from '@mui/material';
import Radio from '@mui/material/Radio';

const checkboxStyle = {
  '&.Mui-checked': {
    color: 'var(--main-color)',
  },
};

const InKindDonationFilterDrawer = ({
  open,
  onClose,
  filters,
  setFilters,
  donationTypes,
  deliveryStatuses,
  itemConditions,
  governorates,
})  => {
  const handleChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleReset = () => {
    setFilters({
      donationType: '',
      location: '',
      itemCondition: '',
      deliveryStatus: '',
    });
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        dir="rtl"
        sx={{
          width: 320,
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography fontSize={20} fontWeight="bold">
            تصفية متقدمة
          </Typography>

          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* نوع التبرع */}
        <Typography fontSize={16} fontWeight="bold">
          نوع التبرع
        </Typography>

        <FormControl fullWidth>
          <Select
            variant="standard"
            disableUnderline
            value={filters.donationType}
            displayEmpty
            onChange={(e) =>
              handleChange('donationType', e.target.value)
            }
            sx={{
              height: 48,
              bgcolor: '#F8FAFC',
              borderBottom: '2px solid #E2E8F0',
              

              '&:hover': {
                borderBottom: '2px solid #CBD5E1',
              },

              '&.Mui-focused': {
                borderBottom:
                  '2px solid var(--main-color)',
              },
            }}
            renderValue={(selected) => {
  if (!selected) {
    return (
      <span style={{ color: '#94A3B8' }}>
        اختر نوع التبرع
      </span>
    );
  }

  return selected;
}}
          >
           {donationTypes?.map((type) => (
  <MenuItem
    key={type}
    value={type}
  >
    {type}
  </MenuItem>
))}
          </Select>
        </FormControl>

        {/* الموقع */}
     <Typography fontSize={16} fontWeight="bold">
  الموقع
</Typography>

<FormControl fullWidth>
  <Select
    variant="standard"
    disableUnderline
    value={filters.location}
    displayEmpty
    onChange={(e) =>
      handleChange('location', e.target.value)
    }
    sx={{
      height: 48,
      bgcolor: '#F8FAFC',
      borderBottom: '2px solid #E2E8F0',

      '&:hover': {
        borderBottom: '2px solid #CBD5E1',
      },

      '&.Mui-focused': {
        borderBottom:
          '2px solid var(--main-color)',
      },
    }}
    renderValue={(selected) => {
      if (!selected) {
        return (
          <span style={{ color: '#94A3B8' }}>
            اختر المحافظة
          </span>
        );
      }

      const governorate = governorates?.find(
        (gov) => gov.uuid === selected
      );

      return governorate?.governorate_name || '';
    }}
  >
    {governorates?.map((gov) => (
      <MenuItem
        key={gov.uuid}
        value={gov.uuid}
      >
        {gov.governorate_name}
      </MenuItem>
    ))}
  </Select>
</FormControl>

        {/* حالة المواد */}
        <Typography fontSize={16} fontWeight="bold">
          حالة المواد
        </Typography>

      <FormGroup>
  {itemConditions?.map((condition) => (
    <FormControlLabel
      key={condition}
      control={
        <Radio
  sx={{
    color: '#CBD5E1',

    '&.Mui-checked': {
      color: 'var(--main-color)',
    },
  }}
  checked={filters.itemCondition === condition}
  onChange={() =>
    handleChange(
      'itemCondition',
      filters.itemCondition === condition
        ? ''
        : condition
    )
  }
/>
      }
      label={condition}
    />
  ))}
</FormGroup>

        {/* حالة التسليم */}
        <Typography fontSize={16} fontWeight="bold">
          حالة التسليم
        </Typography>

        <FormGroup>
  {deliveryStatuses?.map((status) => (
    <FormControlLabel
      key={status}
      control={
       <Radio
  sx={{
    color: '#CBD5E1',

    '&.Mui-checked': {
      color: 'var(--main-color)',
    },
  }}
  checked={filters.deliveryStatus === status}
  onChange={() =>
    handleChange(
      'deliveryStatus',
      filters.deliveryStatus === status ? '' : status
    )
  }
/>
      }
      label={status}
    />
  ))}
</FormGroup> 

        {/* Reset */}
        <Button
          variant="contained"
          onClick={handleReset}
          sx={{
            mt: 2,
            borderRadius: '999px',
            backgroundColor: '#E5E7EB',
            color: '#000',
            boxShadow: 'none',

            '&:hover': {
              boxShadow: 'none',
              backgroundColor: '#D1D5DB',
            },
          }}
        >
          إعادة تعيين
        </Button>
      </Box>
    </Drawer>
  );
};

export default InKindDonationFilterDrawer;