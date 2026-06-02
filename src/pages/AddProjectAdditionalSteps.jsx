import PageContainer from '../components/PageContainer';
import Title from '../components/Title';

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

import { useState } from 'react';
import Basic from '../components/Stepper/Projects/Basic';
import Location from '../components/Stepper/Projects/Location';
import Funding from '../components/Stepper/Projects/Funding';
import Progress from '../components/Stepper/Projects/Progress';
import Media from '../components/Stepper/Projects/Media';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useActiveStep } from '../contexts/ActiveStepContext';
import useUploadProjectMedia from '../customHooks/mutations/useUploadProjectMedia';
import { toast } from 'react-toastify';
import LinkToCampaigns from '../components/Stepper/Projects/LinkToCampaigns';

const steps = ['الوسائط', 'ربط المشروع بالحملة'];

const icons = {
  1: <PhotoLibraryOutlined fontSize='small' />,
  2: <FactCheckOutlined fontSize='small' />,
};

const AddProjectAdditionalSteps = () => {
  const { activeStep, setActiveStep } = useActiveStep();

  const [formData, setFormData] = useState({
    images: [],
    videos: '',
  });

  /* ================= VALIDATION ================= */
  const params = useParams();
  const navigate = useNavigate();

  const {
    mutate: upload,
    isPending: isUploading,
    error: uploadingError,
  } = useUploadProjectMedia(params.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeStep === 0) {
      const data = new FormData();

      formData.images?.forEach((img) => {
        data.append('images[]', img);
      });

      data.append('videos[]', formData.videos);

      upload(data, {
        onSuccess: () => {
          toast.success('تم إضافة الوسائط بنجاح!');
          setActiveStep(1);
        },
      });
    }
  };

  return (
    <PageContainer>
      <Title
        pageTitle='إضافة مشروع جديد'
        subtitle='أكمل الخطوات التالية لإضافة مشروع جديد'
      />
      {uploadingError && (
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
          {uploadingError.message}
        </div>
      )}
      <StepperForm
        icons={icons}
        steps={steps}
        isDisabled={isUploading}
        isSubmit={true}
        onForwardAction={handleSubmit}
        actionBtnTitle={
          isUploading ? <div className='btn-loader'></div> : 'إضافة'
        }
        backBtnTitle='تخطي'
        isBackBtnDisabled={false}
        onBackwardAction={
          activeStep === 0
            ? () => setActiveStep(1)
            : () => navigate('/content/projects')
        }
        onSubmit={handleSubmit}
      >
        {activeStep === 0 ? (
          <Media formData={formData} setFormData={setFormData} />
        ) : (
          <LinkToCampaigns />
        )}
      </StepperForm>
    </PageContainer>
  );
};

export default AddProjectAdditionalSteps;
