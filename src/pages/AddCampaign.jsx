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
import { controlSuccessDialog } from '../redux/slices/ModalContollerSlice';
import useAddCampaign from '../customHooks/mutations/useAddCampaign';

const steps = ['معلومات الحملة', 'جدولة للحملة', 'التمويل والوسائط'];

const projects = [
  {
    id: 1,
    name: 'مشروع التخرج',
    location: 'حمص-الحمراء',
  },
  {
    id: 2,
    name: 'تعليم إلكتروني',
    location: 'حمص-الحميدية',
  },
  {
    id: 3,
    name: 'متجر إلكتروني',
    location: 'دمشق-الحميدية',
  },
  {
    id: 4,
    name: 'تطبيق حجوزات',
    location: 'حماة-ابن رشد',
  },
];

const AddCampaign = () => {
  const { activeStep, setActiveStep } = useActiveStep();
  const [formData, setFormData] = useState({
    name: '',
    purposes: '',
    target_amount: '',
    start_time: null,
    end_time: null,
    start_date: null,
    end_date: null,
  });
  const [errors, setErrors] = useState({
    name: null,
    purposes: null,
    target_amount: null,
    start_time: null,
    end_time: null,
    start_date: null,
    end_date: null,
  });
  const hasErrors = false;

  const isDisabled =
    activeStep === 0
      ? formData.name.trim() === '' || formData.purposes.trim() === ''
      : activeStep === 1
        ? !formData.target_amount ||
          !formData.start_date ||
          !formData.end_date ||
          !formData.start_time ||
          !formData.end_time
        : false;

  const icons = {
    1: <InfoOutline fontSize='small' />,
    2: <EventOutlined fontSize='small' />,
    3: <PaymentsOutlined fontSize='small' />,
  };
  // custom input custom styles
  const styles = {
    marginBottom: '24px',
  };

  const {
    mutate: submitForm,
    isPending: isAdding,
    error: addError,
  } = useAddCampaign();

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      start_date: formData.start_date?.format('YYYY-MM-DD'),
      end_date: formData.end_date?.format('YYYY-MM-DD'),
      start_time: formData.start_time?.format('HH:mm'),
      end_time: formData.end_time?.format('HH:mm'),
    };
    const mutationOptions = {
      onSuccess: () => {
        dispatch(controlSuccessDialog(null));
      },
      onError: (err) => {
        const message = err?.message || 'حدث خطأ أثناء حفظ البيانات';
        /* setFormError(message); */
      },
    };
    submitForm(payload, mutationOptions);
  };
  const handleNext = (e) => {
    e.preventDefault();
    let isValid = true;
    /* if (activeStep === 0) {
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
      if (!formData.requirements) {
        setErrors((prev) => ({
          ...prev,
          requirements: 'يرجى إدخال المتطلبات',
        }));
        isValid = false;
      }
      if (!containsOnlyArabicLetters(formData.requirements)) {
        setErrors((prev) => ({
          ...prev,
          requirements:
            'المتطلبات يجب أن تكون باللغة العربية فقط، ويمكن استخدام الأرقام والرموز',
        }));
        isValid = false;
      }
    }
    if (!isValid) return; */
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
        isSubmit={activeStep === 1}
        onForwardAction={activeStep === 1 ? handleSubmit : handleNext}
        actionBtnTitle={
          isAdding ? (
            <div className='btn-loader'></div>
          ) : activeStep === 1 ? (
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
        ) : (
          <Schedule
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
      />
      <AddBySelectionModal
        entriesType='projects'
        entries={projects}
        modalTitle='إضافة مشاريع مرتبطة'
      />
    </PageContainer>
  );
};

export default AddCampaign;
