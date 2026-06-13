import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadNewsMedia } from '../../services/news';

const useUploadNewsMedia = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['new', id, 'media'],

    mutationFn: (data) => uploadNewsMedia(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['news', id],
      });
    },
  });
};

export default useUploadNewsMedia;
