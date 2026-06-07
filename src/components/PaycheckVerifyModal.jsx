import React from 'react';
import CustomModal from './CustomModal';
import { useDispatch, useSelector } from 'react-redux';
import { controlControlLocationModal } from '../redux/slices/ModalContollerSlice';
import { Box, Typography, Divider, Button } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const submitBtnStyles = {
  minWidth: '85px',
  borderRadius: '999px',
  padding: '8px 24px',
  backgroundColor: '#e8f5e9',
  color: '#2e7d32',
  fontWeight: 600,
  boxShadow: 'none',
  transition: '0.2s',
  '&:hover': {
    backgroundColor: '#d7efda',
    boxShadow: 'none',
    transform: 'translateY(-1px)',
  },
};

const PaycheckVerifyModal = () => {
  const isOpen = useSelector(
    (state) => state.modalController.isControlLocationModalOpen,
  );

  const dispatch = useDispatch();

  const close = () =>
    dispatch(controlControlLocationModal({ type: 'verify', id: null }));

  return (
    <CustomModal
      isOpen={isOpen}
      closeHandler={close}
      modalTitle='التحقق من الدفع'
      submitBtnTitle='متوافق'
      styles={{ width: 450 }}
      customSubmitBtnStyles={submitBtnStyles}
      extraActions={
        <Button
          type='submit'
          onClick={() => console.log('reject')}
          sx={{
            ml: 1,
            minWidth: '85px',
            borderRadius: '999px',
            padding: '8px 24px',
            backgroundColor: '#fdecec',
            color: '#d32f2f',
            boxShadow: 'none',
            transition: '0.2s',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: '#f9d6d6',
              boxShadow: 'none',
              transform: 'translateY(-1px)',
            },
          }}
        >
          غير متوافق
        </Button>
      }
    >
      {/* IMAGE CARD */}
      <Box
        component='img'
        src='/paycheck.jpg'
        alt='paycheck'
        sx={{
          width: '100%',
          height: 'auto',
          objectFit: 'contain',
          borderRadius: 2,
          backgroundColor: '#f5f5f5', // يعطي خلفية خفيفة بدل الفراغ
        }}
      />

      {/* AMOUNT CARD */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2,
          py: 0.5,
          borderRadius: 3,
          backgroundColor: '#f8fafb',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AttachMoneyIcon sx={{ color: '#014a5b' }} />
          <Typography fontWeight={600} color='#014a5b'>
            المبلغ
          </Typography>
        </Box>

        <Typography fontWeight={700} fontSize={16}>
          50000 $
        </Typography>
      </Box>

      {/* NOTE */}
      <Box
        sx={{
          px: 2,
          py: 2,
          borderRadius: 2,
          backgroundColor: 'rgba(1, 74, 91, 0.04)',
          textAlign: 'center',
        }}
      >
        <Typography
          sx={{
            fontSize: 12.5,
            color: '#5f6b6d',
            lineHeight: 1.6,
          }}
        >
          يرجى التأكد من صحة الوصل قبل الموافقة
        </Typography>
      </Box>
    </CustomModal>
  );
};

export default PaycheckVerifyModal;
