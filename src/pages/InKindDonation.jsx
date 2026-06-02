import CustomInput from '../components/locations/CustomInput';
import PageContainer from '../components/PageContainer';
import PageTable from '../components/PageTable';
import Title from '../components/Title';
import { AddRounded } from '@mui/icons-material';
import { useState } from 'react';

const columns = [
  { id: 'donation_name', label: 'اسم التبرع' },
  { id: 'donation_type', label: 'نوع التبرع' },
  { id: 'location', label: 'الموقع' },
  { id: 'quantity', label: 'الكمية' },
  { id: 'donation_image', label: 'صورة التبرع' },
  { id: 'item_condition', label: 'حالة المواد' },
  { id: 'delivery_method', label: 'طريقة التسليم' },
  { id: 'delivery_status', label: 'حالة التسليم' },
];
const inKindDonations = [
  {
    id: 1,
    donation_name: 'جهاز أوكسجين',
    donation_type: 'أجهزة طبية',
    location: 'حمص',
    quantity: 2,
    item_condition: 'ممتازة',
    donation_image: (
      <img
        src='/donation/oxygen-device.jpg'
        alt='جهاز أوكسجين'
        width='50'
        height='50'
        style={{ borderRadius: '8px', objectFit: 'cover' }}
      />
    ),
    delivery_method: 'تسليم من المتبرع',
    delivery_status: 'تم التسليم',
  },
  {
    id: 2,
    donation_name: 'كرسي متحرك',
    donation_type: 'أجهزة طبية',
    location: 'دمشق',
    quantity: 1,
    item_condition: 'جيدة جداً',
    donation_image: (
      <img
        src='/donation/wheelchair.jpg'
        alt='كرسي متحرك'
        width='50'
        height='50'
        style={{ borderRadius: '8px', objectFit: 'cover' }}
      />
    ),
    delivery_method: 'يحتاج فريق استلام',
    delivery_status: 'بانتظار الاستلام',
  },
  {
    id: 3,
    donation_name: 'بطانيات شتوية',
    donation_type: 'مواد إغاثية',
    location: 'حلب',
    quantity: 50,
    item_condition: 'جديدة',
    donation_image: (
      <img
        src='/donation/blankets.jpg'
        alt='بطانيات شتوية'
        width='50'
        height='50'
        style={{ borderRadius: '8px', objectFit: 'cover' }}
      />
    ),
    delivery_method: 'يحتاج فريق استلام',
    delivery_status: 'قيد التجهيز',
  },
  {
    id: 4,
    donation_name: 'حقائب مدرسية',
    donation_type: 'أدوات تعليمية',
    location: 'إدلب',
    quantity: 30,
    item_condition: 'ممتازة',
    donation_image: (
      <img
        src='/donation/school-bags.jpg'
        alt='حقائب مدرسية'
        width='50'
        height='50'
        style={{ borderRadius: '8px', objectFit: 'cover' }}
      />
    ),
    delivery_method: 'تسليم من المتبرع',
    delivery_status: 'تم التسليم',
  },
  {
    id: 5,
    donation_name: 'علب حليب أطفال',
    donation_type: 'مواد غذائية',
    location: 'اللاذقية',
    quantity: 20,
    item_condition: 'جديدة',
    donation_image: (
      <img
        src='/donation/baby-milk.jpg'
        alt='علب حليب أطفال'
        width='50'
        height='50'
        style={{ borderRadius: '8px', objectFit: 'cover' }}
      />
    ),
    delivery_method: 'يحتاج فريق استلام',
    delivery_status: 'بانتظار الاستلام',
  },
  {
    id: 6,
    donation_name: 'سرير طبي',
    donation_type: 'أجهزة طبية',
    location: 'طرطوس',
    quantity: 1,
    item_condition: 'مستعملة بحالة جيدة',
    donation_image: (
      <img
        src='/donation/medical-bed.jpg'
        alt='سرير طبي'
        width='50'
        height='50'
        style={{ borderRadius: '8px', objectFit: 'cover' }}
      />
    ),
    delivery_method: 'تسليم من المتبرع',
    delivery_status: 'تم التسليم',
  },
  {
    id: 7,
    donation_name: 'ملابس أطفال',
    donation_type: 'ملابس',
    location: 'حماة',
    quantity: 100,
    item_condition: 'جيدة',
    donation_image: (
      <img
        src='/donation/kids-clothes.jpg'
        alt='ملابس أطفال'
        width='50'
        height='50'
        style={{ borderRadius: '8px', objectFit: 'cover' }}
      />
    ),
    delivery_method: 'يحتاج فريق استلام',
    delivery_status: 'لم يتم التسليم',
  },
];
const InKindDonations = () => {
  const [search, setSearch] = useState('');

  const rows = inKindDonations
    .filter(
      (item) =>
        item.donation_name.includes(search) ||
        item.donation_type.includes(search) ||
        item.location.includes(search),
    )
    .map((item) => ({
      ...item,

      delivery_status: (
        <span
          className={`status-conditions ${
            item.delivery_status === 'تم التسليم'
              ? 'success-status'
              : item.delivery_status === 'بانتظار الاستلام'
                ? 'warning-status'
                : 'error-status'
          }`}
          style={{
            display: 'inline-block',
          }}
        >
          {item.delivery_status}
        </span>
      ),
    }));

  return (
    <PageContainer>
      <Title pageTitle='إدارة التبرعات' subtitle='التبرعات العينية'></Title>

      {/* Table & filter */}
      <div className='table-content in-kind-donations'>
        <div className='filters-holder'>
          <CustomInput
            inputType='textField'
            placeholder='ابحث حسب الاسم'
            styles={{
              width: '400px',
              height: 'auto',
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'var(--main-color)',
              },
            }}
            value={search}
            setValue={setSearch}
          />

          <p>عدد التبرعات: {rows.length}</p>
        </div>

        <PageTable rows={rows} columns={columns} />
      </div>
    </PageContainer>
  );
};

export default InKindDonations;
