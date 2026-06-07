import { useState } from 'react';
import CustomInput from '../components/locations/CustomInput';
import { AddRounded } from '@mui/icons-material';
import Title from '../components/Title';
import PageContainer from '../components/PageContainer';
import PageTable from '../components/PageTable';
import useDonars from '../customHooks/queries/useDonars';
import { useLocation } from 'react-router-dom';
import config from '../constants/enviroment';
import { formatDate } from '../customHooks/useGetCampaignsLogic';
import { getCurrency } from '../utils/methods';
import PaycheckVerifyModal from '../components/PaycheckVerifyModal';

const columns = [
  { id: 'name', label: 'الاسم' },
  { id: 'last_donation', label: 'آخر تبرع' },
  { id: 'campaignName', label: 'الحملة', width: '180px' },
  { id: 'date', label: 'تاريخ الاستحقاق' },
  { id: 'method', label: 'نوع التبرع' },
  { id: 'status', label: 'حالة التبرع' },
  { id: 'pending', label: 'حالة الدفع' },
  { id: 'verify', label: 'الإجراءات' },
];

const nativeSelectStyles = {
  minWidth: '100px',
};

const Donars = () => {
  const [searchedKey, setSearchedKey] = useState('');
  const [order, setOrder] = useState('');
  const [donationType, setDonationType] = useState('');
  const [destination, setDestination] = useState('');

  const location = useLocation();
  const locationTypeArr = location.pathname.split('/');
  const locationType = locationTypeArr[locationTypeArr?.length - 1];

  const url = `/${config.donars.all?.[locationType]}`;

  const {
    data: donarsData,
    isFetching: isDonarsFetching,
    error: donarsError,
  } = useDonars(locationType, url);

  const donars = donarsData?.data || [];

  const rows = donars?.map((donar) => {
    const currency = getCurrency(donar?.currency_type);

    return {
      ...donar,
      name: donar?.user?.name,
      date: formatDate(donar?.date),
      campaignName: donar?.campaing?.name,
      last_donation: `${donar?.last_donation}\u00A0${currency}`,
    };
  });

  return (
    <PageContainer>
      <Title pageTitle='إدارة المتبرعين' subtitle='منظمات داعمة' />

      {/* Table & filter */}

      {/* filter holder */}
      <div className='table-content organizations'>
        {/* filter holder */}
        <div className='filters-holder'>
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
        </div>
        <PageTable
          columns={columns}
          rows={rows}
          pageLink={`/content/donars`}
          isLoading={isDonarsFetching}
          /* hasNoResult={isFiltered && rows?.length === 0} */
          error={donarsError?.message}
        />
      </div>
      <PaycheckVerifyModal />
    </PageContainer>
  );
};

export default Donars;
