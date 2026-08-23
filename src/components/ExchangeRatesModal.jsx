import { useEffect, useState } from 'react';
import CustomModal from './CustomModal';
import CustomInput from './locations/CustomInput';
import ErrorMessage from './Messages/ErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { controlExchangeModal } from '../redux/slices/ModalContollerSlice';
import { useGetExchangeRates } from '../customHooks/queries/useFinance';
import { toast } from 'react-toastify';
import useEditExchangeRate from '../customHooks/mutations/useEditExchanage';

const ExchangeRatesModal = () => {
  const isOpen = useSelector(
    (state) => state.modalController.isControlExchangeModalOpen,
  );

  const dispatch = useDispatch();

  const closeHandler = () => {
    dispatch(controlExchangeModal());
  };

  const [euroRate, setEuroRate] = useState(null);
  const [sypRate, setSypRate] = useState(null);

  const [error, setError] = useState(null);
  const [isNotChanged, setIsNotChanged] = useState(false);

  /*
   * =========================
   * GET EXCHANGE RATES
   * =========================
   */

  const {
    data: exchangeRates,
    isFetching: isFetchingRates,
    error: initialRatesErr,
  } = useGetExchangeRates();

  const initialRates = exchangeRates?.data || [];

  /*
   * =========================
   * GET CURRENCIES
   * =========================
   */

  const originalSypRate =
    initialRates.find((rate) => rate.currency === 'SYR') || null;

  const originalEuroRate =
    initialRates.find((rate) => rate.currency === 'EUR') || null;

  /*
   * =========================
   * MUTATIONS
   * =========================
   */

  const { mutateAsync: editSyrRate, isPending: isEditingSyr } =
    useEditExchangeRate(originalSypRate?.uuid);

  const { mutateAsync: editEurRate, isPending: isEditingEur } =
    useEditExchangeRate(originalEuroRate?.uuid);

  /*
   * =========================
   * INITIAL VALUES
   * =========================
   */

  useEffect(() => {
    if (!isOpen) return;

    if (originalSypRate) {
      setSypRate({
        ...originalSypRate,
        rate: parseFloat(
          String(originalSypRate.rate).replace('USD', '').trim(),
        ),
      });
    }

    if (originalEuroRate) {
      setEuroRate({
        ...originalEuroRate,
        rate: parseFloat(
          String(originalEuroRate.rate).replace('USD', '').trim(),
        ),
      });
    }

    setError(null);
    setIsNotChanged(false);
  }, [isOpen, exchangeRates]);

  /*
   * =========================
   * HANDLE INPUT
   * =========================
   */

  const handleNumberChange = (value, setter) => {
    if (/^\d*\.?\d*$/.test(value)) {
      setter((prev) => ({
        ...prev,
        rate: value,
      }));

      setIsNotChanged(false);
      setError(null);
    }
  };

  /*
   * =========================
   * SUBMIT
   * =========================
   */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setIsNotChanged(false);

    /*
     * التأكد من وجود العملات
     */

    if (!sypRate || !euroRate) {
      setError('تعذر تحميل أسعار الصرف.');
      return;
    }

    /*
     * التأكد من القيم
     */

    if (!sypRate.rate || !euroRate.rate) {
      setError('يرجى إدخال أسعار الصرف.');
      return;
    }

    if (Number(sypRate.rate) <= 0 || Number(euroRate.rate) <= 0) {
      setError('يجب أن تكون أسعار الصرف أكبر من الصفر.');
      return;
    }

    /*
     * =========================
     * CHECK CHANGES
     * =========================
     */

    const originalSypValue = parseFloat(
      String(originalSypRate?.rate).replace('USD', '').trim(),
    );

    const originalEuroValue = parseFloat(
      String(originalEuroRate?.rate).replace('USD', '').trim(),
    );

    const isSypChanged = Number(sypRate.rate) !== Number(originalSypValue);

    const isEurChanged = Number(euroRate.rate) !== Number(originalEuroValue);

    /*
     * لم يتم تغيير أي شيء
     */

    if (!isSypChanged && !isEurChanged) {
      setIsNotChanged(true);
      return;
    }

    try {
      /*
       * =========================
       * UPDATE REQUESTS
       * =========================
       */

      const requests = [];

      /*
       * تعديل الليرة السورية
       */

      if (isSypChanged) {
        requests.push(
          editSyrRate({
            rate: Number(sypRate.rate),
          }),
        );
      }

      /*
       * تعديل اليورو
       */

      if (isEurChanged) {
        requests.push(
          editEurRate({
            rate: Number(euroRate.rate),
          }),
        );
      }

      /*
       * انتظار جميع الطلبات
       */

      await Promise.all(requests);

      /*
       * إذا نجحت جميع الطلبات
       */

      toast.success('تم تعديل أسعار الصرف بنجاح!');

      closeHandler();
    } catch (err) {
      /*
       * إذا فشل أي طلب
       */

      setError(err?.message || 'حدث خطأ أثناء تعديل أسعار الصرف.');
    }
  };

  /*
   * =========================
   * LOADING
   * =========================
   */

  const isLoading = isFetchingRates || isEditingSyr || isEditingEur;

  /*
   * =========================
   * UI
   * =========================
   */

  return (
    <CustomModal
      isOpen={isOpen}
      closeHandler={closeHandler}
      modalTitle='أسعار صرف العملات'
      submitBtnTitle='حفظ التعديلات'
      styles={{
        width: '420px',
      }}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isDisabled={!euroRate?.rate || !sypRate?.rate}
    >
      {error && <ErrorMessage>{error}</ErrorMessage>}

      {isNotChanged && (
        <ErrorMessage warning={true}>
          لم تقم بتغيير البيانات بعد. الرجاء تعديل سعر صرف واحد على الأقل قبل
          حفظ التعديلات.
        </ErrorMessage>
      )}

      {/* توضيح العملة المرجعية */}

      <div
        style={{
          backgroundColor: '#f5f8f9',
          borderRadius: '10px',
          padding: '12px 14px',
          color: '#5f7377',
          fontFamily: 'Cairo',
          fontSize: '14px',
          lineHeight: '1.8',
        }}
      >
        يتم اعتماد{' '}
        <strong
          style={{
            color: 'var(--main-color)',
          }}
        >
          الدولار الأمريكي
        </strong>{' '}
        كعملة مرجعية لأسعار الصرف.
      </div>

      {/* =========================
          سعر الليرة السورية
         ========================= */}

      <CustomInput
        label='قيمة الليرة السورية مقابل الدولار'
        inputType='input'
        placeholder='مثال: 15000'
        value={sypRate?.rate ?? ''}
        setValue={(e) => {
          handleNumberChange(e.target.value, setSypRate);
        }}
        isNestedState={true}
        isRequired={true}
        styles={{
          height: 'auto',

          '& .MuiInputLabel-root.Mui-focused': {
            color: 'var(--main-color)',
          },
        }}
        helperText='1 دولار = القيمة المدخلة بالليرة السورية'
      />

      {/* =========================
          سعر اليورو
         ========================= */}

      <CustomInput
        label='قيمة اليورو مقابل الدولار'
        inputType='input'
        placeholder='مثال: 1.17'
        value={euroRate?.rate ?? ''}
        setValue={(e) => {
          handleNumberChange(e.target.value, setEuroRate);
        }}
        isNestedState={true}
        isRequired={true}
        styles={{
          height: 'auto',

          '& .MuiInputLabel-root.Mui-focused': {
            color: 'var(--main-color)',
          },
        }}
        helperText='1 يورو = القيمة المدخلة بالدولار'
      />
    </CustomModal>
  );
};

export default ExchangeRatesModal;
