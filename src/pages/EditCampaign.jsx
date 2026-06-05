import PageContainer from '../components/PageContainer';
import Title from '../components/Title';
import CampaignsForm from '../components/CampaignsForm';
import { useEffect, useState } from 'react';
import { useActiveStep } from '../contexts/ActiveStepContext';
import StepperForm from '../components/Stepper/StepperForm';
import Basic from '../components/Stepper/Campaigns/Basic';
import Schedule from '../components/Stepper/Campaigns/Schedule';
import {
  EventOutlined,
  FactCheckOutlined,
  InfoOutline,
  PaymentsOutlined,
} from '@mui/icons-material';
import AddBySelectionModal from '../components/AddBySelectionModal';
import SuccessMessageDialog from '../components/SuccessMessageDialog';

import FundingMedia from '../components/Stepper/Campaigns/FundingMedia';
import {
  containsOnlyArabicLetters,
  isArabicOnly,
  isWithinLength,
} from '../utils/validation/common.validation';
import { useNavigate, useParams } from 'react-router-dom';
import { useSingleCampaign } from '../customHooks/queries/useCampaigns';
import dayjs from 'dayjs';
import useEditCampaign from '../customHooks/mutations/useEditCampaign';
import SelectableCardsList from '../components/Stepper/SelectableCardsList';
import { Box } from '@mui/material';
import { useGetUnAttachedProjects } from '../customHooks/queries/useProjects';
import { toast } from 'react-toastify';

const steps = [
  'معلومات الحملة',
  'جدولة للحملة',
  'التمويل والوسائط',
  'ربط المشاريع بالحملة',
];

const icons = {
  1: <InfoOutline fontSize='small' />,
  2: <EventOutlined fontSize='small' />,
  3: <PaymentsOutlined fontSize='small' />,
  4: <FactCheckOutlined fontSize='small' />,
};

const styles = {
  marginBottom: '24px',
};
const EditCampaign = () => {
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
    projects: [],
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
    projects: null,
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
          ? !formData.target_amount
          : false;

  const {
    mutate: submitForm,
    isPending: isEditting,
    error: editError,
  } = useEditCampaign();

  const navigate = useNavigate();
  const params = useParams();
  const { data: campaignDetailsData, isFetching: isFetchingCampaignDetails } =
    useSingleCampaign(params?.id);

  const campaignDetails = campaignDetailsData?.data || {
    name: '',
    purposes: '',
    target_amount: '',
    start_time: null,
    end_time: null,
    start_date: null,
    end_date: null,
    image: null,
    projects: [],
  };
  const {
    name,
    purposes,
    target_amount,
    start_date,
    end_date,
    start_time,
    end_time,
    image,
    projects,
  } = campaignDetails;

  const isDataNotChanged =
    formData.image === null &&
    formData.projects.length === 0 &&
    formData.name === name &&
    formData.purposes === purposes &&
    formData.target_amount === parseInt(target_amount) &&
    formData.start_date?.format('YYYY-MM-DD') ===
      dayjs(start_date).format('YYYY-MM-DD') &&
    formData.end_date?.format('YYYY-MM-DD') ===
      dayjs(end_date).format('YYYY-MM-DD') &&
    formData.start_time?.format('HH:mm') ===
      dayjs(start_time, 'HH:mm').format('HH:mm') &&
    formData.end_time?.format('HH:mm') ===
      dayjs(end_time, 'HH:mm').format('HH:mm');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isDataNotChanged) {
      return;
    }

    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('purposes', formData.purposes);
    payload.append('target_amount', formData.target_amount);

    payload.append('start_date', formData.start_date?.format('YYYY-MM-DD'));

    payload.append('end_date', formData.end_date?.format('YYYY-MM-DD'));

    payload.append('start_time', formData.start_time?.format('HH:mm'));

    payload.append('end_time', formData.end_time?.format('HH:mm'));
    if (formData.image) {
      payload.append('image', formData.image);
    }
    const mutationOptions = {
      onSuccess: () => {
        setActiveStep(0);
        toast.success('تم تعديل الحملة بنجاح!');
        navigate(-1);
      },
    };
    formData.projects.forEach((project) => {
      payload.append('project_uuid[]', project.uuid);
    });
    submitForm(
      {
        id: params.id,
        body: payload,
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

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      name,
      purposes,
      target_amount: parseInt(target_amount) || '',
      start_date: dayjs(start_date),
      end_date: dayjs(end_date),
      start_time: dayjs(start_time, 'HH:mm'),
      end_time: dayjs(end_time, 'HH:mm'),
      fetchedImage: image,
      projects: projects || [], // 👈 مهم
    }));
  }, [campaignDetailsData]);

  const {
    data: unAttachedprojectsData,
    isFetching: isFetchingUnAttacedProjects,
    error: fetchingProjectsError,
  } = useGetUnAttachedProjects();

  const unAttachedProjects = unAttachedprojectsData?.data || [];

  return (
    <PageContainer>
      <Title
        pageTitle='تعديل الحملة'
        subtitle='أكمل الخطوات التالية لتعديل الحملة'
      />
      {editError && (
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
          {editError.message}
        </div>
      )}
      {activeStep === 3 && isDataNotChanged && !isEditting && (
        <Box
          sx={{
            mb: 2,
            p: 2,
            borderRadius: '12px',
            backgroundColor: '#fff4e5',
            color: '#7f4e1e',
            border: '1px solid #f7d9b0',
            fontFamily: 'Cairo',
            fontSize: '14px',
            lineHeight: 1.6,
          }}
        >
          لم تتغير أي بيانات بعد. الرجاء تعديل حقل واحد على الأقل قبل حفظ
          التعديل.
        </Box>
      )}
      <StepperForm
        icons={icons}
        steps={steps}
        isDisabled={
          hasErrors ||
          isDisabled ||
          isEditting ||
          (activeStep === 3 && isDataNotChanged)
        }
        isSubmit={activeStep === 3}
        onForwardAction={activeStep === 3 ? handleSubmit : handleNext}
        actionBtnTitle={
          isEditting ? (
            <div className='btn-loader'></div>
          ) : activeStep === 3 ? (
            'حفظ'
          ) : (
            'التالي'
          )
        }
        onSubmit={handleSubmit}
      >
        {isFetchingCampaignDetails ||
        (activeStep === 3 && isFetchingUnAttacedProjects) ? (
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              className='btn-loader'
              style={{
                width: '40px',
                height: '40px',
                borderWidth: '4px',
                borderColor: 'var(--secondary-color)',
                borderTopColor: 'white',
              }}
            ></div>
          </Box>
        ) : activeStep === 0 ? (
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
            originalStartDate={start_date}
          />
        ) : activeStep === 2 ? (
          <FundingMedia
            formData={formData}
            setFormData={setFormData}
            styles={styles}
            errors={errors}
          />
        ) : (
          <SelectableCardsList
            items={[...unAttachedProjects, ...projects]}
            type='projects'
            title='المشاريع'
            addLink='/content/projects/add'
            searchPlaceholder='اكتب اسم المشروع...'
            setFormData={setFormData}
            initialSelected={projects}
          />
        )}
      </StepperForm>
    </PageContainer>
  );
};

export default EditCampaign;
