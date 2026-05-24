import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

import './SuccessMessageDialog.css';

import { CheckCircle, WarningAmber } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import {
  controlAddBySelectionModal,
  controlSuccessDialog,
} from '../redux/slices/ModalContollerSlice';

export default function SuccessMessageDialog({
  title,
  desc,
  btnTitle,
  type = 'success',
  onConfirm,
  isLoading = false,
  error,
  onClearError,
}) {
  const isOpen = useSelector(
    (state) => state.modalController.isSuccessDialogOpen,
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isWarning = type === 'warning';

  // ✅ امسح الخطأ لما الديالوج ينغلق
  useEffect(() => {
    if (!isOpen && error && onClearError) {
      onClearError();
    }
  }, [isOpen]);

  const handleClose = () => {
    dispatch(controlSuccessDialog());

    if (!isWarning) {
      navigate(-1);
    }
  };

  const handlePrimaryAction = () => {
    if (isWarning && onConfirm) {
      onConfirm();
      return;
    }

    dispatch(controlSuccessDialog());
    dispatch(controlAddBySelectionModal());
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} className='success-dialog'>
      <DialogTitle style={{ textAlign: 'center' }}>
        {isWarning ? (
          <WarningAmber sx={{ fontSize: 50, color: '#b3261e', opacity: 0.9 }} />
        ) : (
          <CheckCircle
            sx={{ fontSize: 50, color: 'var(--main-color)', opacity: 0.9 }}
          />
        )}

        <Typography
          sx={{ fontFamily: 'Cairo', fontWeight: 'bold', fontSize: '18px' }}
        >
          {title}
        </Typography>
      </DialogTitle>

      <DialogContent>
        {error ? (
          <Typography
            sx={{
              fontFamily: 'Cairo',
              fontSize: '14px',
              color: '#B3261E',
              backgroundColor: '#FDECEC',
              padding: '10px 12px',
              borderRadius: '8px',
            }}
          >
            {error}
          </Typography>
        ) : (
          <Typography
            sx={{
              fontFamily: 'Cairo',
              fontSize: '14px',
              color: '#6B7280',
            }}
          >
            {desc}
          </Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ padding: '16px' }}>
        <Button
          variant='contained'
          onClick={handlePrimaryAction}
          disabled={isLoading}
          sx={{
            backgroundColor: isWarning ? '#b3261e' : '#014a5b',
            minWidth: '80px',
            height: '45px',
            borderRadius: '99px',
            textTransform: 'none',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: isWarning ? '#8f1d16' : '#014a5b',
            },
            '&.Mui-disabled': {
              backgroundColor: '#e0b4b4!important',
            },
          }}
        >
          {isLoading ? <div className='btn-loader'></div> : btnTitle}
        </Button>

        <Button
          variant='outlined'
          onClick={handleClose}
          sx={{
            borderRadius: '99px',
            padding: '8px 24px',
            border: 'none',
            color: '#6B7280',
            textTransform: 'none',
            fontWeight: 500,
          }}
        >
          {isWarning ? 'إلغاء' : 'لاحقًا'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
