import useCities, {
  useFilterCitiesByGovernment,
  useSearchCities,
} from './queries/useCities';

const useGetCitiesLogic = (city, government) => {
  const {
    data: cities,
    isPending: isFetchingCities,
    error: citiesError,
  } = useCities();

  // enableSearch when there is a search value, otherwise use the all cities query
  const {
    data: searchedCities,
    isPending: isSearchLoading,
    error: searchError,
  } = useSearchCities(city);

  // filter cities by government when there is a government value
  const {
    data: filteredCitiesByGovernment,
    isFiltering,
    error: filterError,
  } = useFilterCitiesByGovernment(government !== 'all' ? government : null);

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
    rawData = filteredCitiesByGovernment?.data || [];
  }

  const rows =
    rawData.map((city) => ({
      uuid: city.uuid,
      city_name: city.city_name,
      governorate_name: city?.governorate.governorate_name,
      governorate_uuid: city?.governorate.uuid,
    })) || [];
  return {
    rows,
    isSearchLoading,
    searchError,
    isFiltering,
    filterError,
    isFetchingCities,
    citiesError,
  };
};

export default useGetCitiesLogic;
