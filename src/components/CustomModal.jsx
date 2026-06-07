import { Modal, Box, Typography, Button, IconButton } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';

export default function CustomModal({
  closeHandler,
  isOpen,
  modalTitle,
  children,
  submitBtnTitle,
  styles,
  onSubmit,
  isLoading,
  isDisabled,
  extraActions,
  customSubmitBtnStyles,
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

  return (
    <Modal open={isOpen} onClose={closeHandler}>
      <Box component='form' onSubmit={onSubmit} sx={style}>
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

          <IconButton onClick={closeHandler}>
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
          className='modal-content-holder'
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
            justifyContent: extraActions ? 'space-between' : 'flex-start',
          }}
        >
          <Box>
            <Button
              variant='contained'
              sx={{
                minWidth: '85px',
                backgroundColor: '#014a5b',
                borderRadius: '999px',
                padding: '8px 24px',
                ...customSubmitBtnStyles,
              }}
              className='btn'
              type='submit'
              disabled={isLoading || isDisabled}
            >
              {isLoading ? (
                <span className='btn-loader'></span>
              ) : (
                submitBtnTitle
              )}
            </Button>
            {extraActions}
          </Box>
          <Button
            variant='outlined'
            onClick={closeHandler}
            sx={{
              borderRadius: '999px',
              padding: '8px 24px',
              border: 'none',
              color: '#8c9ea0',
            }}
            className='back-btn'
          >
            إلغاء
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
