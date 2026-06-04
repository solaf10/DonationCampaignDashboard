import PageContainer from '../components/PageContainer';
import Title from '../components/Title';
import CampaignsForm from '../components/CampaignsForm';
import { useState } from 'react';
import { useActiveStep } from '../contexts/ActiveStepContext';
import StepperForm from '../components/Stepper/StepperForm';
import Basic from '../components/Stepper/Campaigns/Basic';
import Schedule from '../components/Stepper/Campaigns/Schedule';
import {
  EventOutlined,
  InfoOutline,
  PaymentsOutlined,
} from '@mui/icons-material';
import AddBySelectionModal from '../components/AddBySelectionModal';
import SuccessMessageDialog from '../components/SuccessMessageDialog';
import { useDispatch } from 'react-redux';
import {
  controlAddBySelectionModal,
  controlSuccessDialog,
} from '../redux/slices/ModalContollerSlice';
import useAddCampaign from '../customHooks/mutations/useAddCampaign';
import FundingMedia from '../components/Stepper/Campaigns/FundingMedia';
import {
  containsOnlyArabicLetters,
  isArabicOnly,
  isWithinLength,
} from '../utils/validation/common.validation';
import dayjs from 'dayjs';

const steps = ['معلومات الحملة', 'جدولة للحملة', 'التمويل والوسائط'];

const icons = {
  1: <InfoOutline fontSize='small' />,
  2: <EventOutlined fontSize='small' />,
  3: <PaymentsOutlined fontSize='small' />,
};

const styles = {
  marginBottom: '24px',
};

const AddCampaign = () => {
  const { activeStep, setActiveStep } = useActiveStep();
  const [campaignId, setCampaignId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    purposes: '',
    target_amount: '',
    start_time: null,
    end_time: null,
    start_date: null,
    end_date: null,
    image: null,
  });
  const [errors, setErrors] = useState({
    name: null,
    purposes: null,
    target_amount: null,
    start_time: null,
    end_time: null,
    start_date: null,
    end_date: null,
    image: null,
  });
  const hasErrors = Object.values(errors).some((err) => err !== null);

  const isDisabled =
    activeStep === 0
      ? formData.name.trim() === '' || formData.purposes.trim() === ''
      : activeStep === 1
        ? !formData.start_date ||
          !formData.end_date ||
          !formData.start_time ||
          !formData.end_time
        : activeStep === 2
          ? !formData.target_amount || !formData.image
          : false;

  const {
    mutate: submitForm,
    isPending: isAdding,
    error: addError,
  } = useAddCampaign();

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = new FormData();

    payload.append('name', formData.name);
    payload.append('purposes', formData.purposes);
    payload.append('target_amount', formData.target_amount);

    payload.append('start_date', formData.start_date?.format('YYYY-MM-DD'));

    payload.append('end_date', formData.end_date?.format('YYYY-MM-DD'));

    payload.append('start_time', formData.start_time?.format('HH:mm'));

    payload.append('end_time', formData.end_time?.format('HH:mm'));

    payload.append('image', formData.image);
    const mutationOptions = {
      onSuccess: (data) => {
        dispatch(controlSuccessDialog({ type: 'add', id: null }));
        setCampaignId(data?.data?.uuid);
        setActiveStep(0);
      },
    };
    submitForm(payload, mutationOptions);
  };
  const handleNext = (e) => {
    e.preventDefault();
    let isValid = true;
    if (activeStep === 0) {
      if (!formData.name) {
        setErrors((prev) => ({ ...prev, name: 'يرجى إدخال الاسم' }));
        isValid = false;
      }
      if (!isWithinLength(formData.name, 3, 100)) {
        setErrors((prev) => ({
          ...prev,
          name: 'يجب أن يتراوح عدد الأحرف بين 3 و100 حرف',
        }));
        isValid = false;
      }
      if (!isArabicOnly(formData.name)) {
        setErrors((prev) => ({
          ...prev,
          name: 'يسمح فقط بالأحرف العربية والمسافات',
        }));
        isValid = false;
      }
      if (!formData.purposes) {
        setErrors((prev) => ({
          ...prev,
          purposes: 'يرجى إدخال الأهداف',
        }));
        isValid = false;
      }
      if (!containsOnlyArabicLetters(formData.purposes)) {
        setErrors((prev) => ({
          ...prev,
          purposes:
            'الأهداف يجب أن تكون باللغة العربية فقط، ويمكن استخدام الأرقام والرموز',
        }));
        isValid = false;
      }
    }
    if (activeStep === 1) {
      const start = dayjs(formData.start_date);
      const end = dayjs(formData.end_date);

      if (!start.isValid()) {
        setErrors((prev) => ({
          ...prev,
          start_date: 'تاريخ البدء غير صالح',
        }));
        isValid = false;
      }

      if (!end.isValid()) {
        setErrors((prev) => ({
          ...prev,
          end_date: 'تاريخ الانتهاء غير صالح',
        }));
        isValid = false;
      }

      if (end.isBefore(start)) {
        setErrors((prev) => ({
          ...prev,
          end_date: 'تاريخ الانتهاء يجب أن يكون بعد تاريخ البدء',
        }));
        isValid = false;
      }

      if (!formData.start_time || !formData.end_time) {
        setErrors((prev) => ({
          ...prev,
          start_time: 'يرجى إدخال الوقت',
          end_time: 'يرجى إدخال الوقت',
        }));
        isValid = false;
      }
    }
    if (!isValid) return;
    setActiveStep((prev) => prev + 1);
  };

  return (
    <PageContainer>
      <Title
        pageTitle='إضافة حملة جديدة'
        subtitle='أكمل الخطوات التالية لإضافة حملة جديدة'
      />
      {addError && (
        <div
          style={{
            backgroundColor: '#ffebee',
            color: '#b71c1c',
            borderRadius: '12px',
            padding: '12px 16px',
            fontSize: '14px',
            lineHeight: 1.6,
            fontFamily: 'Cairo',
            boxShadow: '0 2px 8px rgba(244, 67, 54, 0.12)',
            marginBottom: '16px',
          }}
        >
          {addError.message}
        </div>
      )}
      <StepperForm
        icons={icons}
        steps={steps}
        isDisabled={hasErrors || isDisabled || isAdding}
        isSubmit={activeStep === 2}
        onForwardAction={activeStep === 2 ? handleSubmit : handleNext}
        actionBtnTitle={
          isAdding ? (
            <div className='btn-loader'></div>
          ) : activeStep === 2 ? (
            'إضافة الحملة'
          ) : (
            'التالي'
          )
        }
        /* backBtnTitle = 'رجوع', */
        /* onBackwardAction */
        onSubmit={handleSubmit}
      >
        {activeStep === 0 ? (
          <Basic
            formData={formData}
            setFormData={setFormData}
            styles={styles}
            errors={errors}
          />
        ) : activeStep === 1 ? (
          <Schedule
            formData={formData}
            setFormData={setFormData}
            styles={styles}
            errors={errors}
          />
        ) : (
          <FundingMedia
            formData={formData}
            setFormData={setFormData}
            styles={styles}
            errors={errors}
          />
        )}
      </StepperForm>
      {/* Projects Modal */}
      <SuccessMessageDialog
        title='تم إنشاء الحملة بنجاح!'
        desc='تم إنشاء حملتك بنجاح. يمكنك الآن إضافة مشاريع مرتبطة أو القيام بذلك لاحقًا.'
        btnTitle='إضافة مشاريع الآن'
        onConfirm={() => dispatch(controlAddBySelectionModal(campaignId))}
        dialogType='add'
      />
      <AddBySelectionModal
        entriesType='projects'
        modalTitle='إضافة مشاريع مرتبطة'
      />
    </PageContainer>
  );
};

export default AddCampaign;
