import { useState } from 'react';
import CustomModal from './CustomModal';
import CustomInput from './locations/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import './AddBySelectionModal.css';
import { Link } from 'react-router-dom';
import { controlAddBySelectionModal } from '../redux/slices/ModalContollerSlice';

const AddBySelectionModal = ({ entriesType, entries, modalTitle }) => {
  const [searchedKey, setSearchedKey] = useState('');
  const [selectedProjects, setSelectedProjects] = useState([]);

  const isOpen = useSelector(
    (state) => state.modalController.isAddBySelectionModalOpen
  );

  const filteredProjects = entries.filter((project) =>
    project.name.toLowerCase().includes(searchedKey.toLowerCase())
  );

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(controlAddBySelectionModal());
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
      modalTitle={modalTitle}
      submitBtnTitle='إضافة'
      styles={{ width: '600px' }}
    >
      <CustomInput
        inputType='input'
        label={`ابحث عن ${entriesType === 'projects' ? 'مشاريع' : 'حملات'}`}
        placeholder={`اكتب اسم ${
          entriesType === 'projects' ? 'المشروع' : 'الحملة'
        }...`}
        value={searchedKey}
        setValue={setSearchedKey}
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
