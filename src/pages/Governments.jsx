import { TextField } from '@mui/material';
import ContentWithTable from '../components/ContentWithTable';
import CustomInput from '../components/locations/CustomInput';
import PageContainer from '../components/PageContainer';
import Title from '../components/Title';
import { AddRounded } from '@mui/icons-material';
import { useState } from 'react';

const columns = [
  { id: 'name', label: 'الاسم' },
  { id: 'type', label: 'النوع' },
  { id: 'status', label: 'الحالة' },
  { id: 'actions', label: '' },
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

const Governments = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  return (
    <PageContainer>
      <Title pageTitle='إدارة الموقع(المكان)' subtitle='المحافظات'>
        <button onClick={() => setIsAddModalOpen(true)} className='btn'>
          <span>إضافة محافظة</span>
          <AddRounded />
        </button>
      </Title>
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
        >
          nothing
        </CustomInput>
        <p>عدد المحافظات: {rows.length}</p>
      </ContentWithTable>
    </PageContainer>
  );
};

export default Governments;
