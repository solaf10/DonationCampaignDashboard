import CustomInput from '../components/locations/CustomInput';
import { AddRounded, FilterAltOutlined } from '@mui/icons-material';
import Title from '../components/Title';
import PageContainer from '../components/PageContainer';
import PageTable from '../components/PageTable';
import useDonars, { useFilterDonars } from '../customHooks/queries/useDonars';
import { useSearchParams } from 'react-router-dom';
import config from '../constants/enviroment';
import { formatDate } from '../customHooks/useGetCampaignsLogic';
import { getCurrency } from '../utils/methods';
import PaycheckVerifyModal from '../components/PaycheckVerifyModal';
import { controlControlLocationModal } from '../redux/slices/ModalContollerSlice';
import { useFilters } from '../contexts/FilterContext';
import { useDispatch } from 'react-redux';
import { IconButton } from '@mui/material';
import DonarsFilterDrawer from '../components/DonarsFilterDrawer';
import FilterDrawer from '../components/FilterDrawer';

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

const Donars = () => {
  const { donarFilters, setDonarFilters } = useFilters();

  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  // fetchDonars
  const locationType = searchParams.get('type');

  const url = `/${config.donars.all?.[locationType]}`;

  const {
    data: donarsData,
    isFetching: isDonarsFetching,
    error: donarsError,
  } = useDonars(locationType, url);

  const hasFilters =
    donarFilters?.name ||
    donarFilters?.pending ||
    donarFilters?.method ||
    donarFilters?.status;
  const {
    data: filteredDonarsData,
    isFetching: isFiltering,
    error: filterError,
    refetch,
  } = useFilterDonars(donarFilters);

  const donars = hasFilters
    ? filteredDonarsData?.data || []
    : donarsData?.data || [];

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

  const handleReset = () => {
    setDonarFilters({
      pending: '',
      status: '',
      currency_type: '',
    });
  };

  return (
    <PageContainer>
      <Title pageTitle='إدارة المتبرعين' subtitle='منظمات داعمة' />

      {/* Table & filter */}

      {/* filter holder */}
      <div className='table-content donars'>
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
              value={donarFilters?.name}
              setValue={(value) =>
                setDonarFilters((prev) => ({
                  ...prev,
                  name: value,
                }))
              }
            />

            <p style={{ fontSize: '14px' }}>عدد المتبرعين: {rows?.length}</p>
          </div>
          {/* filter Model btn */}
          <IconButton
            sx={{
              backgroundColor: '#eeeeee',
              borderRadius: 2,
              m: 1,
            }}
            onClick={() =>
              dispatch(controlControlLocationModal({ type: 'filter' }))
            }
            className='filter-btn'
          >
            <FilterAltOutlined className='icon' />
          </IconButton>
        </div>
        <PageTable
          columns={columns}
          rows={rows}
          pageLink={`/content/donars`}
          isLoading={isDonarsFetching || isFiltering}
          hasNoResult={hasFilters && rows?.length === 0}
          error={donarsError?.message}
        />
      </div>
      <PaycheckVerifyModal />
      <FilterDrawer title='تصفية المتبرعين' onReset={handleReset}>
        <DonarsFilterDrawer
          refilterDonars={refetch}
          filterDonarsError={filterError}
        />
      </FilterDrawer>
    </PageContainer>
  );
};

export default Donars;
