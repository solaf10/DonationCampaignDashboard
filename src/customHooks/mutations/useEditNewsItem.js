import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editNewsItem } from '../../services/news';

const useEditNewsItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['news', 'edit'],
    mutationFn: ({ id, body }) => editNewsItem(id, body),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['news'],
      });

      queryClient.invalidateQueries({
        queryKey: ['news', variables.id],
      });
    },
  });
};

export default useEditNewsItem;
