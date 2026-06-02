import useCampaigns, {
  useCampaignsTrash,
  useSearchCampaigns,
} from './queries/useCampaigns';

export const formatDate = (date) => {
  if (!date) return '-';

  return new Date(date).toLocaleDateString('ar-EG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const useGetCampaignsLogic = (isTrash, campaign, area, city, government) => {
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
    data: searchedCampaigns,
    isFetching: isSearching,
    error: searchError,
  } = useSearchCampaigns(campaign);

  /* const {
    data: filteredCampaigns,
    isFetching: isFiltering,
    error: filterError,
  } = useFilterCampaigns(
    government !== 'all' ? government : null,
    city !== 'all' ? city : null,
  ); */

  const allCampaigns = isTrash
    ? campaignsTrashData?.data
    : campaignsData?.data || [];
  const searchCampaigns = searchedCampaigns?.data || [];
  /* const filteredCampaignsData = filteredCampaigns?.data || []; */

  /*  const isSearchEnabled = area.trim() !== '';
  const isFilterEnabled = government !== 'all' || city !== 'all';

  let rawData = allCampaigns;

  if (isFilterEnabled && isSearchEnabled) {
    rawData = filteredCampaignsData.filter(
      (c) => c.district_name?.toLowerCase() === area.trim().toLowerCase(),
    );
  } else if (isSearchEnabled) {
    rawData = searchCampaigns;
  } else if (isFilterEnabled) {
    rawData = filteredCampaignsData;
  } */
  const rawData = searchCampaigns.length > 0 ? searchCampaigns : allCampaigns;
  const rows = rawData?.map((c) => ({
    ...c,
    projectsNum: c.projects?.length || null,
    end_date: formatDate(c.end_date),
  }));

  return {
    rows,
    isSearching,
    searchError,
    /* isFiltering,
    filterError, */
    isLoading: isFetchingCampaigns || isFetchingCampaignsTrash,
    campaignsError,
  };
};

export default useGetCampaignsLogic;
