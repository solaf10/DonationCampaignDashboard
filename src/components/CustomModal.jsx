import { Modal, Box, Typography, Button, IconButton } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';

export default function CustomModal({
  setIsOpen,
  isOpen,
  modalTitle,
  children,
  submitBtnTitle,
  styles,
}) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 420,
    bgcolor: 'white',
    borderRadius: '14px',
    boxShadow: '0 8px 24px rgba(1, 74, 91, 0.15)',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Cairo',
    ...styles,
  };

  const handleClose = () => setIsOpen(false);

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={style}>
        {/* 🔹 HEADER */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            borderBottom: '1px solid #e1eaea',
          }}
        >
          <Typography fontWeight='bold' fontSize={20}>
            {modalTitle}
          </Typography>

          <IconButton onClick={handleClose}>
            <CloseRounded />
          </IconButton>
        </Box>

        {/* 🔹 CONTENT (Scrollable) */}
        <Box
          sx={{
            px: 2,
            py: 3,
            maxHeight: 320,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {children}
        </Box>

        {/* 🔹 FOOTER */}
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            p: 2,
            borderTop: '1px solid #e1eaea',
          }}
        >
          <Button
            variant='contained'
            sx={{
              backgroundColor: '#014a5b',
              borderRadius: '8px',
              padding: '8px 24px',
            }}
          >
            {submitBtnTitle}
          </Button>
          <Button
            variant='outlined'
            onClick={handleClose}
            sx={{
              borderRadius: '8px',
              padding: '8px 24px',
              border: 'none',
              color: '#8c9ea0',
            }}
          >
            إلغاء
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
