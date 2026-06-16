import { useQuery } from '@tanstack/react-query';
import {
  getProjectDetails,
  getProjectsTrash,
  getSingleProject,
} from '../../services/projects';
import {
  filterNews,
  getCategories,
  getNews,
  getNewsTrash,
  getSingleNews,
} from '../../services/news';

export default function useNews() {
  return useQuery({ queryKey: ['news'], queryFn: getNews });
}

export function useNewsTrash() {
  return useQuery({
    queryKey: ['news', 'trash'],
    queryFn: getNewsTrash,
  });
}
export function useGetCategories() {
  return useQuery({
    queryKey: ['news-categories'],
    queryFn: getCategories,
  });
}
export function useSingleNews(id, isEnabled = true) {
  return useQuery({
    queryKey: ['news', id],
    queryFn: () => getSingleNews(id),
    enabled: isEnabled,
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

  if (filters.title) {
    data.append('title', filters.title);
  }

  if (filters?.method) {
    data.append('method', filters?.method);
  }

  filters.category.forEach((category) => {
    data.append('category[]', category);
  });

  return data;
};

export const useFilterNews = (body) => {
  const data = buildFilterFormData(body);
  return useQuery({
    queryKey: ['news', 'filter', JSON.stringify(body)],
    queryFn: () => filterNews(data),
  });
};
