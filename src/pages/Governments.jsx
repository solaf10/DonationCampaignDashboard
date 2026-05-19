import ContentWithTable from '../components/ContentWithTable';
import CustomInput from '../components/locations/CustomInput';
import PageContainer from '../components/PageContainer';
import Title from '../components/Title';
import { AddRounded } from '@mui/icons-material';
import { useState } from 'react';
import useGovernments, {
  useSearchGovernments,
} from '../customHooks/queries/useGovernments';
import useDebounce from '../customHooks/useDebounce';

const columns = [
  { id: 'governorate_name', label: 'الاسم' },
  { id: 'action', label: 'الإجراءات' },
];

const Governments = () => {
  const [government, setGovernment] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const {
    data: governments,
    isPending: isGovernmentFetching,
    error,
  } = useGovernments();

  const {
    data: searchedGovernments,
    isPending: isSearchLoading,
    error: searchError,
  } = useSearchGovernments({ governorate_name: government });

  const rows = government.trim()
    ? searchedGovernments?.data || []
    : governments?.data || [];

  return (
    <PageContainer>
      <Title pageTitle='إدارة الموقع(المكان)' subtitle='المحافظات'>
        <button onClick={() => setIsAddModalOpen(true)} className='btn'>
          <span>إضافة محافظة</span>
          <AddRounded />
        </button>
      </Title>
      {/* Filter & Table */}
      <ContentWithTable
        isOpen={isAddModalOpen}
        setIsOpen={setIsAddModalOpen}
        columns={columns}
        rows={rows}
        className='governments'
      >
        <CustomInput
          inputType='textField'
          placeholder='ابحث في المحافظات'
          styles={{
            width: '400px',
            height: 'auto',
            '& .MuiInputLabel-root.Mui-focused': {
              color: 'var(--main-color)', // لون اللابل عند focus
            },
          }}
          value={government}
          setValue={setGovernment}
        />

        <p>عدد المحافظات: {rows?.length}</p>
      </ContentWithTable>
    </PageContainer>
  );
};

export default Governments;
