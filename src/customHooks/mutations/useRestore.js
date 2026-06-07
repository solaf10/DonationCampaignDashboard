import { useMutation, useQueryClient } from '@tanstack/react-query';
import { restoreItem } from '../../services/general';
import { toast } from 'react-toastify';

const useRestore = (baseQuery) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [...baseQuery, 'restore'],
    mutationFn: (url) => restoreItem(url),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...baseQuery] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
};

export default useRestore;
