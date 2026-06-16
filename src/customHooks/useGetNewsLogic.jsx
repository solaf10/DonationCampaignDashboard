import config from '../constants/enviroment';
import { useFilters } from '../contexts/FilterContext';
import useNews, { useFilterNews, useNewsTrash } from './queries/useNews';

export const formatDate = (date) => {
  if (!date) return '-';

  return new Date(date).toLocaleDateString('ar-EG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const useGetNewsLogic = (isTrash) => {
  const { newsFilters } = useFilters();
  const {
    data: NewsData,
    isFetching: isFetchingNews,
    error: newsError,
  } = useNews();

  const {
    data: newsTrashData,
    isFetching: isFetchingNewsTrash,
    error: newsTrashError,
  } = useNewsTrash();

  const {
    data: filteredNewsData,
    isPending: isFiltering,
    refetch,
    error: filterNewsError,
  } = useFilterNews(newsFilters, false);

  const allNews = isTrash ? newsTrashData?.data : NewsData?.data || [];

  const filteredNews = filteredNewsData?.data || [];

  const hasFilters =
    newsFilters.title || newsFilters.method || newsFilters.category.length > 0;

  const rawData = hasFilters ? filteredNews : allNews;

  const rows = rawData?.map((newsItem) => ({
    ...newsItem,
    publish_date: formatDate(newsItem.publish_date),
    category:
      newsItem?.category === 'غير ذلك'
        ? newsItem?.on_the_other_hand
        : newsItem?.category,
    cover_image: (
      <img
        src={config.baseUrl + newsItem?.cover_image}
        alt='news'
        width={60}
        height={60}
        style={{
          objectFit: 'cover',
          borderRadius: '8px',
        }}
      />
    ),
  }));

  return {
    rows,
    refilterNews: refetch,
    isFiltering,
    isLoading: isFetchingNews || isFetchingNewsTrash,
    fetchingError: isTrash ? newsTrashError : newsError,
    filterNewsError,
  };
};

export default useGetNewsLogic;
