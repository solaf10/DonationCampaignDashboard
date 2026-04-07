import ContentWithTable from '../components/ContentWithTable';
import { useState } from 'react';
import ControlLocationModal from './ControlLocationModal';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CustomInput from '../components/locations/CustomInput';
import PageContainer from '../components/PageContainer';
import Title from '../components/Title';
import { AddRounded } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const columns = [
  { id: 'name', label: 'اسم الحملة' },
  { id: 'projects', label: 'عدد المشاريع' },
  { id: 'location', label: 'الموقع الجغرافي' },
  { id: 'target', label: 'المبلغ المستهدف' },
  { id: 'collected', label: 'المبلغ المجموع' },
  { id: 'actions', label: '' },
];

const Campaigns = () => {
  const [isOpen, setIsOpen] = useState(false);
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
      <Title pageTitle='إدارة الحملات'>
        <Link to='/content/campaigns/add' className='btn'>
          <span>إضافة حملة</span>
          <AddRounded />
        </Link>
      </Title>
      <ContentWithTable
        columns={columns}
        rows={rows}
        className='campaigns'
        pageLink='/content/campaigns'
      >
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
          >
            nothing
          </CustomInput>

          <p style={{ fontSize: '14px' }}>عدد الحملات: {rows.length}</p>
        </div>

        <button className='filter-btn'>
          <FilterAltIcon className='icon' />
        </button>
      </ContentWithTable>
      <ControlLocationModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title='تعديل المنطقة'
        locationType='areas'
        isEdit={true}
      />
    </PageContainer>
  );
};

export default Campaigns;
