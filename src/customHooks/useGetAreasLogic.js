import useAreas, { useFilterAreas, useSearchAreas } from './queries/useAreas';

const useGetAreasLogic = (area, city, government) => {
  const {
    data: areasData,
    isFetching: isFetchingAreas,
    error: areasError,
  } = useAreas();

  const {
    data: searchedAreas,
    isFetching: isSearching,
    error: searchError,
  } = useSearchAreas(area);

  const {
    data: filteredAreas,
    isFetching: isFiltering,
    error: filterError,
  } = useFilterAreas(
    government !== 'all' ? government : null,
    city !== 'all' ? city : null,
  );

  const allAreas = areasData?.data || [];
  const searchAreas = searchedAreas?.data || [];
  const filteredAreasData = filteredAreas?.data || [];

  const isSearchEnabled = area.trim() !== '';
  const isFilterEnabled = government !== 'all' || city !== 'all';

  let rawData = allAreas;

  if (isFilterEnabled && isSearchEnabled) {
    rawData = filteredAreasData.filter(
      (c) => c.district_name?.toLowerCase() === area.trim().toLowerCase(),
    );
  } else if (isSearchEnabled) {
    rawData = searchAreas;
  } else if (isFilterEnabled) {
    rawData = filteredAreasData;
  }

  const rows =
    rawData.map((area) => ({
      uuid: area?.uuid,
      district_name: area?.district_name,
      city_uuid: area?.city.uuid,
      city_name: area?.city.city_name,
      governorate_name: area?.city.governorate.governorate_name,
      governorate_uuid: area?.city.governorate.uuid,
    })) || [];
  return {
    rows,
    isSearching,
    searchError,
    isFiltering,
    filterError,
    isFetchingAreas,
    areasError,
  };
};

export default useGetAreasLogic;
