import {
  FormControl,
  InputLabel,
  NativeSelect,
  TextField,
} from '@mui/material';
import ContentWithTable from '../components/ContentWithTable';
import CustomInput from '../components/locations/CustomInput';

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

const Cities = () => {
  return (
    <ContentWithTable
      pageTitle='إدارة الموقع(المكان)'
      subtitle='المدن'
      buttonTitle='مدينة'
      columns={columns}
      rows={rows}
      className='cities'
    >
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
            },
            '& .MuiInputLabel-root': {
              color: '#8c9ea0', // لون اللابل
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
    </ContentWithTable>
  );
};

export default Cities;
