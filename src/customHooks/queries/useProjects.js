import { useQuery } from '@tanstack/react-query';
import {
  filterProjects,
  getFundingSources,
  getProjects,
  getSectors,
  getSingleProject,
  getStatus,
  getUnAttachedProjects,
  searchProjects,
} from '../../services/projects';

export default function useProjects() {
  return useQuery({ queryKey: ['projects'], queryFn: getProjects });
}

export function useGetUnAttachedProjects() {
  return useQuery({
    queryKey: ['campaigns', 'unattached-projects'],
    queryFn: getUnAttachedProjects,
    staleTime: 0,
  });
}

export function useGetFundingSources() {
  return useQuery({
    queryKey: ['funding-sources'],
    queryFn: getFundingSources,
  });
}
export function useGetSectors() {
  return useQuery({
    queryKey: ['sectors'],
    queryFn: getSectors,
  });
}
export function useGetStatus() {
  return useQuery({
    queryKey: ['status'],
    queryFn: getStatus,
  });
}
export function useSingleProject(id) {
  return useQuery({
    queryKey: ['projects', id],
    queryFn: () => getSingleProject(id),
  });
}

export const useSearchProjects = (search) => {
  return useQuery({
    queryKey: ['projects', search],
    queryFn: () =>
      searchProjects({
        district_name: search,
      }),
    enabled: !!search.trim(), // don't run if search is empty
  });
};
export const useFilterProjects = (governmentId, cityId) => {
  return useQuery({
    queryKey: ['projects', 'filter', [governmentId, cityId]],
    queryFn: () =>
      filterProjects({
        ...(governmentId ? { governorate_uuid: governmentId } : {}),
        ...(cityId ? { city_uuid: cityId } : {}),
      }),
    enabled: Boolean(
      (governmentId && governmentId !== 'all') || (cityId && cityId !== 'all'),
    ),
  });
};
