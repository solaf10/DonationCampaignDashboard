import { useDispatch, useSelector } from 'react-redux';
import CustomModal from './CustomModal';
import { controlControlMediaModal } from '../redux/slices/ModalContollerSlice';
import Media from './Stepper/Projects/Media';
import { useEffect, useState } from 'react';
import useUploadProjectMedia from '../customHooks/mutations/useUploadProjectMedia';
import { useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ErrorMessage from './Messages/ErrorMessage';
import useUploadNewsMedia from '../customHooks/mutations/useUploadNewsMedia';

const ControlMediaModal = () => {
  const [formData, setFormData] = useState({ images: [], videos: [] });
  const [errors, setErrors] = useState({ images: null, videos: null });
  const [error, setError] = useState(null);

  const isOpen = useSelector(
    (state) => state.modalController.isControlMediaModalOpen,
  );
  const mediaType = useSelector((state) => state.modalController.mediaType);

  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();

  const isImage = mediaType === 'image';
  const isProject = location.pathname.includes('project');

  const {
    mutate: uploadProjectMedia,
    isPending: isUploadingProjectMedia,
    error: uploadingProjectMediaError,
  } = useUploadProjectMedia(params.id);
  const {
    mutate: uploadNewsMedia,
    isPending: isUploadingNewsMedia,
    error: uploadingNewsMediaError,
  } = useUploadNewsMedia(params.id);

  const upload = isProject ? uploadProjectMedia : uploadNewsMedia;
  const isUploading = isProject
    ? isUploadingProjectMedia
    : isUploadingNewsMedia;
  const uploadingError = isProject ? uploadProjectMedia : uploadNewsMedia;

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();

    if (isImage)
      formData.images?.forEach((img) => {
        data.append('images[]', img);
      });
    else data.append('videos[]', formData.videos);

    upload(data, {
      onSuccess: () => {
        toast.success(`تم إضافة ${isImage ? 'الصور' : 'الفيديوهات'} بنجاح!`);
        dispatch(controlControlMediaModal({ type: mediaType, id: null }));
      },
      onError: (err) => {
        setError(err.message);
      },
    });
  };

  useEffect(() => {
    setFormData({ images: [], videos: [] });
    setError(null);
  }, [isOpen]);

  return (
    <CustomModal
      isOpen={isOpen}
      closeHandler={() =>
        dispatch(controlControlMediaModal({ type: mediaType, id: null }))
      }
      modalTitle={isImage ? 'إضافة صورة' : 'إضافة فيديو'}
      submitBtnTitle='إضافة'
      /* styles={{ width: '400px' }} */
      onSubmit={handleSubmit}
      isLoading={isUploading}
      isDisabled={
        isUploading ||
        (isImage && formData?.images?.length === 0) ||
        (!isImage && formData?.videos?.length === 0)
      }
    >
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Media
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        mediaType={mediaType}
      />
    </CustomModal>
  );
};

export default ControlMediaModal;
