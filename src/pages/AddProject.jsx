import PageContainer from '../components/PageContainer';
import Title from '../components/Title';
import { useActiveStep } from '../contexts/ActiveStepContext';

import {
  FactCheckOutlined,
  FolderOutlined,
  InsightsOutlined,
  LocationOnOutlined,
  PhotoLibraryOutlined,
  RequestQuoteOutlined,
} from '@mui/icons-material';

import StepperForm from '../components/Stepper/StepperForm';

import SuccessMessageDialog from '../components/SuccessMessageDialog';
import AddBySelectionModal from '../components/AddBySelectionModal';

import { useEffect, useState } from 'react';
import useAddProject from '../customHooks/mutations/useAddProject';
import { useDispatch } from 'react-redux';
import { controlSuccessDialog } from '../redux/slices/ModalContollerSlice';
import Basic from '../components/Stepper/Projects/Basic';
import Location from '../components/Stepper/Projects/Location';
import Funding from '../components/Stepper/Projects/Funding';
import Progress from '../components/Stepper/Projects/Progress';
import Media from '../components/Stepper/Projects/Media';
import {
  containsOnlyArabicLetters,
  isArabicOnly,
  isWithinLength,
} from '../utils/validation/common.validation';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/Messages/ErrorMessage';

const steps = [
  'المعلومات الأساسية',
  'الموقع',
  'التمويل والتنفيذ',
  'تفاصيل المشروع',
];

const icons = {
  1: <FolderOutlined fontSize='small' />,
  2: <LocationOnOutlined fontSize='small' />,
  3: <RequestQuoteOutlined fontSize='small' />,
  4: <InsightsOutlined fontSize='small' />,
  5: <PhotoLibraryOutlined fontSize='small' />,
  6: <FactCheckOutlined fontSize='small' />,
};

const AddProject = () => {
  const { activeStep, setActiveStep } = useActiveStep();
  const [projectId, setProjectId] = useState('');

  /* ================= FORM DATA ================= */
  const [formData, setFormData] = useState({
    /* Basic */
    name: '',
    requirements: '',

    /* Location */
    government: '',
    city: '',
    district_uuid: '',

    /* Funding & Progress */
    funding_source: '',
    Implementing_party: '',
    estimated_cost: '',
    status: '',
    sector: '',
    on_the_other_hand: '',
    progress_percentage: '',
    cover_image: null,
  });

  const isDisabled =
    activeStep === 0
      ? formData.name.trim() === '' || formData.requirements.trim() === ''
      : activeStep === 1
        ? !formData.government || !formData.city || !formData.district_uuid
        : activeStep === 2
          ? !formData.funding_source ||
            !formData.Implementing_party ||
            !formData.estimated_cost
          : activeStep == 3
            ? !formData.sector ||
              !formData.status ||
              formData.cover_image === null
            : false;

  /* ================= ERRORS ================= */
  const [errors, setErrors] = useState({
    name: null,
    requirements: null,

    government: null,
    city: null,
    district_uuid: null,

    funding_source: null,
    Implementing_party: null,
    estimated_cost: null,

    status: null,
    sector: null,
    on_the_other_hand: null,
    progress_percentage: null,

    cover_image: null,
    extra_images: null,
    video_url: null,
  });
  const hasErrors = Object.values(errors).some((err) => err !== null);

  /* ================= SHARED STYLES ================= */
  const styles = {
    marginBottom: '24px',
  };

  /* ================= VALIDATION ================= */

  const {
    mutate: submitForm,
    isPending: isAdding,
    error: addError,
  } = useAddProject();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('requirements', formData.requirements);
    data.append('district_uuid', formData.district_uuid);
    data.append('funding_source', formData.funding_source);
    data.append('Implementing_party', formData.Implementing_party);
    data.append('estimated_cost', formData.estimated_cost);
    data.append('status', formData.status);
    data.append('sector', formData.sector);
    data.append('on_the_other_hand', formData.on_the_other_hand);
    data.append('progress_percentage', formData.progress_percentage);
    data.append('cover_image', formData.cover_image);

    const mutationOptions = {
      onSuccess: (data) => {
        dispatch(controlSuccessDialog({ type: 'add', id: data?.data?.uuid }));
        setProjectId(data.data.uuid);
      },
    };
    submitForm(data, mutationOptions);
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
    if (activeStep === 2) {
      if (!isWithinLength(formData.Implementing_party, 3, 50)) {
        setErrors((prev) => ({
          ...prev,
          name: 'يجب أن يتراوح عدد الأحرف بين 3 و50 حرف',
        }));
        isValid = false;
      }
    }
    if (!isValid) return;
    setActiveStep((prev) => prev + 1);
  };

  useEffect(() => {
    setActiveStep(0);
  }, []);

  return (
    <PageContainer>
      <Title
        pageTitle='إضافة مشروع جديد'
        subtitle='أكمل الخطوات التالية لإضافة مشروع جديد'
      />
      {addError && <ErrorMessage>{addError.message}</ErrorMessage>}
      <StepperForm
        icons={icons}
        steps={steps}
        isDisabled={hasErrors || isDisabled || isAdding}
        isSubmit={activeStep === 3}
        onForwardAction={activeStep === 3 ? handleSubmit : handleNext}
        actionBtnTitle={
          isAdding ? (
            <div className='btn-loader'></div>
          ) : activeStep === 3 ? (
            'إضافة المشروع'
          ) : (
            'التالي'
          )
        }
        /* backBtnTitle = 'رجوع', */
        /* onBackwardAction */
        onSubmit={handleSubmit}
      >
        {/* ================= BASIC ================= */}
        {activeStep === 0 ? (
          <Basic
            formData={formData}
            setFormData={setFormData}
            styles={styles}
            errors={errors}
            setErrors={setErrors}
          />
        ) : activeStep === 1 ? (
          /* ================= LOCATION ================= */
          <div className='form-holder'>
            <Location
              formData={formData}
              setFormData={setFormData}
              styles={styles}
              errors={errors}
              isRequired={true}
            />
          </div>
        ) : activeStep === 2 ? (
          /* ================= Funding ================= */
          <Funding
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            styles={styles}
          />
        ) : (
          /* ================= INFO ================= */
          <Progress
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            styles={styles}
          />
        )}
      </StepperForm>

      {/* ================= SUCCESS MODAL ================= */}
      <SuccessMessageDialog
        title='تم إنشاء المشروع بنجاح!'
        desc='تم إنشاء مشروعك بنجاح. يمكنك متابعة إعداد المشروع بإكمال الخطوات الإضافية (إضافة الوسائط وربط المشروع بحملة).'
        btnTitle='المتابعة الآن'
        onConfirm={() => {
          navigate(`/content/projects/add/additional/${projectId}`);
          dispatch(controlSuccessDialog({ type: 'add' }));
        }}
        dialogType='add'
      />
    </PageContainer>
  );
};

export default AddProject;
