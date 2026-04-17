import ContentWithTable from '../components/ContentWithTable';
import CustomInput from '../components/locations/CustomInput';
import PageContainer from '../components/PageContainer';
import Title from '../components/Title';
import { useState } from 'react';
import { AddRounded } from '@mui/icons-material';

const columns = [
  { id: 'name', label: 'الاسم' },
  { id: 'type', label: 'النوع' },
  { id: 'status', label: 'الحالة' },
  { id: 'action', label: 'الإجراءات' },
];

const rows = [
  { name: 'حملة رمضان', type: 'تبرعات', status: 'نشطة' },
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

const Cities = () => {
  const [city, setCity] = useState('');
  const [government, setGovernment] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const nativeSelectStyles = { minWidth: '100px' };
  return (
    <PageContainer>
      <Title pageTitle='إدارة الموقع(المكان)' subtitle='المدن'>
        <button onClick={() => setIsAddModalOpen(true)} className='btn'>
          <span>إضافة مدينة</span>
          <AddRounded />
        </button>
      </Title>
      {/* Fitler & table */}
      <ContentWithTable
        isOpen={isAddModalOpen}
        setIsOpen={setIsAddModalOpen}
        columns={columns}
        rows={rows}
        className='cities'
      >
        {/* filter holder */}
        <div className='input-holder'>
          <CustomInput
            inputType='textField'
            placeholder='ابحث في المدن'
            styles={{
              width: '400px',
              height: 'auto',
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'var(--main-color)', // لون اللابل عند focus
              },
            }}
            value={city}
            setValue={setCity}
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
        </div>

        <p>عدد المدن: {rows.length}</p>
      </ContentWithTable>
    </PageContainer>
  );
};

export default Cities;
