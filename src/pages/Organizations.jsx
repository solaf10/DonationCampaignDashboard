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
  { id: 'action', label: 'الإجراءات' },
];

const Organizations = () => {
  const [searchedKey, setSearchedKey] = useState('');
  const [order, setOrder] = useState('');
  const [donationType, setDonationType] = useState('');
  const [destination, setDestination] = useState('');

  const rows = [
    {
      name: 'حملة رمضان',
      type: 'تبرعات',
      /* status: <button onClick={() => setIsOpen(true)}>edit</button>, */
      status: 'مكتملة',
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
      <Title pageTitle='إدارة المتبرعين' subtitle='منظمات داعمة' />

      {/* Table & filter */}
      <ContentWithTable
        columns={columns}
        rows={rows}
        className='organizations'
        pageLink='/content/organizations'
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
          />
          <CustomInput
            label='الترتيب'
            inputType='nativeSelect'
            styles={nativeSelectStyles}
            value={order}
            setValue={setOrder}
          >
            <option value='' disabled style={{ display: 'none' }}></option>
            <option value='all'>الكل</option>
            <option value='Alhamra'>حمص</option>
            <option value='Alghuta'>حماة</option>
          </CustomInput>
          <CustomInput
            label='طريقة التبرع'
            inputType='nativeSelect'
            styles={nativeSelectStyles}
            value={donationType}
            setValue={setDonationType}
          >
            <option value='' disabled style={{ display: 'none' }}></option>
            <option value='all'>الكل</option>
            <option value='Alhamra'>الحمراء</option>
            <option value='Alghuta'>الغوطة</option>
          </CustomInput>
          <CustomInput
            label='الوجهة'
            inputType='nativeSelect'
            styles={nativeSelectStyles}
            value={destination}
            setValue={setDestination}
          >
            <option value='' disabled style={{ display: 'none' }}></option>
            <option value='all'>الكل</option>
            <option value='Alhamra'>الحمراء</option>
            <option value='Alghuta'>الغوطة</option>
          </CustomInput>
        </div>

        <p>عدد المنظمات: {rows.length}</p>
      </ContentWithTable>
    </PageContainer>
  );
};

export default Organizations;
