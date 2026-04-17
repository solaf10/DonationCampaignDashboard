import PageContainer from "../components/PageContainer";
import Title from "../components/Title";
import ProjectForm from "../components/Projects/ProjectForm";

const AddProject = () => {
  return (
    <PageContainer>
      <Title
        pageTitle="إضافة مشروع جديد"
        subtitle="أكمل الخطوات التالية لإضافة مشروع جديد"
      />
      <ProjectForm />
    </PageContainer>
  );
};

export default AddProject;
