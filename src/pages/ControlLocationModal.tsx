import React, { useEffect, useState } from 'react';
import CustomModal from '../components/CustomModal';
import CustomInput from '../components/locations/CustomInput';
import { MenuItem } from '@mui/material';

const ControlLocationModal = ({ isOpen, setIsOpen, title, locationType }) => {
  const [government, setGovernment] = useState('');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  return (
    <CustomModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      modalTitle={title}
      submitBtnTitle='إضافة'
    >
      <CustomInput
        inputType={locationType === 'government' ? 'input' : 'select'}
        isDisabled={false}
        helperText={null}
        label='المحافظة'
        value={government}
        setValue={setGovernment}
      >
        <MenuItem value='homs'>حمص</MenuItem>
        <MenuItem value='hama'>حماة</MenuItem>
      </CustomInput>
      {locationType != 'government' && (
        <CustomInput
          inputType={locationType === 'city' ? 'input' : 'select'}
          isDisabled={government === ''}
          helperText='يتم تفعيل هذا الحقل بعد اختيار المحافظة'
          label='المدينة'
          value={city}
          setValue={setCity}
        >
          <MenuItem value='homs'>حمص</MenuItem>
          <MenuItem value='hama'>حماة</MenuItem>
        </CustomInput>
      )}
      {locationType == 'area' && (
        <CustomInput
          inputType={locationType === 'area' ? 'input' : 'select'}
          isDisabled={city === ''}
          helperText='يتم تفعيل هذا الحقل بعد اختيار المدينة'
          label='المنطقة'
          value={area}
          setValue={setArea}
        >
          <MenuItem value='homs'>حمص</MenuItem>
          <MenuItem value='hama'>حماة</MenuItem>
        </CustomInput>
      )}
    </CustomModal>
  );
};

export default ControlLocationModal;
