import { TextField } from '@mui/material';
import Locations from '../components/Locations';

const columns = [
  { id: 'name', label: 'الاسم', minWidth: 170 },
  { id: 'type', label: 'النوع', minWidth: 100 },
  { id: 'status', label: 'الحالة', minWidth: 100 },
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
  return (
    <Locations
      subtitle='المحافظات'
      buttonTitle='محافظة'
      columns={columns}
      rows={rows}
      className='governments'
    >
      <TextField
        id='standard-basic'
        label='ابحث'
        variant='standard'
        sx={{
          width: '400px',
          '& .MuiInput-underline:before': {
            borderBottomColor: '#ccc', // اللون الافتراضي للخط قبل الفوكاس
          },
          '& .MuiInput-underline:hover:before': {
            borderBottomColor: 'var(--secondary-color)', // لون عند hover
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: 'var(--secondary-color)', // اللون عند focus
          },
          '& .MuiInputBase-input': {
            color: '#333', // لون النص
          },
          '& .MuiInputLabel-root': {
            color: '#8c9ea0', // لون اللابل
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: 'var(--main-color)', // لون اللابل عند focus
          },
        }}
      />
      <p>عدد المحافظات: {rows.length}</p>
    </Locations>
  );
};

export default Governments;
