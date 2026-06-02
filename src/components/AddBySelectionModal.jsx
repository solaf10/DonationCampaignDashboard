import { useEffect, useState } from 'react';
import CustomModal from './CustomModal';
import CustomInput from './locations/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import './AddBySelectionModal.css';
import { Link } from 'react-router-dom';
import { controlAddBySelectionModal } from '../redux/slices/ModalContollerSlice';
import useProjects, {
  useSearchProjects,
} from '../customHooks/queries/useProjects';
import useCampaigns, {
  useSearchCampaigns,
} from '../customHooks/queries/useCampaigns';
import useAddProjectToCampaign from '../customHooks/mutations/useAddProjects';
import { toast } from 'react-toastify';

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
  } = useProjects();
  const {
    data: filteredProjectsData,
    isPending: isFilteringProjects,
    error: filterProjectsError,
  } = useSearchProjects(searchedKey);

  const projects = searchedKey
    ? (filteredProjectsData?.data ?? [])
    : (projectsData?.data ?? []);

  const {
    data: campaignsData,
    isPending: isGettingCampaigns,
    error: campaignsError,
  } = useCampaigns();
  const {
    data: filteredCampaignsData,
    isPending: isFilteringCampaigns,
    error: filterCampaignsError,
  } = useSearchCampaigns(searchedKey);

  const campaigns = searchedKey
    ? (filteredCampaignsData?.data ?? [])
    : (campaignsData?.data ?? []);

  const entries = entriesType === 'projects' ? projects : campaigns;

  const isOpen = useSelector(
    (state) => state.modalController.isAddBySelectionModalOpen,
  );

  const filteredProjects = entries.filter((project) =>
    project.name.toLowerCase().includes(searchedKey.toLowerCase()),
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

  const cards =
    entries.length === 0 ? (
      <div className='empty-projects'>
        <p className='empty-text'>
          لا توجد {entriesType === 'projects' ? 'مشاريع' : 'حملات'} حالياً
        </p>

        <Link
          to={
            entriesType === 'projects'
              ? '/content/projects/add'
              : '/content/campaigns/add'
          }
          className='empty-projects-action'
        >
          إضافة {entriesType === 'projects' ? 'مشروع' : 'حملة'}
        </Link>
      </div>
    ) : filteredProjects.length > 0 ? (
      filteredProjects.map((project) => (
        <div
          key={project.uuid}
          className={`project-card ${
            selectedProjects.find((p) => p.uuid === project.uuid)
              ? 'selected'
              : ''
          }`}
          onClick={() => handleSelectProject(project)}
        >
          <h4 className='name'>{project.name}</h4>
          <p className='location'>{project.location}</p>
        </div>
      ))
    ) : (
      <div className='empty-text'>لا توجد نتائج بهذا الاسم</div>
    );

  const {
    mutate: addProjectToCampaign,
    isPending: isAdding,
    error: addProjectError,
  } = useAddProjectToCampaign(selectedAddSrcId);

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = new FormData();

    selectedProjects.forEach((p) => {
      body.append('project_uuid[]', p.uuid);
    });
    addProjectToCampaign(body, {
      onSuccess: () => {
        toast.success('تمت إضافة المشاريع بنجاح!');
      },
    });
  };

  return (
    <CustomModal
      isOpen={isOpen}
      closeHandler={() => dispatch(controlAddBySelectionModal())}
      modalTitle={modalTitle}
      submitBtnTitle='إضافة'
      styles={{ width: '600px' }}
      onSubmit={handleSubmit}
      isLoading={isAdding}
      isDisabled={isAdding}
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
