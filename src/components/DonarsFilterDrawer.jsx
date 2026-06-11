import {
  Drawer,
  Box,
  Typography,
  Button,
  IconButton,
  MenuItem,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import CustomInput from './locations/CustomInput';
import { useFilters } from '../contexts/FilterContext';
import { useEffect } from 'react';
import ErrorMessage from './Messages/ErrorMessage';

const paymentStatusOptions = [
  {
    value: 'مدفوع',
    label: 'مدفوع',
  },
  {
    value: 'غير مدفوع',
    label: 'غير مدفوع',
  },
];

const verifyStatusOptions = [
  {
    value: 'متوافق',
    label: 'متوافق',
  },
  {
    value: 'غير متوافق',
    label: 'غير متوافق',
  },
  {
    value: 'قيد التدقيق',
    label: 'قيد التدقيق',
  },
];

const currencyOptions = [
  {
    value: 'USD',
    label: 'دولار أمريكي',
  },
  {
    value: 'EUR',
    label: 'يورو',
  },
  {
    value: 'SYP',
    label: 'ليرة سورية',
  },
];

const DonarsFilterDrawer = ({ refilterDonars, filterDonarsError }) => {
  const { donarFilters, setDonarFilters } = useFilters();

  useEffect(() => {
    refilterDonars();
  }, [donarFilters, refilterDonars]);

  return (
    <>
      <CustomInput
        inputType='select'
        label='حالة الدفع'
        value={donarFilters?.pending}
        setValue={(e) =>
          setDonarFilters((prev) => ({
            ...prev,
            pending: e.target.value,
          }))
        }
        isNestedState
      >
        {filterDonarsError && (
          <ErrorMessage>{filterDonarsError.message}</ErrorMessage>
        )}

        {paymentStatusOptions.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </CustomInput>

      <CustomInput
        inputType='select'
        label='حالة التحقق'
        value={donarFilters?.status}
        setValue={(e) =>
          setDonarFilters((prev) => ({
            ...prev,
            status: e.target.value,
          }))
        }
        isNestedState
      >
        {verifyStatusOptions.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </CustomInput>

      <CustomInput
        inputType='select'
        label='العملة'
        value={donarFilters?.currency_type}
        setValue={(e) =>
          setDonarFilters((prev) => ({
            ...prev,
            currency_type: e.target.value,
          }))
        }
        isNestedState
      >
        {currencyOptions.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </CustomInput>
    </>
  );
};

export default DonarsFilterDrawer;
