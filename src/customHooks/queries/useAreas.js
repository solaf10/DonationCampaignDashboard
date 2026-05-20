import { useQuery } from '@tanstack/react-query';
import { filterAreas, getAreas, searchAreas } from '../../services/areas';

export default function useAreas() {
  return useQuery({ queryKey: ['areas'], queryFn: getAreas });
}

export const useSearchAreas = (search) => {
  return useQuery({
    queryKey: ['areas', search],
    queryFn: () =>
      searchAreas({
        district_name: search,
      }),
    enabled: !!search.trim(), // don't run if search is empty
  });
};
export const useFilterAreas = (governmentId, cityId) => {
  return useQuery({
    queryKey: ['areas', 'filter', [governmentId, cityId]],
    queryFn: () =>
      filterAreas({
        ...(governmentId ? { governorate_uuid: governmentId } : {}),
        ...(cityId ? { city_uuid: cityId } : {}),
      }),
    enabled: Boolean(
      (governmentId && governmentId !== 'all') || (cityId && cityId !== 'all'),
    ),
  });
};
