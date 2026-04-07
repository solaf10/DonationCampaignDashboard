import {
  CalendarMonthOutlined,
  FactCheckOutlined,
  FolderOutlined,
  RequestQuoteOutlined,
} from '@mui/icons-material';
import PageContainer from '../components/PageContainer';
import StepperForm from '../components/Stepper/StepperForm';
import Title from '../components/Title';

const AddCampaign = () => {
  const icons = {
    1: <FolderOutlined fontSize='small' />,
    2: <CalendarMonthOutlined fontSize='small' />,
    3: <RequestQuoteOutlined fontSize='small' />,
    4: <FactCheckOutlined fontSize='small' />,
  };
  return (
    <PageContainer>
      <Title
        pageTitle='إضافة حملة جديدة'
        subtitle='أكمل الخطوات التالية لإضافة حملة جديدة'
      >
        {null}
      </Title>
      <StepperForm icons={icons} />
    </PageContainer>
  );
};

export default AddCampaign;
