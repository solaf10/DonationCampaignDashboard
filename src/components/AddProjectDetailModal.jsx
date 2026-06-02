import { useDispatch, useSelector } from 'react-redux';
import CustomModal from './CustomModal';
import { useState } from 'react';
import { controlAddProjectDetailModalOpen } from '../redux/slices/ModalContollerSlice';
import CustomInput from './locations/CustomInput';
import useAddProjectDetail from '../customHooks/mutations/useAddProjectDetail';
import { containsOnlyArabicLetters } from '../utils/validation/common.validation';

const AddProjectDetailModal = ({ projectID }) => {
  const isOpen = useSelector(
    (state) => state.modalController.isAddProjectDetailModalOpen,
  );
  const [detail, setDetail] = useState('');
  const [cost, setCost] = useState('');
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const {
    mutate: addDetail,
    isPending: isAdding,
    error: addError,
  } = useAddProjectDetail(projectID);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!containsOnlyArabicLetters(detail)) {
      setError(
        'التفصيل يجب أن يكون باللغة العربية فقط، ويمكن استخدام الأرقام والرموز',
      );
      return;
    }
    addDetail({ detail, cost });
  };
  return (
    <CustomModal
      isOpen={isOpen}
      closeHandler={() => dispatch(controlAddProjectDetailModalOpen())}
      modalTitle='إضافة تفصيل'
      submitBtnTitle='إضافة'
      styles={{ width: '400px' }}
      onSubmit={handleSubmit}
      isLoading={isAdding}
      isDisabled={!detail || !cost}
    >
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
      <CustomInput
        label='التفصيل'
        inputType='input'
        placeholder='أدخل التفصيل باللغة العربية ويمكن استخدام الرموز والأرقام'
        styles={{
          height: 'auto',
          '& .MuiInputLabel-root.Mui-focused': {
            color: 'var(--main-color)', // لون اللابل عند focus
          },
        }}
        value={detail}
        setValue={(e) => {
          setDetail(e.target.value);
          setError(null);
        }}
        isNestedState={true}
        errorMsg={error}
      />

      <CustomInput
        label='الكلفة'
        inputType='input'
        placeholder='أدخل الكلفة'
        styles={{
          height: 'auto',
          '& .MuiInputLabel-root.Mui-focused': {
            color: 'var(--main-color)', // لون اللابل عند focus
          },
        }}
        value={cost}
        setValue={(e) => {
          if (!isNaN(e.target.value)) setCost(e.target.value);
        }}
        isNestedState={true}
      />
    </CustomModal>
  );
};

export default AddProjectDetailModal;
