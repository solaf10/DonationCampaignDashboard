import { useQuery } from '@tanstack/react-query';
import {
  filterCampaigns,
  getCampaigns,
  getCampaignsTrash,
  getSingleCampaign,
  getStatus,
} from '../../services/campaigns';
import { useFilteredCampaigns } from '../../contexts/FilterCampaignsContext';

export default function useCampaigns() {
  return useQuery({ queryKey: ['campaigns'], queryFn: getCampaigns });
}
export function useCampaignsTrash() {
  return useQuery({
    queryKey: ['campaigns', 'trash'],
    queryFn: getCampaignsTrash,
  });
}

export function useSingleCampaign(id) {
  return useQuery({
    queryKey: ['campaigns', id],
    queryFn: () => getSingleCampaign(id),
  });
}

export function useGetStatus() {
  return useQuery({
    queryKey: ['status'],
    queryFn: getStatus,
  });
}

// convert data to FormData for the filterCampaigns
const buildFilterFormData = (filters) => {
  const data = new FormData();

  if (filters.project_uuid) {
    data.append('project_uuid', filters.project_uuid);
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

  filters.status.forEach((status) => {
    data.append('status[]', status);
  });

  return data;
};

export const useFilterCampaigns = (body, enabled) => {
  const data = buildFilterFormData(body);
  const { isFiltered } = useFilteredCampaigns();
  return useQuery({
    queryKey: ['campaigns', 'filter', body],
    queryFn: () => filterCampaigns(data),
    enabled: enabled || isFiltered,
  });
};
