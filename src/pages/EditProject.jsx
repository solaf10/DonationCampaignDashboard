import PageContainer from '../components/PageContainer';
import Title from '../components/Title';
import { useEffect, useState } from 'react';
import { useActiveStep } from '../contexts/ActiveStepContext';
import StepperForm from '../components/Stepper/StepperForm';
import AddBySelectionModal from '../components/AddBySelectionModal';
import SuccessMessageDialog from '../components/SuccessMessageDialog';
import {
  containsOnlyArabicLetters,
  isArabicOnly,
  isWithinLength,
} from '../utils/validation/common.validation';
import { useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { useSingleProject } from '../customHooks/queries/useProjects';
import { toast } from 'react-toastify';
import Loader from '../components/Skeletons/Loader';
import ErrorMessage from '../components/Messages/ErrorMessage';
import Basic from '../components/Stepper/Projects/Basic';
import Location from '../components/Stepper/Projects/Location';
import Funding from '../components/Stepper/Projects/Funding';
import Progress from '../components/Stepper/Projects/Progress';
import Media from '../components/Stepper/Projects/Media';
import {
  FolderOutlined,
  InsightsOutlined,
  LocationOnOutlined,
  PhotoLibraryOutlined,
  RequestQuoteOutlined,
} from '@mui/icons-material';
import useEditProject from '../customHooks/mutations/useEditProject';

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
};

const styles = {
  marginBottom: '24px',
};
const EditProject = () => {
  const { activeStep, setActiveStep } = useActiveStep();
  const [formData, setFormData] = useState({
    name: '',
    requirements: '',

    government: '',
    city: '',
    district_uuid: '',

    funding_source: '',
    Implementing_party: '',
    estimated_cost: '',
    status: '',
    sector: '',
    on_the_other_hand: '',
    progress_percentage: '',

    cover_image: null,

    // القديمة
    images: [],
    videos: [],

    // الجديدة
    newImages: [],
  });
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
    images: null,
    videos: null,
    newImages: null,
  });

  const hasErrors = Object.values(errors).some((err) => err !== null);

  const isDisabled =
    activeStep === 0
      ? formData?.name?.trim() === '' || formData?.requirements?.trim() === ''
      : activeStep === 1
        ? !formData?.government || !formData?.city || !formData?.district_uuid
        : activeStep === 2
          ? !formData?.funding_source ||
            !formData?.Implementing_party ||
            !formData?.estimated_cost
          : activeStep == 3
            ? !formData?.sector || !formData?.status
            : false;

  const {
    mutate: submitForm,
    isPending: isEditting,
    error: editError,
  } = useEditProject();

  const navigate = useNavigate();
  const params = useParams();

  const { data: projectDetailsData, isFetching: isFetchingCampaignDetails } =
    useSingleProject(params?.id);

  const projectDetails = projectDetailsData?.data?.project || {
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
    images: [],
    videos: [],
    newImages: [],
  };
  const {
    name,
    requirements,
    estimated_cost,
    Implementing_party,
    funding_source,
    status,
    sector,
    cover_image,
    progress_percentage,
    district,
    videos,
    images,
  } = projectDetails;

  const isDataNotChanged =
    formData.sector === sector &&
    formData.status === status &&
    formData.name === name &&
    formData.cover_image === null &&
    formData.videos.length === 0 &&
    formData.images.length === 0 &&
    formData.requirements === requirements &&
    formData.estimated_cost === estimated_cost &&
    formData.Implementing_party === Implementing_party &&
    formData.funding_source === funding_source &&
    formData.government === district?.city?.governorate?.uuid &&
    formData.city === district?.city?.uuid &&
    formData.district_uuid === district?.uuid &&
    formData.progress_percentage === progress_percentage;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isDataNotChanged) {
      return;
    }

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
    if (formData?.cover_image instanceof File)
      data.append('cover_image', formData.cover_image);

    formData.newImages?.forEach((img) => {
      data.append('images[]', img);
    });

    formData.videos?.forEach((video) => {
      if (typeof video === 'string') {
        data.append('videos[]', video);
      } else {
        data.append('videos[]', video.url);
      }
    });

    const mutationOptions = {
      onSuccess: () => {
        setActiveStep(0);
        toast.success('تم تعديل الحملة بنجاح!');
        navigate(-1);
      },
    };
    submitForm(
      {
        id: params.id,
        body: data,
      },
      mutationOptions,
    );
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
    setFormData((prev) => ({
      ...prev,
      name,
      requirements,
      estimated_cost: parseInt(estimated_cost),
      Implementing_party,
      funding_source,
      status,
      sector,
      cover_image,
      progress_percentage: parseInt(progress_percentage),
      district_uuid: district?.uuid,
      city: district?.city?.uuid,
      government: district?.city?.governorate?.uuid,

      images: images || [],
      videos: videos || [],

      newImages: [],
    }));
  }, [projectDetailsData]);

  useEffect(() => {
    setActiveStep(0);
  }, []);

  return (
    <PageContainer>
      <Title
        pageTitle='تعديل المشروع'
        subtitle='أكمل الخطوات التالية لتعديل المشروع'
      />
      {editError && <ErrorMessage>{editError.message}</ErrorMessage>}
      {activeStep === steps.length - 1 && isDataNotChanged && !isEditting && (
        <ErrorMessage warning={true}>
          لم تقم بتغيير البيانات بعد. الرجاء تعديل حقل واحد على الأقل قبل حفظ
          التعديل.
        </ErrorMessage>
      )}
      <StepperForm
        icons={icons}
        steps={steps}
        isDisabled={hasErrors || isDisabled || isEditting}
        isSubmit={activeStep === steps.length - 1}
        onForwardAction={
          activeStep === steps.length - 1 ? handleSubmit : handleNext
        }
        actionBtnTitle={
          isEditting ? (
            <div className='btn-loader'></div>
          ) : activeStep === steps.length - 1 ? (
            'حفظ'
          ) : (
            'التالي'
          )
        }
        onSubmit={handleSubmit}
      >
        {isFetchingCampaignDetails ? (
          <Loader />
        ) : activeStep === 0 ? (
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
    </PageContainer>
  );
};

export default EditProject;
