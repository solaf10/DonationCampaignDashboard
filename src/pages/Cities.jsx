import ContentWithTable from '../components/ContentWithTable';
import CustomInput from '../components/locations/CustomInput';
import PageContainer from '../components/PageContainer';
import Title from '../components/Title';
import { useState } from 'react';
import { AddRounded } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { controlControlLocationModal } from '../redux/slices/ModalContollerSlice';
import CityModalForm from '../components/locations/CityModalForm';
import useCities, {
  useFilterCitiesByGovernment,
  useSearchCities,
} from '../customHooks/queries/useCities';
import useGovernments from '../customHooks/queries/useGovernments';

const columns = [
  { id: 'city_name', label: 'المدينة' },
  { id: 'governorate_name', label: 'المحافظة' },
  { id: 'action', label: 'الإجراءات' },
];

const Cities = () => {
  const [city, setCity] = useState('');
  const [government, setGovernment] = useState('all');

  const { data: cities, isPending: isFetchingCities, error } = useCities();

  // fetch governments
  const {
    data: governmentsData,
    /* isPending: isGovernmentFetching,
      error, */
  } = useGovernments();

  // enableSearch when there is a search value, otherwise use the all cities query
  const {
    data: searchedCities,
    /* isPending: isSearchLoading,
      error: searchError, */
  } = useSearchCities(city);

  // filter cities by government when there is a government value
  const { data: filteredCitiesByGovernment, isFiltering } =
    useFilterCitiesByGovernment(government !== 'all' ? government : null);

  const allCities = cities?.data || [];
  const searchCities = searchedCities?.data || [];

  let rawData = allCities;

  // search + filter
  if (city.trim() && government !== 'all') {
    rawData = searchCities.filter((c) => c.governorate?.uuid === government);
  }

  // search only
  else if (city.trim()) {
    rawData = searchCities;
  }

  // filter only
  else if (government !== 'all') {
    rawData = allCities.filter((c) => c.governorate?.uuid === government);
  }

  const rows =
    rawData.map((city) => ({
      uuid: city.uuid,
      city_name: city.city_name,
      governorate_name: city?.governorate.governorate_name,
      governorate_uuid: city?.governorate.uuid,
    })) || [];

  const governments = governmentsData?.data || [];

  const dispatch = useDispatch();

  const nativeSelectStyles = { minWidth: '100px' };
  return (
    <PageContainer>
      <Title pageTitle='إدارة الموقع(المكان)' subtitle='المدن'>
        <button
          onClick={() =>
            dispatch(controlControlLocationModal({ type: 'add', id: null }))
          }
          className='btn'
        >
          <span>إضافة مدينة</span>
          <AddRounded />
        </button>
      </Title>
      {/* Fitler & table */}
      <ContentWithTable columns={columns} rows={rows} className='cities'>
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
          />

          <CustomInput
            label='المحافظة'
            inputType='nativeSelect'
            styles={nativeSelectStyles}
            value={government}
            setValue={setGovernment}
          >
            <option value='' disabled style={{ display: 'none' }}></option>
            <option value='all'>الكل</option>
            {governments.map((government) => (
              <option key={government.uuid} value={government.uuid}>
                {government.governorate_name}
              </option>
            ))}
          </CustomInput>
        </div>

        <p>عدد المدن: {rows.length}</p>
      </ContentWithTable>
      <CityModalForm cities={rows} governments={governments} />
    </PageContainer>
  );
};

export default Cities;
