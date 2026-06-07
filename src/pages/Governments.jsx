import CustomInput from '../components/locations/CustomInput';
import PageContainer from '../components/PageContainer';
import Title from '../components/Title';
import { AddRounded } from '@mui/icons-material';
import { useState } from 'react';
import useGovernments, {
  useSearchGovernments,
} from '../customHooks/queries/useGovernments';
import { useDispatch } from 'react-redux';
import { controlControlLocationModal } from '../redux/slices/ModalContollerSlice';
import CustomModal from '../components/CustomModal';
import GovernmentModalForm from '../components/locations/GovernmentModalForm';
import PageTable from '../components/PageTable';

const columns = [
  { id: 'governorate_name', label: 'الاسم' },
  { id: 'edit', label: 'الإجراءات' },
];

const Governments = () => {
  const [government, setGovernment] = useState('');
  // fetch governments
  const {
    data: governments,
    isFetching: isGovernmentFetching,
    error: governmentError,
  } = useGovernments();

  // enableSearch when there is a search value, otherwise use the all governments query
  const {
    data: searchedGovernments,
    isFetching: isSearchLoading,
    error: searchError,
  } = useSearchGovernments(government);

  const rows = government.trim()
    ? searchedGovernments?.data || []
    : governments?.data || [];

  const dispatch = useDispatch();

  return (
    <PageContainer>
      <Title pageTitle='إدارة الموقع(المكان)' subtitle='المحافظات'>
        <button
          onClick={() =>
            dispatch(controlControlLocationModal({ type: 'add', id: null }))
          }
          className='btn'
        >
          <span>إضافة محافظة</span>
          <AddRounded />
        </button>
      </Title>
      {/* Filter & Table */}
      <div className='table-content governments'>
        <div className='filters-holder'>
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
        </div>
        <PageTable
          rows={rows}
          columns={columns}
          isLoading={isGovernmentFetching || isSearchLoading}
        />
      </div>

      <GovernmentModalForm governments={rows} />
    </PageContainer>
  );
};

export default Governments;
