import { useState } from 'react';
import CustomModal from './CustomModal';
import CustomInput from './locations/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import './AddBySelectionModal.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  controlAddBySelectionModal,
  controlSuccessDialog,
} from '../redux/slices/ModalContollerSlice';
import { useGetUnAttachedProjects } from '../customHooks/queries/useProjects';
import useCampaigns from '../customHooks/queries/useCampaigns';
import useAddProjectToCampaign from '../customHooks/mutations/useAddProjects';
import { toast } from 'react-toastify';
import { Box, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

const AddBySelectionModal = ({ entriesType, modalTitle }) => {
  const [searchedKey, setSearchedKey] = useState('');
  const [selectedProjects, setSelectedProjects] = useState([]);

  const selectedAddSrcId = useSelector(
    (state) => state.modalController.selectedAddSrcID,
  );

  const {
    data: projectsData,
    isPending: isFetchingProjects,
    error: projectsError,
  } = useGetUnAttachedProjects();

  const projects = searchedKey
    ? projectsData?.data.filter((p) =>
        p.name.toLowerCase().includes(searchedKey.toLowerCase()),
      ) || []
    : projectsData?.data || [];

  const {
    data: campaignsData,
    isPending: isGettingCampaigns,
    error: campaignsError,
  } = useCampaigns();
  /* const {
    data: filteredCampaignsData,
    isPending: isFilteringCampaigns,
    error: filterCampaignsError,
  } = useSearchCampaigns(searchedKey); */

  /*  const campaigns = searchedKey
    ? (filteredCampaignsData?.data ?? [])
    : (campaignsData?.data ?? []); */
  const campaigns = campaignsData?.data || [];

  const entries = entriesType === 'projects' ? projects : campaigns;

  const isOpen = useSelector(
    (state) => state.modalController.isAddBySelectionModalOpen,
  );

  const dispatch = useDispatch();

  const handleSelectProject = (project) => {
    setSelectedProjects((prev) => {
      const exists = prev.find((p) => p.uuid === project.uuid);

      if (exists) {
        return prev.filter((p) => p.uuid !== project.uuid);
      } else {
        return [...prev, project];
      }
    });
  };

  const emptyState =
    !searchedKey || entries.length === 0 ? (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 3,
          textAlign: 'center',
          color: '#8c9ea0',
        }}
      >
        {/* icon placeholder */}
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            bgcolor: '#eef3f3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
            fontSize: 22,
          }}
        >
          📦
        </Box>

        <Typography fontWeight={600} mb={1}>
          لا توجد {entriesType === 'projects' ? 'مشاريع' : 'حملات'} حالياً
        </Typography>

        <Link
          to={
            entriesType === 'projects'
              ? '/content/projects/add'
              : '/content/campaigns/add'
          }
          className='empty-projects-action'
          style={{
            color: 'var(--secondary-color)',
            fontSize: '13px',
            opacity: '0.8',
            textDecoration: 'underline',
          }}
        >
          إضافة {entriesType === 'projects' ? 'مشروع' : 'حملة'}
        </Link>
      </Box>
    ) : (
      <div className='empty-text'>لا توجد نتائج بهذا الاسم</div>
    );

  const cards =
    entries.length === 0
      ? emptyState
      : entries.map((entry) => (
          <div
            key={entry.uuid}
            className={`project-card ${
              selectedProjects.find((p) => p.uuid === entry.uuid)
                ? 'selected'
                : ''
            }`}
            onClick={() => handleSelectProject(entry)}
          >
            <h4 className='name'>{entry.name}</h4>
            <p className='location'>{entry.location}</p>
          </div>
        ));
  const {
    mutate: addProjectToCampaign,
    isPending: isAdding,
    error: addProjectError,
  } = useAddProjectToCampaign(selectedAddSrcId);
  const location = useLocation();
  const navigate = useNavigate();
  const isAddPage = location.pathname.includes('/campaigns/add');
  const queryClient = useQueryClient();
  const handleSubmit = (e) => {
    e.preventDefault();
    const body = new FormData();
    if (entries.length === 0) return;
    selectedProjects.forEach((p) => {
      body.append('project_uuid[]', p.uuid);
    });
    addProjectToCampaign(body, {
      onSuccess: () => {
        dispatch(controlAddBySelectionModal(null));

        if (isAddPage) {
          navigate('/content/campaigns');
          dispatch(controlSuccessDialog({ type: 'add', id: null }));
          queryClient.invalidateQueries({
            queryKey: ['campaigns'],
          });
        } else {
          queryClient.invalidateQueries({
            queryKey: ['campaigns', selectedAddSrcId],
          });
        }

        toast.success('تمت إضافة المشاريع بنجاح!');
      },
    });
  };
  if (isFetchingProjects || isGettingCampaigns)
    return (
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
    );

  return (
    <CustomModal
      isOpen={isOpen}
      closeHandler={() => {
        dispatch(controlAddBySelectionModal());
      }}
      modalTitle={modalTitle}
      submitBtnTitle='إضافة'
      styles={{ width: '600px' }}
      onSubmit={handleSubmit}
      isLoading={isAdding}
      isDisabled={
        isAdding || entries.length === 0 || selectedProjects?.length === 0
      }
    >
      {addProjectError && (
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
          {addProjectError.message}
        </div>
      )}
      <CustomInput
        inputType='input'
        label={`ابحث عن ${entriesType === 'projects' ? 'مشاريع' : 'حملات'}`}
        placeholder={`اكتب اسم ${
          entriesType === 'projects' ? 'المشروع' : 'الحملة'
        }...`}
        value={searchedKey}
        setValue={setSearchedKey}
        isRequired={false}
      />
      <div className='project-section'>
        <h3 className='project-title'>
          اختر {entriesType === 'projects' ? 'المشاريع' : 'الحملات'}
        </h3>

        <div className='cards-holder'>{cards}</div>
      </div>
    </CustomModal>
  );
};

export default AddBySelectionModal;
