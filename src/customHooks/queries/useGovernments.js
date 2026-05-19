import { useQuery } from '@tanstack/react-query';
import { getGovernments, searchGovernments } from '../../services/governments';

export default function useGovernments() {
  return useQuery({ queryKey: ['governments'], queryFn: getGovernments });
}

export const useSearchGovernments = (search) => {
  return useQuery({
    queryKey: ['governments', search],
    queryFn: () => searchGovernments(search),
    enabled: !!search, //don't work if search is empty
  });
};
