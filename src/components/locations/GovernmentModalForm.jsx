import { useEffect, useState } from 'react';
import CustomInput from '../locations/CustomInput';
import useAddGovernment from '../../customHooks/mutations/useAddGovernment';
import useEditGovernment from '../../customHooks/mutations/useEditGovernment';
import CustomModal from '../CustomModal';
import { useDispatch, useSelector } from 'react-redux';
import { controlControlLocationModal } from '../../redux/slices/ModalContollerSlice';
import { toast } from 'react-toastify';

const GovernmentModalForm = ({ governments }) => {
  const [government, setGovernment] = useState('');
  const [error, setError] = useState(null);

  const isModalOpen = useSelector(
    (state) => state.modalController.isControlLocationModalOpen,
  );

  const operationType = useSelector(
    (state) => state.modalController.controlLocationModalType,
  );

  const governmentId = useSelector(
    (state) => state.modalController.selectedLocationID,
  );

  const existingGovernmentName = governments.find(
    (government) => government.uuid === governmentId,
  )?.governorate_name;

  const dispatch = useDispatch();

  const isEdit = operationType === 'edit';

  const { mutate: addGovernment, isPending: isAdding } = useAddGovernment();

  const { mutate: editGovernment, isPending: isEditing } = useEditGovernment();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!government.trim()) {
      setError('الرجاء إدخال اسم المحافظة');
      return;
    }

    // تعديل
    if (isEdit) {
      if (government === existingGovernmentName) {
        setError('الرجاء إدخال اسم مختلف عن الاسم الحالي');
        return;
      }

      editGovernment(
        {
          id: governmentId,
          government,
        },
        {
          onSuccess: () => {
            setGovernment('');
            setError(null);
            toast.success('تم تعديل المحافظة بنجاح');
          },
          onError: (err) => setError(err.message),
        },
      );

      return;
    }

    // إضافة
    addGovernment(government, {
      onSuccess: () => {
        setGovernment('');
        setError(null);
        toast.success('تمت إضافة المحافظة بنجاح');
      },
      onError: (err) => setError(err.message),
    });
  };

  useEffect(() => {
    if (!isModalOpen) {
      setGovernment('');
      setError(null);
    } else {
      setGovernment(isEdit ? existingGovernmentName : '');
    }
  }, [isModalOpen, isEdit, existingGovernmentName]);

  return (
    <CustomModal
      isOpen={isModalOpen}
      closeHandler={() =>
        dispatch(
          controlControlLocationModal({
            type: isEdit ? 'edit' : 'add',
            id: null,
          }),
        )
      }
      modalTitle={isEdit ? 'تعديل المحافظة' : 'إضافة محافظة'}
      submitBtnTitle={isEdit ? 'تعديل' : 'إضافة'}
      onSubmit={handleSubmit}
      isLoading={isAdding || isEditing}
      isDisabled={!government.trim()}
    >
      <CustomInput
        inputType='input'
        label='المحافظة'
        value={government}
        setValue={(value) => {
          setGovernment(value);

          if (error) setError(null);
        }}
        errorMsg={error}
      />
    </CustomModal>
  );
};

export default GovernmentModalForm;
