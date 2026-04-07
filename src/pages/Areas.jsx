import { FormControl, InputLabel, NativeSelect } from '@mui/material';
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
  return (
    <PageContainer>
      <Title pageTitle='إدارة الموقع(المكان)' subtitle='المناطق'>
        <button onClick={() => setIsAddModalOpen(true)} className='btn'>
          <span>إضافة منطقة</span>
          <AddRounded />
        </button>
      </Title>
      <ContentWithTable
        isOpen={isAddModalOpen}
        setIsOpen={setIsAddModalOpen}
        columns={columns}
        rows={rows}
        className='areas'
      >
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
          >
            nothing
          </CustomInput>
          <FormControl
            sx={{
              minWidth: '100px',
              '& .MuiInput-underline:before': {
                borderBottomColor: '#ccc', // الخط قبل الفوكاس
              },
              '& .MuiInput-underline:hover:before': {
                borderBottomColor: 'var(--secondary-color)', // عند hover
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: 'var(--secondary-color)', // عند focus
              },
              '& .MuiInputBase-input': {
                color: '#333', // لون النص داخل select
                fontFamily: 'Cairo',
              },
              '& .MuiInputLabel-root': {
                color: '#8c9ea0', // لون اللابل
                fontFamily: 'Cairo',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'var(--main-color)', // لون اللابل عند focus
              },
              '& .MuiSelect-select': {
                padding: '8px 0', // تباعد النص داخل select
              },
            }}
          >
            <InputLabel variant='standard' htmlFor='governments-filter'>
              المحافظة
            </InputLabel>
            <NativeSelect
              defaultValue=''
              inputProps={{
                name: 'government',
                id: 'governments-filter',
              }}
            >
              <option value='' disabled style={{ display: 'none' }}></option>
              <option value='all'>الكل</option>
              <option value='homs'>حمص</option>
              <option value='hama'>حماة</option>
            </NativeSelect>
          </FormControl>
          <FormControl
            sx={{
              minWidth: '100px',
              '& .MuiInput-underline:before': {
                borderBottomColor: '#ccc', // الخط قبل الفوكاس
              },
              '& .MuiInput-underline:hover:before': {
                borderBottomColor: 'var(--secondary-color)', // عند hover
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: 'var(--secondary-color)', // عند focus
              },
              '& .MuiInputBase-input': {
                color: '#333', // لون النص داخل select
                fontFamily: 'Cairo',
              },
              '& .MuiInputLabel-root': {
                color: '#8c9ea0', // لون اللابل
                fontFamily: 'Cairo',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'var(--main-color)', // لون اللابل عند focus
              },
              '& .MuiSelect-select': {
                padding: '8px 0', // تباعد النص داخل select
              },
            }}
          >
            <InputLabel variant='standard' htmlFor='cities-filter'>
              المدينة
            </InputLabel>
            <NativeSelect
              defaultValue=''
              inputProps={{
                name: 'city',
                id: 'cities-filter',
              }}
            >
              <option value='' disabled style={{ display: 'none' }}></option>
              <option value='all'>الكل</option>
              <option value='Alhamra'>الحمراء</option>
              <option value='Alghuta'>الغوطة</option>
            </NativeSelect>
          </FormControl>
        </div>

        <p>عدد المناطق: {rows.length}</p>
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

export default Areas;
