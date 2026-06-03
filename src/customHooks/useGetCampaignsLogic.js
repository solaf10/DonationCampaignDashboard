import { useFilteredCampaigns } from '../contexts/FilterCampaignsContext';
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
  const { formData, isFiltered } = useFilteredCampaigns();
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
    isSuccess: isFilterSuccess,
  } = useFilterCampaigns(formData);

  const allCampaigns = isTrash
    ? campaignsTrashData?.data
    : campaignsData?.data || [];
  const filteredCampaigns = filteredCampaignsData?.data || [];

  const rawData = isFiltered ? filteredCampaigns : allCampaigns;
  const rows = rawData?.map((c) => ({
    ...c,
    projectsNum: c.projects?.length || null,
    end_date: formatDate(c.end_date),
  }));

  return {
    rows,
    refilterCampaigns: refetch,
    isFilterSuccess,
    isFiltering,
    isLoading: isFetchingCampaigns || isFetchingCampaignsTrash,
    fetchingError: isTrash ? campaignsTrashError : campaignsError,
    filterCampaignsError,
  };
};

export default useGetCampaignsLogic;
