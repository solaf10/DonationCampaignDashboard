import { useState } from 'react';
import CustomInput from '../components/locations/CustomInput';
import { AddRounded } from '@mui/icons-material';
import Title from '../components/Title';
import PageContainer from '../components/PageContainer';
import { useDispatch } from 'react-redux';
import useCities from '../customHooks/queries/useCities';
import useGovernments from '../customHooks/queries/useGovernments';
import { controlControlLocationModal } from '../redux/slices/ModalContollerSlice';
import useGetAreasLogic from '../customHooks/useGetAreasLogic';
import AreaModalForm from '../components/locations/AreaModalForm';
import PageTable from '../components/PageTable';

const columns = [
  { id: 'district_name', label: 'المنطقة' },
  { id: 'city_name', label: 'المدينة' },
  { id: 'governorate_name', label: 'المحافظة' },
  { id: 'edit', label: 'الإجراءات' },
];

const Areas = () => {
  const [area, setArea] = useState('');
  const [city, setCity] = useState('all');
  const [government, setGovernment] = useState('all');

  // fetch & filter areas logic
  const {
    rows,
    isSearching,
    searchError,
    isFiltering,
    filterError,
    isFetchingAreas,
    areasError,
  } = useGetAreasLogic(area, city, government);

  const {
    data: cities,
    isPending: isFetchingCities,
    error: citiesError,
  } = useCities();

  // fetch governments
  const {
    data: governmentsData,
    isPending: isGovernmentFetching,
    error: governmentsError,
  } = useGovernments();

  const governments = governmentsData?.data || [];

  const dispatch = useDispatch();

  const nativeSelectStyles = {
    minWidth: '100px',
  };
  return (
    <PageContainer>
      <Title pageTitle='إدارة الموقع(المكان)' subtitle='المناطق'>
        <button
          onClick={() =>
            dispatch(controlControlLocationModal({ type: 'add', id: null }))
          }
          className='btn'
        >
          <span>إضافة منطقة</span>
          <AddRounded />
        </button>
      </Title>
      {/* Table & filter */}
      <div className='table-content areas'>
        <div className='filters-holder'>
          {/* filter holder */}
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
              value={area}
              setValue={setArea}
            />
            <CustomInput
              label='المحافظة'
              inputType='nativeSelect'
              styles={nativeSelectStyles}
              value={government}
              setValue={setGovernment}
            >
              <option value='all'>الكل</option>
              {governments.map((government) => (
                <option key={government.uuid} value={government.uuid}>
                  {government.governorate_name}
                </option>
              ))}
            </CustomInput>
            <CustomInput
              label='المدينة'
              inputType='nativeSelect'
              styles={nativeSelectStyles}
              value={city}
              setValue={setCity}
            >
              <option value='all'>الكل</option>
              {cities?.data.map((city) => (
                <option key={city.uuid} value={city.uuid}>
                  {city.city_name}
                </option>
              ))}
            </CustomInput>
          </div>

          <p>عدد المناطق: {rows.length}</p>
        </div>
        <PageTable
          rows={rows}
          columns={columns}
          isLoading={isSearching || isFetchingAreas || isFiltering}
          error={
            areasError
              ? areasError?.message
              : citiesError
                ? citiesError?.message
                : governmentsError?.message
          }
        />
      </div>

      <AreaModalForm governments={governments} areas={rows} />
    </PageContainer>
  );
};

export default Areas;
