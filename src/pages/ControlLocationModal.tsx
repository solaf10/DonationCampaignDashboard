import React, { useEffect, useState } from 'react';
import CustomModal from '../components/CustomModal';
import CustomInput from '../components/locations/CustomInput';
import { MenuItem } from '@mui/material';

const ControlLocationModal = ({
  isOpen,
  setIsOpen,
  title,
  locationType,
  isEdit,
}) => {
  const [government, setGovernment] = useState('');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');

  isEdit &&
    useEffect(() => {
      setGovernment('homs');
      setCity('homs');
      setArea('homs');
    }, []);
  return (
    <CustomModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      modalTitle={title}
      submitBtnTitle={isEdit ? 'تعديل' : 'إضافة'}
    >
      <CustomInput
        inputType={locationType === 'governments' ? 'input' : 'select'}
        isDisabled={false}
        helperText={null}
        label='المحافظة'
      >
        <MenuItem value='homs'>حمص</MenuItem>
        <MenuItem value='hama'>حماة</MenuItem>
      </CustomInput>
      {locationType != 'governments' && (
        <CustomInput
          inputType={locationType === 'cities' ? 'input' : 'select'}
          isDisabled={government === ''}
          helperText='يتم تفعيل هذا الحقل بعد اختيار المحافظة'
          label='المدينة'
        >
          <MenuItem value='homs'>حمص</MenuItem>
          <MenuItem value='hama'>حماة</MenuItem>
        </CustomInput>
      )}
      {locationType == 'areas' && (
        <CustomInput
          inputType={locationType === 'areas' ? 'input' : 'select'}
          isDisabled={city === ''}
          helperText='يتم تفعيل هذا الحقل بعد اختيار المدينة'
          label='المنطقة'
        >
          nothing
        </CustomInput>
      )}
    </CustomModal>
  );
};

export default ControlLocationModal;
