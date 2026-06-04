import { useFilters } from '../contexts/FilterContext';
import useCampaigns, {
  useCampaignsTrash,
  useFilterCampaigns,
} from './queries/useCampaigns';

export const formatDate = (date) => {
  if (!date) return '-';

  return new Date(date).toLocaleDateString('ar-EG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const useGetCampaignsLogic = (isTrash) => {
  const { campaignFilters } = useFilters();
  const {
    data: campaignsData,
    isFetching: isFetchingCampaigns,
    error: campaignsError,
  } = useCampaigns();

  const {
    data: campaignsTrashData,
    isFetching: isFetchingCampaignsTrash,
    error: campaignsTrashError,
  } = useCampaignsTrash();

  const {
    data: filteredCampaignsData,
    isPending: isFiltering,
    refetch,
    error: filterCampaignsError,
  } = useFilterCampaigns(campaignFilters, false);

  const allCampaigns = isTrash
    ? campaignsTrashData?.data
    : campaignsData?.data || [];

  const filteredCampaigns = filteredCampaignsData?.data || [];

  const hasFilters =
    campaignFilters.name ||
    campaignFilters.government ||
    campaignFilters.city ||
    campaignFilters.district_uuid ||
    campaignFilters.project_uuid ||
    campaignFilters.status.length > 0;

  const rawData = hasFilters ? filteredCampaigns : allCampaigns;

  const rows = rawData?.map((c) => ({
    ...c,
    projectsNum: c.projects?.length || null,
    end_date: formatDate(c.end_date),
  }));

  return {
    rows,
    refilterCampaigns: refetch,
    isFiltering,
    isLoading: isFetchingCampaigns || isFetchingCampaignsTrash,
    fetchingError: isTrash ? campaignsTrashError : campaignsError,
    filterCampaignsError,
  };
};

export default useGetCampaignsLogic;
