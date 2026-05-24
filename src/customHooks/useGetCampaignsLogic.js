import useCampaigns, { useSearchCampaigns } from './queries/useCampaigns';

export const formatDate = (date) => {
  if (!date) return '-';

  return new Date(date).toLocaleDateString('ar-EG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const useGetCampaignsLogic = (campaign, area, city, government) => {
  const {
    data: campaignsData,
    isPending: isFetchingCampaigns,
    error: campaignsError,
  } = useCampaigns();

  const {
    data: searchedCampaigns,
    isPending: isSearching,
    error: searchError,
  } = useSearchCampaigns(campaign);

  /* const {
    data: filteredCampaigns,
    isPending: isFiltering,
    error: filterError,
  } = useFilterCampaigns(
    government !== 'all' ? government : null,
    city !== 'all' ? city : null,
  ); */

  const allCampaigns = campaignsData?.data || [];
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

  const rows =
    campaignsData?.data.map((c) => ({
      ...c,
      projectsNum: c.projects.length == 0 ? null : c.projects.length,
      end_date: formatDate(c.end_date),
    })) || [];

  return {
    rows,
    isSearching,
    searchError,
    /* isFiltering,
    filterError, */
    isFetchingCampaigns,
    campaignsError,
  };
};

export default useGetCampaignsLogic;
