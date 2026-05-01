import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import './SuccessMessageDialog.css';
import { CheckCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  controlAddBySelectionModal,
  controlSuccessDialog,
} from '../redux/slices/ModalContollerSlice';

export default function SuccessMessageDialog({ title, desc, btnTitle }) {
  const isOpen = useSelector(
    (state) => state.modalController.isSuccessDialogOpen
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleClose = () => {
    dispatch(controlSuccessDialog());
    navigate(-1);
  };

  const handleAddProjects = () => {
    dispatch(controlSuccessDialog());
    dispatch(controlAddBySelectionModal());
  };

  return (
    <>
      <Dialog open={isOpen} onClose={handleClose} className='success-dialog'>
        <DialogTitle style={{ textAlign: 'center' }}>
          <CheckCircle
            sx={{ fontSize: 50, color: 'var(--main-color)', opacity: '0.9' }}
          />
          <Typography
            sx={{ fontFamily: 'Cairo', fontWeight: 'bold', fontSize: '18px' }}
          >
            {title}
          </Typography>
        </DialogTitle>

        <DialogContent>
          <Typography
            sx={{
              fontFamily: 'Cairo',
              fontSize: '14px',
              color: '#6B7280',
            }}
          >
            {desc}
          </Typography>
        </DialogContent>

        <DialogActions sx={{ padding: '16px' }}>
          <Button
            variant='contained'
            sx={{
              backgroundColor: '#014a5b',
              borderRadius: '10px',
              padding: '10px 20px',
              textTransform: 'none',
              fontWeight: 600,
            }}
            onClick={handleAddProjects}
            className='btn'
          >
            {btnTitle}
          </Button>
          <Button
            variant='outlined'
            onClick={handleClose}
            sx={{
              borderRadius: '8px',
              padding: '8px 24px',
              border: 'none',
              color: '#6B7280',
              textTransform: 'none',
              fontWeight: 500,
            }}
            className='back-btn'
          >
            لاحقًا
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
