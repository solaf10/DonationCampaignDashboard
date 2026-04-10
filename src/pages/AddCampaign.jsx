import PageContainer from '../components/PageContainer';
import Title from '../components/Title';
import CampaignsForm from '../components/CampaignsForm';

const AddCampaign = () => {
  return (
    <PageContainer>
      <Title
        pageTitle='إضافة حملة جديدة'
        subtitle='أكمل الخطوات التالية لإضافة حملة جديدة'
      />
      <CampaignsForm />
    </PageContainer>
  );
};

export default AddCampaign;
