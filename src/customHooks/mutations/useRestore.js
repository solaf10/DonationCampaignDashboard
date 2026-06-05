import { useMutation, useQueryClient } from '@tanstack/react-query';
import { restoreItem } from '../../services/general';

const useRestore = (baseQuery) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [...baseQuery, 'restore'],
    mutationFn: (url) => restoreItem(url),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...baseQuery] });
    },
  });
};

export default useRestore;
