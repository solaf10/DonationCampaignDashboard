import ContentWithTable from '../components/ContentWithTable';
import { useState } from 'react';
import ControlLocationModal from './ControlLocationModal';
import CustomInput from '../components/locations/CustomInput';
import { AddRounded } from '@mui/icons-material';
import Title from '../components/Title';
import PageContainer from '../components/PageContainer';

const columns = [
  { id: 'name', label: 'الاسم' },
  { id: 'type', label: 'النوع' },
  { id: 'status', label: 'الحالة' },
  { id: 'actions', label: '' },
];

const Areas = () => {
  const [area, setArea] = useState('');
  const [city, setCity] = useState('');
  const [government, setGovernment] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const rows = [
    {
      name: 'حملة رمضان',
      type: 'تبرعات',
      status: <button onClick={() => setIsOpen(true)}>edit</button>,
    },
    { name: 'حملة الشتاء', type: 'إغاثة', status: 'موقوفة' },
    { name: 'حملة التعليم', type: 'تعليم', status: 'نشطة' },
    { name: 'حملة الصحة', type: 'طبية', status: 'نشطة' },
    { name: 'حملة الغذاء', type: 'غذائية', status: 'مكتملة' },
    { name: 'حملة  جديدةرمضان', type: 'تبرعات', status: 'نشطة' },
    { name: 'حملة الشتاء', type: 'إغاثة', status: 'موقوفة' },
    { name: 'حملة التعليم', type: 'تعليم', status: 'نشطة' },
    { name: 'حملة الصحة', type: 'طبية', status: 'نشطة' },
    { name: 'حملة الغذاء', type: 'غذائية', status: 'مكتملة' },
  ];
  const nativeSelectStyles = {
    minWidth: '100px',
  };
  return (
    <PageContainer>
      <Title pageTitle='إدارة الموقع(المكان)' subtitle='المناطق'>
        <button onClick={() => setIsAddModalOpen(true)} className='btn'>
          <span>إضافة منطقة</span>
          <AddRounded />
        </button>
      </Title>
      {/* Table & filter */}
      <ContentWithTable
        isOpen={isAddModalOpen}
        setIsOpen={setIsAddModalOpen}
        columns={columns}
        rows={rows}
        className='areas'
      >
        {/* filter holder */}
        <div className='input-holder'>
          <CustomInput
            inputType='textField'
            placeholder='ابحث في المناطق'
            styles={{
              width: '400px',
              height: 'auto',
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'var(--main-color)', // لون اللابل عند focus
              },
            }}
            value={area}
            setValue={setArea}
          >
            nothing
          </CustomInput>
          <CustomInput
            label='المحافظة'
            inputType='nativeSelect'
            styles={nativeSelectStyles}
            value={government}
            setValue={setGovernment}
          >
            <option value='' disabled style={{ display: 'none' }}></option>
            <option value='all'>الكل</option>
            <option value='Alhamra'>حمص</option>
            <option value='Alghuta'>حماة</option>
          </CustomInput>
          <CustomInput
            label='المدينة'
            inputType='nativeSelect'
            styles={nativeSelectStyles}
            value={city}
            setValue={setCity}
          >
            <option value='' disabled style={{ display: 'none' }}></option>
            <option value='all'>الكل</option>
            <option value='Alhamra'>الحمراء</option>
            <option value='Alghuta'>الغوطة</option>
          </CustomInput>
        </div>

        <p>عدد المناطق: {rows.length}</p>
      </ContentWithTable>

      {/* Edit Modal */}
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

export default Areas;
