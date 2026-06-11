import { useQuery } from '@tanstack/react-query';
import {
  filterDonars,
  getDonars,
  getPaycheck,
  getSingleDonar,
} from '../../services/donars';
import { useSearchParams } from 'react-router-dom';

export default function useDonars(queryKey, url) {
  return useQuery({ queryKey: [queryKey], queryFn: () => getDonars(url) });
}

export const useFilterDonars = (body) => {
  const [searchParams] = useSearchParams();
  const donarType = searchParams.get('type');

  return useQuery({
    queryKey: [donarType, 'filter', JSON.stringify(body)],
    queryFn: () => {
      return filterDonars(body);
    },
  });
};

export function useSingleDonar(id) {
  return useQuery({
    queryKey: ['donars', id],
    queryFn: () => getSingleDonar(id),
  });
}
export function useGetPaycheck(id) {
  return useQuery({
    queryKey: ['paycheck'],
    queryFn: () => getPaycheck(id),
  });
}
