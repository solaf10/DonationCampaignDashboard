import { Drawer, Box, Typography, IconButton, Button } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';

const FilterDrawer = ({
  title,
  children,
  onReset,
  resetBtnTitle = 'إعادة تعيين',
}) => {
  const dispatch = useDispatch();

  const isOpen = useSelector(
    (state) => state.modalController.isControlLocationModalOpen,
  );

  const selectedType = useSelector(
    (state) => state.modalController.controlLocationModalType,
  );

  const handleClose = () =>
    dispatch({
      type: 'modalController/controlControlLocationModal',
      payload: { type: 'filter', id: null },
    });

  return (
    <Drawer
      anchor='right'
      open={isOpen && selectedType === 'filter'}
      onClose={handleClose}
    >
      <Box
        sx={{
          width: 320,
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
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
          <Typography fontSize={20} fontWeight='bold'>
            {title}
          </Typography>

          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {children}

        <Button
          variant='contained'
          onClick={onReset}
          sx={{
            mt: 2,
            borderRadius: '999px',
            backgroundColor: '#E5E7EB',
            color: '#000',
            boxShadow: 'none',

            '&:hover': {
              backgroundColor: '#D1D5DB',
              boxShadow: 'none',
            },
          }}
        >
          {resetBtnTitle}
        </Button>
      </Box>
    </Drawer>
  );
};

export default FilterDrawer;
