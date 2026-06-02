import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteItem } from '../../services/general';

const useDelete = (baseQuery) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [...baseQuery, 'delete'],
    mutationFn: (url) => deleteItem(url),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...baseQuery] });
    },
  });
};

export default useDelete;
