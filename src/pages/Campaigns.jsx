import { useState } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CustomInput from '../components/locations/CustomInput';
import PageContainer from '../components/PageContainer';
import Title from '../components/Title';
import {
  AddRounded,
  DeleteOutline,
  EditOutlined,
  FilterAltOutlined,
  RecyclingRounded,
  VisibilityOutlined,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import MoreMenu from '../components/MoreMenu';
import { useDispatch } from 'react-redux';
import {
  controlControlLocationModal,
  controlMoreInfoMenu,
} from '../redux/slices/ModalContollerSlice';
import { IconButton } from '@mui/material';
import useGetCampaignsLogic from '../customHooks/useGetCampaignsLogic';
import PageTable from '../components/PageTable';
import '../components/ContentWithTable.css';
import FilterCampaignsModal from '../components/FilterCampaignsModal';

const columns = [
  { id: 'name', label: 'اسم الحملة' },
  { id: 'projectsNum', label: 'عدد المشاريع' },
  { id: 'target_amount', label: 'المبلغ المستهدف' },
  { id: 'collected_amount', label: 'المبلغ المجموع' },
  { id: 'end_date', label: 'تاريخ النهاية' },
  { id: 'status', label: 'الحالة' },
  { id: 'actions', label: '' },
];

const Campaigns = ({ isTrash = false }) => {
  const [searchedKey, setSearchedKey] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    rows,
    isSearching,
    searchError,
    /* isFiltering,
    filterError, */
    isFetchingCampaigns,
    campaignsError,
  } = useGetCampaignsLogic(searchedKey);

  const actions = [
    {
      label: 'عرض التفاصيل',
      icon: <VisibilityOutlined fontSize='small' />,
      onClick: () => navigate('/content/campaigns/3'),
    },
    {
      label: isTrash ? 'استعادة' : 'تعديل',
      icon: isTrash ? (
        <RecyclingRounded fontSize='small' />
      ) : (
        <EditOutlined fontSize='small' />
      ),
      onClick: () =>
        isTrash
          ? console.log('recycle')
          : navigate('/content/campaigns/edit/3'),
    },
    {
      label: 'حذف',
      icon: <DeleteOutline fontSize='small' />,
      onClick: () => console.log('delete'),
      danger: true,
    },
  ];
  console.log(searchError);

  return (
    <PageContainer>
      <Title
        pageTitle={isTrash ? 'سلة مهملات الحملات' : 'إدارة الحملات'}
        subtitle={isTrash ? 'يمكنك استعادة أو حذف العناصر نهائياً' : null}
      >
        {!isTrash && (
          <Link to='/content/campaigns/add' className='btn'>
            <span>إضافة حملة</span>
            <AddRounded />
          </Link>
        )}
      </Title>
      {/* filter & table */}
      <div className='table-content campaigns'>
        {/* filter holder */}
        <div className='filters-holder'>
          <div className='input-holder'>
            <CustomInput
              inputType='textField'
              placeholder='ابحث حسب الاسم'
              styles={{
                width: '400px',
                height: 'auto',
                '& .MuiInputLabel-root.Mui-focused': {
                  color: 'var(--main-color)', // لون اللابل عند focus
                },
              }}
              value={searchedKey}
              setValue={setSearchedKey}
            />

            <p style={{ fontSize: '14px' }}>عدد الحملات: {rows.length}</p>
          </div>
          {/* filter Model btn */}
          <IconButton
            className='filter-btn'
            onClick={() =>
              dispatch(controlControlLocationModal({ type: 'add', id: 'null' }))
            }
          >
            <FilterAltOutlined className='icon' />
          </IconButton>
        </div>
      </div>

      <PageTable rows={rows} columns={columns} pageLink='/content/campaigns' />

      {/* MoreInfoMenu */}
      <MoreMenu
        handleCloseMenu={() => dispatch(controlMoreInfoMenu())}
        actions={actions}
      />
      <FilterCampaignsModal />
    </PageContainer>
  );
};

export default Campaigns;
