import { useState } from 'react';
import CustomModal from './CustomModal';
import { useDispatch, useSelector } from 'react-redux';
import { controlControlLocationModal } from '../redux/slices/ModalContollerSlice';

import { Box, Typography } from '@mui/material';

import {
  useGetPaycheck,
  useGetReasons,
} from '../customHooks/queries/useDonars';

import { formatArabicDate, getCurrency } from '../utils/methods';

import { PaymentsOutlined, CalendarMonthOutlined } from '@mui/icons-material';

import { useParams, useSearchParams } from 'react-router-dom';
import useVerifyPaycheck from '../customHooks/mutations/useVerifyPaycheck';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';

import ErrorMessage from './Messages/ErrorMessage';
import Loader from './Skeletons/Loader';
import config from '../constants/enviroment';
import CustomInput from './locations/CustomInput';
import { CalendarIcon } from '@mui/x-date-pickers';
import PaycheckDecision from './PaycheckDecision';

const PaycheckVerifyModal = () => {
  const [formData, setFormData] = useState({
    status: '',
    reason: '',
    remaining_amount: '',
    on_the_other_hand: '',
  });

  const isOpen = useSelector(
    (state) => state.modalController.isControlLocationModalOpen,
  );

  const selectedType = useSelector(
    (state) => state.modalController.controlLocationModalType,
  );

  const selectedDonationID = useSelector(
    (state) => state.modalController.selectedLocationID,
  );

  const params = useParams();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const [searchParams] = useSearchParams();
  const locationType = searchParams?.get('type');

  const {
    mutate: verify,
    isPending: isVerifying,
    error: verifyError,
  } = useVerifyPaycheck();

  const {
    data: paycheckData,
    isFetching: isFetchingPaycheck,
    error: paycheckError,
  } = useGetPaycheck(selectedDonationID);

  const paycheck = paycheckData?.data || {};

  const {
    data: ReasonsData,
    isFetching: isFetchingReasons,
    error: reasonsError,
  } = useGetReasons();

  const isFetching = isFetchingPaycheck || isFetchingReasons;

  const reasons = ReasonsData?.data || [];
  const isRemaining =
    formData?.reason ===
    'عدم التطابق بين المبلغ المدفوع والمبلغ الموجود داخل الملف';

  // =========================
  // Close Modal
  // =========================
  const close = () => {
    setFormData({
      status: '',
      reason: '',
      remaining_amount: '',
      on_the_other_hand: '',
    });

    dispatch(
      controlControlLocationModal({
        type: 'verify',
        id: null,
      }),
    );
  };

  // =========================
  // Submit
  // =========================
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.status) {
      toast.error('يرجى اختيار القرار');
      return;
    }

    if (formData.status === 'غير متوافق' && !formData.reason) {
      toast.error('يرجى اختيار سبب عدم التوافق');
      return;
    }

    if (
      formData.status === 'غير متوافق' &&
      isRemaining &&
      !formData.remaining_amount
    ) {
      toast.error('يرجى إدخال المبلغ المتبقي');
      return;
    }

    verify(
      {
        id: selectedDonationID,
        data: {
          ...formData,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: params?.id ? ['donars', params.id] : [locationType],
          });

          close();

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
      submitBtnTitle='تأكيد القرار'
      styles={{
        width: 450,
      }}
      isLoading={isVerifying}
      isDisabled={isVerifying || !formData.status}
      onSubmit={handleSubmit}
    >
      {isFetching ? (
        <Loader
          styles={{
            minHeight: '228px',
          }}
        />
      ) : (
        <>
          {/* =========================
              Errors
          ========================= */}
          {(verifyError || paycheckError) && (
            <ErrorMessage
              styles={{
                position: 'sticky',
                width: '100%',
                top: '0',
                margin: '0',
              }}
            >
              {paycheckError ? paycheckError?.message : verifyError?.message}
            </ErrorMessage>
          )}

          {/* =========================
              NOTE
          ========================= */}
          <Box
            sx={{
              px: 2,
              py: 1.5,
              mb: 2,
              borderRadius: 2,
              backgroundColor: 'rgba(1, 74, 91, 0.04)',
              border: '1px solid rgba(1, 74, 91, 0.08)',
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
              يرجى مراجعة معلومات الدفع والتأكد من صحة الوصل قبل اتخاذ القرار.
            </Typography>
          </Box>

          <iframe
            src={`${config.baseUrl}${paycheck?.file}`}
            width='100%'
            height='300px'
            style={{ border: 'none', borderRadius: '8px', minHeight: '250px' }}
            title='Payment Receipt'
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
              <CalendarIcon sx={{ color: '#014a5b' }} />
              <Typography fontWeight={600} color='#014a5b'>
                التاريخ
              </Typography>
            </Box>

            <Typography fontWeight={700} fontSize={16}>
              {formatArabicDate(paycheck?.paiding_date)}
            </Typography>
          </Box>
          <PaycheckDecision
            formData={formData}
            setFormData={setFormData}
            reasons={reasons}
            isVerifying={isVerifying}
            reasonsError={reasonsError}
          />
        </>
      )}
    </CustomModal>
  );
};

export default PaycheckVerifyModal;
