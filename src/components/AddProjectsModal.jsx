import { useState } from 'react';
import CustomModal from './CustomModal';
import CustomInput from './locations/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { controlAddProjectModal } from '../redux/slices/ModalContollerSlice';
import './AddProjectsModal.css';
import { FolderOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';

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

const AddProjectsModal = () => {
  const [searchedKey, setSearchedKey] = useState('');
  const [selectedProjects, setSelectedProjects] = useState([]);

  const isOpen = useSelector(
    (state) => state.modalController.isAddProjectModalOpen
  );

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchedKey.toLowerCase())
  );

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(controlAddProjectModal());
  };
  const handleSelectProject = (project) => {
    setSelectedProjects((prev) => {
      const exists = prev.find((p) => p.id === project.id);

      if (exists) {
        return prev.filter((p) => p.id !== project.id);
      } else {
        return [...prev, project];
      }
    });
  };

  const cards =
    projects.length === 0 ? (
      <div className='empty-projects'>
        <p className='empty-text'>لا توجد مشاريع حالياً</p>

        <Link to='/content/projects/add' className='empty-projects-action'>
          إضافة مشروع
        </Link>
      </div>
    ) : filteredProjects.length > 0 ? (
      filteredProjects.map((project) => (
        <div
          key={project.id}
          className={`project-card ${
            selectedProjects.find((p) => p.id === project.id) ? 'selected' : ''
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

  return (
    <CustomModal
      isOpen={isOpen}
      setIsOpen={handleClose}
      modalTitle='إضافة مشاريع مرتبطة'
      submitBtnTitle='إضافة'
      styles={{ width: '600px' }}
    >
      <CustomInput
        inputType='input'
        label='ابحث عن مشاريع'
        placeholder='اكتب اسم المشروع...'
        value={searchedKey}
        setValue={setSearchedKey}
      />
      <div className='project-section'>
        <h3 className='project-title'>اختر المشاريع</h3>

        <div className='cards-holder'>{cards}</div>
      </div>
    </CustomModal>
  );
};

export default AddProjectsModal;
