import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadProjectMedia } from '../../services/projects';

const useUploadProjectMedia = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['projects', id, 'media'],

    mutationFn: (data) => uploadProjectMedia(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['projects', id],
      });
    },
  });
};

export default useUploadProjectMedia;
