import ContentWithTable from '../components/ContentWithTable';
import { useState } from 'react';
import ControlLocationModal from './ControlLocationModal';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CustomInput from '../components/locations/CustomInput';
import PageContainer from '../components/PageContainer';
import Title from '../components/Title';
import {
  AddRounded,
  DeleteOutline,
  EditOutlined,
  RecyclingRounded,
  VisibilityOutlined,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import MoreMenu from '../components/MoreMenu';
import { useDispatch } from 'react-redux';
import { controlMoreInfoMenu } from '../redux/slices/ModalContollerSlice';

const columns = [
  { id: 'name', label: 'اسم الحملة' },
  { id: 'projects', label: 'عدد المشاريع' },
  { id: 'location', label: 'الموقع الجغرافي' },
  { id: 'target', label: 'المبلغ المستهدف' },
  { id: 'collected', label: 'المبلغ المجموع' },
  { id: 'actions', label: '' },
];

const Campaigns = ({ isTrash = false }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchedKey, setSearchedKey] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const rows = [
    {
      name: 'حملة رمضان',
      projects: 12,
      location: 'دمشق',
      target: '50,000$',
      collected: '32,000$',
    },
    {
      name: 'حملة الشتاء',
      projects: 8,
      location: 'حلب',
      target: '30,000$',
      collected: '25,000$',
    },
    {
      name: 'حملة التعليم',
      projects: 15,
      location: 'حمص',
      target: '70,000$',
      collected: '40,000$',
    },
    {
      name: 'حملة الصحة',
      projects: 10,
      location: 'اللاذقية',
      target: '45,000$',
      collected: '20,000$',
    },
    {
      name: 'حملة الغذاء',
      projects: 6,
      location: 'درعا',
      target: '20,000$',
      collected: '18,000$',
    },
  ];
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
      <ContentWithTable
        columns={columns}
        rows={rows}
        className='campaigns'
        pageLink='/content/campaigns'
      >
        {/* filter holder */}
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
          >
            nothing
          </CustomInput>

          <p style={{ fontSize: '14px' }}>عدد الحملات: {rows.length}</p>
        </div>
        {/* filter Model btn */}
        <button className='filter-btn' onClick={() => setIsFilterOpen(true)}>
          <FilterAltIcon className='icon' />
        </button>
      </ContentWithTable>
      {/* Edit Modal */}
      <ControlLocationModal
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        title='تعديل المنطقة'
        locationType='areas'
        isEdit={true}
      />

      {/* filterModal */}
      <ControlLocationModal
        isOpen={isFilterOpen}
        setIsOpen={setIsFilterOpen}
        title='تصفية متقدمة'
        locationType='projects'
      />

      {/* MoreInfoMenu */}
      <MoreMenu
        handleCloseMenu={() => dispatch(controlMoreInfoMenu())}
        actions={actions}
      />
    </PageContainer>
  );
};

export default Campaigns;
