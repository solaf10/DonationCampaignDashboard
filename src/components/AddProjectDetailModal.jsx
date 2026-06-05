import { useDispatch, useSelector } from 'react-redux';
import CustomModal from './CustomModal';
import { useEffect, useState } from 'react';
import { controlAddProjectDetailModalOpen } from '../redux/slices/ModalContollerSlice';
import CustomInput from './locations/CustomInput';
import useAddProjectDetail from '../customHooks/mutations/useAddProjectDetail';
import useEditProjectDetail from '../customHooks/mutations/useEditProjectDetail';
import { containsOnlyArabicLetters } from '../utils/validation/common.validation';
import { useGetProjectDetails } from '../customHooks/queries/useProjects';
import ErrorMessage from './Messages/ErrorMessage';
import Loader from './Skeletons/Loader';
import { toast } from 'react-toastify';

const AddProjectDetailModal = ({ projectID }) => {
  const isOpen = useSelector(
    (state) => state.modalController.isAddProjectDetailModalOpen,
  );

  const selectedProjectDetail = useSelector(
    (state) => state.modalController.selectedProjectDetailID,
  );

  const actionType = useSelector(
    (state) => state.modalController.controlProjectDetailModalType,
  );

  const isEdit = actionType !== 'add';

  const [detail, setDetail] = useState('');
  const [cost, setCost] = useState('');
  const [error, setError] = useState(null);
  const [isNotChanged, setIsNotChanged] = useState(false);

  const dispatch = useDispatch();

  const {
    data: allProjectDetails,
    isFetching: isFetchingDetails,
    error: detailsError,
  } = useGetProjectDetails(projectID, isEdit);

  const projectDetail = allProjectDetails?.data?.find(
    (detail) => detail?.uuid === selectedProjectDetail,
  );
  const defaultCost = parseInt(projectDetail?.detail_cost);

  const { mutate: addDetail, isPending: isAdding } =
    useAddProjectDetail(projectID);

  const { mutate: editDetail, isPending: isEditting } = useEditProjectDetail(
    selectedProjectDetail,
    projectID,
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsNotChanged(false);
    setError(null);
    if (projectDetail?.detail === detail && cost === defaultCost) {
      setIsNotChanged(true);
      return;
    }
    const data = { detail, cost };
    if (isEdit) {
      editDetail(data, {
        onSuccess: () => toast.success('تم تعديل التفصيل بنجاح!'),
        onError: (err) => {
          setError(err?.message);
        },
      });
      return;
    }
    addDetail(data, {
      onSuccess: () => toast.success('تم إضافة التفصيل بنجاح!'),
      onError: (err) => {
        setError(err?.message);
      },
    });
  };

  useEffect(() => {
    if (isEdit) {
      setDetail(projectDetail?.detail);
      setCost(defaultCost);
      setError(null);
    } else {
      setDetail('');
      setCost('');
    }
    setError(null);
    setIsNotChanged(false);
  }, [isOpen, projectDetail]);
  return (
    <CustomModal
      isOpen={isOpen}
      closeHandler={() =>
        dispatch(
          controlAddProjectDetailModalOpen({
            type: isEdit ? 'edit' : 'add',
            id: null,
          }),
        )
      }
      modalTitle={isEdit ? 'تعديل التفصيل' : 'إضافة تفصيل'}
      submitBtnTitle={isEdit ? 'تعديل' : 'إضافة'}
      styles={{ width: '400px' }}
      onSubmit={handleSubmit}
      isLoading={isAdding || isEditting}
      isDisabled={!detail || !cost}
    >
      {isFetchingDetails ? (
        <Loader styles={{ minHeight: '228px' }} />
      ) : (
        <>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {isNotChanged && (
            <ErrorMessage warning={true}>
              لم تقم بتغيير البيانات بعد. الرجاء تعديل حقل واحد على الأقل قبل
              حفظ التعديل.
            </ErrorMessage>
          )}
          <CustomInput
            label='التفصيل'
            inputType='input'
            placeholder='أدخل التفصيل'
            styles={{
              height: 'auto',
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'var(--main-color)', // لون اللابل عند focus
              },
            }}
            value={detail}
            setValue={(e) => {
              setDetail(e.target.value);

              if (isEdit) {
                setIsNotChanged(false);
              }
            }}
            isNestedState={true}
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
              if (!isNaN(e.target.value)) {
                setCost(e.target.value);

                if (isEdit) {
                  setIsNotChanged(false);
                }
              }
            }}
            isNestedState={true}
          />
        </>
      )}
    </CustomModal>
  );
};

export default AddProjectDetailModal;
