import { useQuery } from '@tanstack/react-query';
import {
  filterProjects,
  getFundingSources,
  getProjectDetails,
  getProjects,
  getSectors,
  getSingleProject,
  getStatus,
  getUnAttachedProjects,
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
    queryKey: ['projects-status'],
    queryFn: getStatus,
  });
}
export function useSingleProject(id) {
  return useQuery({
    queryKey: ['projects', id],
    queryFn: () => getSingleProject(id),
  });
}
export function useGetProjectDetails(id, enabled) {
  return useQuery({
    queryKey: ['projects', id, 'details'],
    queryFn: () => getProjectDetails(id),
    enabled,
  });
}

const buildFilterFormData = (filters) => {
  const data = new FormData();

  if (filters.sector) {
    data.append('sector', filters.sector);
  }

  if (filters.government) {
    data.append('governorate_uuid', filters.government);
  }
  if (filters.name) {
    data.append('name', filters.name);
  }

  if (filters.city) {
    data.append('city_uuid', filters.city);
  }

  if (filters.district_uuid) {
    data.append('district_uuid', filters.district_uuid);
  }

  if (filters.funding_source) {
    data.append('funding_source', filters.funding_source);
  }

  if (filters.progress_percentage) {
    data.append('progress_percentage', filters.progress_percentage);
  }

  filters.status.forEach((status) => {
    data.append('status[]', status);
  });

  return data;
};

export const useFilterProjects = (body) => {
  const data = buildFilterFormData(body);
  return useQuery({
    queryKey: ['projects', 'filter', JSON.stringify(body)],
    queryFn: () => filterProjects(data),
  });
};
