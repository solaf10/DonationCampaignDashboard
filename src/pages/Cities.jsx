import CustomInput from '../components/locations/CustomInput';
import PageContainer from '../components/PageContainer';
import Title from '../components/Title';
import { useState } from 'react';
import { AddRounded } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { controlControlLocationModal } from '../redux/slices/ModalContollerSlice';
import CityModalForm from '../components/locations/CityModalForm';
import useGovernments from '../customHooks/queries/useGovernments';
import useGetCitiesLogic from '../customHooks/useGetCitiesLogic';
import PageTable from '../components/PageTable';

const columns = [
  { id: 'city_name', label: 'المدينة' },
  { id: 'governorate_name', label: 'المحافظة' },
  { id: 'edit', label: 'الإجراءات' },
];

const Cities = () => {
  const [city, setCity] = useState('');
  const [government, setGovernment] = useState('all');

  const {
    rows,
    isSearchLoading,
    searchError,
    isFiltering,
    filterError,
    isFetchingCities,
    citiesError,
  } = useGetCitiesLogic(city, government);

  // fetch governments
  const {
    data: governmentsData,
    isPending: isGovernmentFetching,
    error: governmentsError,
  } = useGovernments();

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
      <div className='table-content cities'>
        {/* filter holder */}
        <div className='filters-holder'>
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
        </div>
        <PageTable
          rows={rows}
          columns={columns}
          isLoading={isFetchingCities || isFiltering || isSearchLoading}
          error={citiesError ? citiesError?.message : governmentsError?.message}
        />
      </div>

      <CityModalForm cities={rows} governments={governments} />
    </PageContainer>
  );
};

export default Cities;
