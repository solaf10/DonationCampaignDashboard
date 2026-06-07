import { useQuery } from '@tanstack/react-query';
import { getDonars, getSingleDonar } from '../../services/donars';

export default function useDonars(queryKey, url) {
  return useQuery({ queryKey: [queryKey], queryFn: () => getDonars(url) });
}

export function useSingleDonar(id) {
  return useQuery({
    queryKey: ['donars', id],
    queryFn: () => getSingleDonar(id),
  });
}
