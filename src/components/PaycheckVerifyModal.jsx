import React, { useState } from 'react';
import CustomModal from './CustomModal';
import { useDispatch, useSelector } from 'react-redux';
import { controlControlLocationModal } from '../redux/slices/ModalContollerSlice';
import { Box, Typography, Divider, Button } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useGetPaycheck } from '../customHooks/queries/useDonars';
import config from '../constants/enviroment';
import { getCurrency } from '../utils/methods';
import { PaymentsOutlined } from '@mui/icons-material';
import { useParams, useSearchParams } from 'react-router-dom';
import useVerifyPaycheck from '../customHooks/mutations/useVerifyPaycheck';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import ErrorMessage from './Messages/ErrorMessage';
import Loader from './Skeletons/Loader';

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
  const [selectedStatus, setSelectedStatus] = useState(null);

  const isOpen = useSelector(
    (state) => state.modalController.isControlLocationModalOpen,
  );
  const selectedType = useSelector(
    (state) => state.modalController.controlLocationModalType,
  );

  const selectedDonationID = useSelector(
    (state) => state.modalController.selectedLocationID,
  );

  console.log(selectedDonationID);

  const params = useParams();

  const {
    mutate: verify,
    isPending: isVerifying,
    error: verifyError,
  } = useVerifyPaycheck();

  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const locationType = searchParams?.get('type');

  const {
    data: paycheckData,
    isFetching,
    error: paycheckError,
  } = useGetPaycheck(selectedDonationID);

  const paycheck = paycheckData?.data || [];

  const close = () =>
    dispatch(controlControlLocationModal({ type: 'verify', id: null }));

  const handleSubmit = (e, status) => {
    e.preventDefault();
    setSelectedStatus(status);
    const data = { status };
    verify(
      { id: selectedDonationID, data },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: params?.id ? ['donars', params?.id] : [locationType],
          });
          dispatch(controlControlLocationModal('verify', null));
          toast.success('تم التحقق من الدفع!');
        },
      },
    );
  };

  return (
    <CustomModal
      isOpen={isOpen && selectedType === 'verify'}
      closeHandler={close}
      modalTitle='التحقق من الدفع'
      submitBtnTitle='متوافق'
      styles={{ width: 450 }}
      customSubmitBtnStyles={submitBtnStyles}
      isLoading={isVerifying && selectedStatus === 'متوافق'}
      isDisabled={isVerifying}
      onSubmit={(e) => handleSubmit(e, 'متوافق')}
      extraActions={
        <Button
          type='submit'
          onClick={(e) => handleSubmit(e, 'غير متوافق')}
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
          disabled={isVerifying}
        >
          {isVerifying && selectedStatus === 'غير متوافق' ? (
            <span className='btn-loader'></span>
          ) : (
            'غير متوافق'
          )}
        </Button>
      }
    >
      {isFetching ? (
        <Loader styles={{ minHeight: '228px' }} />
      ) : (
        <>
          {' '}
          {(verifyError || paycheckError) && (
            <ErrorMessage>
              {paycheckError ? paycheckError?.message : verifyError?.message}
            </ErrorMessage>
          )}
          {/* IMAGE CARD */}
          <Box
            component='img'
            src={`${config?.baseUrl}${paycheck?.image?.url}`}
            alt='paycheck'
            sx={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
              borderRadius: 2,
              backgroundColor: '#f5f5f5', // يعطي خلفية خفيفة بدل الفراغ
            }}
            disabled
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
              <PaymentsOutlined sx={{ color: '#014a5b' }} />
              <Typography fontWeight={600} color='#014a5b'>
                المبلغ
              </Typography>
            </Box>

            <Typography fontWeight={700} fontSize={16}>
              {`${paycheck?.contribution_amount} ${getCurrency(paycheck?.currency_type)}`}
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
        </>
      )}
    </CustomModal>
  );
};

export default PaycheckVerifyModal;
