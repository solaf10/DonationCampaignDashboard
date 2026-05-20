import { useQuery } from '@tanstack/react-query';
import {
  filterCitiesByGovernment,
  getCities,
  searchCities,
} from '../../services/cities';

export default function useCities() {
  return useQuery({ queryKey: ['cities'], queryFn: getCities });
}

export const useSearchCities = (search) => {
  return useQuery({
    queryKey: ['cities', search],
    queryFn: () =>
      searchCities({
        city_name: search,
      }),
    enabled: !!search.trim(), //don't work if search is empty
  });
};
export const useFilterCitiesByGovernment = (id) => {
  return useQuery({
    queryKey: ['cities', 'filter', id],
    queryFn: () =>
      filterCitiesByGovernment({
        governorate_uuid: id,
      }),
    enabled: !!id && id !== 'all',
  });
};
