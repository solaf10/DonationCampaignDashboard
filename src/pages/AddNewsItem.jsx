import PageContainer from '../components/PageContainer';
import Title from '../components/Title';
import { useEffect, useState } from 'react';
import { useActiveStep } from '../contexts/ActiveStepContext';
import StepperForm from '../components/Stepper/StepperForm';
import Schedule from '../components/Stepper/Campaigns/Schedule';
import {
  ArticleOutlined,
  EventOutlined,
  InfoOutline,
  PaymentsOutlined,
  PhotoLibraryOutlined,
} from '@mui/icons-material';
import AddBySelectionModal from '../components/AddBySelectionModal';
import SuccessMessageDialog from '../components/SuccessMessageDialog';
import { useDispatch } from 'react-redux';
import {
  controlControlLocationModal,
  controlControlMediaModal,
  controlSuccessDialog,
} from '../redux/slices/ModalContollerSlice';
import FundingMedia from '../components/Stepper/Campaigns/FundingMedia';
import {
  isArabicOnly,
  isWithinLength,
} from '../utils/validation/common.validation';
import '../components/CampaignsForm.css';
import ErrorMessage from '../components/Messages/ErrorMessage';
import ControlMediaModal from '../components/ControlMediaModal';
import Basic from '../components/Stepper/News/Basic';
import Content from '../components/Stepper/News/Content';
import CoverImage from '../components/Stepper/News/CoverImage';
import useAddNewsItem from '../customHooks/mutations/useAddNewsItem';
import { useNavigate, useParams } from 'react-router-dom';
import { useSingleNews } from '../customHooks/queries/useNews';
import Loader from '../components/Skeletons/Loader';
import config from '../constants/enviroment';
import useEditNewsItem from '../customHooks/mutations/useEditNewsItem';
import { toast } from 'react-toastify';

const steps = ['معلومات الخبر', 'محتوى الخبر', 'صورة الغلاف'];

const icons = {
  1: <InfoOutline fontSize='small' />,
  2: <ArticleOutlined fontSize='small' />,
  3: <PhotoLibraryOutlined fontSize='small' />,
};

const styles = {
  marginBottom: '24px',
};

const initialNews = {
  title: '',
  category: '',
  on_the_other_hand: '',
  excerpt: '',
  content: '',
  cover_image: null,
  // to show
  selectedImageLink: '',
  linkTitle: '',
  linkHref: '',
  hasLink: false,
};

const AddNewsItem = ({ isEdit = false }) => {
  const { activeStep, setActiveStep } = useActiveStep();
  const [newsId, setNewsId] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    on_the_other_hand: '',
    excerpt: '',
    content: '',
    cover_image: null,
    // to show
    selectedImageLink: '',
    linkTitle: '',
    linkHref: '',
    hasLink: false,
  });
  const [errors, setErrors] = useState({
    title: null,
    category: null,
    target_amount: null,
    on_the_other_hand: null,
    excerpt: null,
    content: null,
    cover_image: null,
  });
  const [initialFormData, setInitialFormData] = useState(null);

  const hasErrors = Object.values(errors).some((err) => err !== null);

  const isDisabled =
    activeStep === 0
      ? formData.title.trim() === '' ||
        formData.category.trim() === '' ||
        formData.excerpt.trim() === ''
      : activeStep === 1
        ? !formData.content ||
          (formData?.hasLink && (!formData?.linkHref || !formData?.linkTitle))
        : activeStep === 2
          ? isEdit
            ? false
            : !formData.cover_image
          : false;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const {
    mutate: submitAddForm,
    isPending: isAdding,
    error: addError,
  } = useAddNewsItem();
  const {
    mutate: submitEditForm,
    isPending: isEditting,
    error: editError,
  } = useEditNewsItem();

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = new FormData();

    const content = `${formData?.content} ${formData?.hasLink ? `<a href=${formData?.linkHref} target='_blank'>${formData?.linkTitle}</a>` : ''}`;

    payload.append('title', formData.title);
    payload.append('content', content);
    payload.append('category', formData.category);

    payload.append('on_the_other_hand', formData.on_the_other_hand);

    payload.append('excerpt', formData.excerpt);

    if (formData?.cover_image)
      payload.append('cover_image', formData.cover_image);
    payload.append('images[]', formData.cover_image);

    if (isEdit) {
      const mutationOptions = {
        onSuccess: () => {
          setActiveStep(0);
          toast.success('تم تعديل الخبر بنجاح!');
          navigate(-1);
        },
      };
      submitEditForm(
        {
          id: params.id,
          body: payload,
        },
        mutationOptions,
      );
    } else {
      const mutationOptions = {
        onSuccess: (data) => {
          dispatch(controlSuccessDialog({ type: 'add', id: null }));
          setNewsId(data?.data?.uuid);
          setActiveStep(0);
        },
      };
      submitAddForm(payload, mutationOptions);
    }
  };
  const handleNext = (e) => {
    e.preventDefault();
    let isValid = true;
    if (activeStep === 0) {
      if (!formData.title) {
        setErrors((prev) => ({ ...prev, title: 'يرجى إدخال الاسم' }));
        isValid = false;
      }
      if (!isWithinLength(formData.title, 3, 100)) {
        setErrors((prev) => ({
          ...prev,
          title: 'يجب أن يتراوح عدد الأحرف بين 3 و100 حرف',
        }));
        isValid = false;
      }
      if (!isArabicOnly(formData.title)) {
        setErrors((prev) => ({
          ...prev,
          title: 'يسمح فقط بالأحرف العربية والمسافات',
        }));
        isValid = false;
      }
      if (!isWithinLength(formData.excerpt, 10, 200)) {
        setErrors((prev) => ({
          ...prev,
          excerpt: 'يجب أن يتراوح عدد الأحرف بين 10 و200 حرف',
        }));
        isValid = false;
      }
      if (!isArabicOnly(formData.excerpt)) {
        setErrors((prev) => ({
          ...prev,
          excerpt: 'يسمح فقط بالأحرف العربية والمسافات',
        }));
        isValid = false;
      }
    }

    if (!isValid) return;
    setActiveStep((prev) => prev + 1);
  };

  useEffect(() => {
    setActiveStep(0);
  }, []);

  const {
    data: newsItemData,
    isPending: isFetchingNewsDetails,
    error: newsDetailsError,
  } = useSingleNews(params.id, isEdit);

  const newsItem = newsItemData?.data || initialNews;

  const { title, category, on_the_other_hand, excerpt, content, cover_image } =
    newsItem;

  const hasLink = content.includes('href');
  const parser = new DOMParser();

  const doc = parser.parseFromString(content, 'text/html');

  const anchor = doc.querySelector('a');

  const linkHref = anchor?.href || '';
  const linkTitle = anchor?.textContent || '';
  // حذف عنصر الرابط من المحتوى
  anchor?.remove();

  const contentWithoutAnchor = doc.body.textContent?.trim() || '';

  const isDataNotChanged =
    isEdit &&
    initialFormData &&
    initialFormData.title === formData.title &&
    initialFormData.category === formData.category &&
    initialFormData.on_the_other_hand === formData.on_the_other_hand &&
    initialFormData.excerpt === formData.excerpt &&
    initialFormData.content === formData.content &&
    initialFormData.linkHref === formData.linkHref &&
    initialFormData.linkTitle === formData.linkTitle &&
    initialFormData.hasLink === formData.hasLink &&
    formData.cover_image === null;

  useEffect(() => {
    if (isEdit && newsItem) {
      const data = {
        title,
        category,
        on_the_other_hand,
        excerpt,
        content: hasLink ? contentWithoutAnchor : content,
        selectedImageLink: config.baseUrl + cover_image,
        hasLink,
        linkHref,
        linkTitle,
      };

      setFormData(data);
      setInitialFormData(data);
    }
  }, [isEdit, newsItem]);

  return (
    <PageContainer>
      <Title
        pageTitle={`${isEdit ? 'تعديل' : 'إضافة'} خبر جديد`}
        subtitle={`أكمل الخطوات التالية ل${isEdit ? 'تعديل' : 'إضافة'} خبر جديد`}
      />
      {activeStep === steps?.length - 1 &&
        isDataNotChanged &&
        !isEditting &&
        isEdit && (
          <ErrorMessage warning={true}>
            لم تتغير أي بيانات بعد. الرجاء تعديل حقل واحد على الأقل قبل حفظ
            التعديل.
          </ErrorMessage>
        )}
      {(addError || editError) && (
        <ErrorMessage>
          {isEdit ? editError?.message : addError.message}
        </ErrorMessage>
      )}
      <StepperForm
        icons={icons}
        steps={steps}
        isDisabled={
          hasErrors || isDisabled || isAdding || (isEdit && isEditting)
        }
        isSubmit={activeStep === steps?.length - 1}
        onForwardAction={
          activeStep === steps?.length - 1 ? handleSubmit : handleNext
        }
        actionBtnTitle={
          isAdding || (isEdit && isEditting) ? (
            <div className='btn-loader'></div>
          ) : activeStep === steps?.length - 1 ? (
            `${isEdit ? 'تعديل' : 'إضافة'} الخبر`
          ) : (
            'التالي'
          )
        }
        onSubmit={handleSubmit}
      >
        {isEdit && isFetchingNewsDetails ? (
          <Loader />
        ) : activeStep === 0 ? (
          <Basic
            formData={formData}
            setFormData={setFormData}
            styles={styles}
            errors={errors}
          />
        ) : activeStep === 1 ? (
          <Content
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
            styles={styles}
          />
        ) : (
          <CoverImage
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
            styles={styles}
          />
        )}
      </StepperForm>
      {/* Projects Modal */}
      {!isEdit && (
        <SuccessMessageDialog
          title='تم إنشاء الخبر بنجاح!'
          desc='تم إنشاء الخبر بنجاح. يمكنك الآن إضافة صور إضافية أو القيام بذلك لاحقًا.'
          btnTitle='إضافة صور الآن'
          onConfirm={() =>
            dispatch(controlControlMediaModal({ type: 'image', id: newsId }))
          }
          dialogType='add'
        />
      )}
      {!isEdit && (
        <ControlMediaModal
          onSuccess={() => {
            dispatch(controlSuccessDialog({ type: 'add', id: null }));
            navigate(-1);
          }}
        />
      )}
    </PageContainer>
  );
};

export default AddNewsItem;
