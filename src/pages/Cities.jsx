import {
  FormControl,
  InputLabel,
  NativeSelect,
  TextField,
} from '@mui/material';
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

const Cities = () => {
  return (
    <Locations
      subtitle='المدن'
      buttonTitle='مدينة'
      columns={columns}
      rows={rows}
      className='cities'
    >
      <div className='input-holder'>
        <TextField
          id='standard-basic'
          label='ابحث في المدن'
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
      </div>

      <p>عدد المدن: {rows.length}</p>
    </Locations>
  );
};

export default Cities;
