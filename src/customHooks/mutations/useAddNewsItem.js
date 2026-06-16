import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addNewsItem } from '../../services/news';

const useAddNewsItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['news', 'add'],
    mutationFn: (body) => addNewsItem(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
    },
  });
};

export default useAddNewsItem;
