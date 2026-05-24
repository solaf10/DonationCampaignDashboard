import { useQuery } from '@tanstack/react-query';
import {
  filterCampaigns,
  getCampaigns,
  searchCampaigns,
} from '../../services/campaigns';

export default function useCampaigns() {
  return useQuery({ queryKey: ['campaigns'], queryFn: getCampaigns });
}

export const useSearchCampaigns = (search) => {
  return useQuery({
    queryKey: ['campaigns', search],
    queryFn: () =>
      searchCampaigns({
        name: search,
      }),
    enabled: !!search.trim(), // don't run if search is empty
  });
};
export const useFilterCampaigns = (governmentId, cityId) => {
  return useQuery({
    queryKey: ['campaigns', 'filter', [governmentId, cityId]],
    queryFn: () =>
      filterCampaigns({
        ...(governmentId ? { governorate_uuid: governmentId } : {}),
        ...(cityId ? { city_uuid: cityId } : {}),
      }),
    enabled: Boolean(
      (governmentId && governmentId !== 'all') || (cityId && cityId !== 'all'),
    ),
  });
};
