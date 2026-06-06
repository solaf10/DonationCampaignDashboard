import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editProject } from '../../services/projects';

const useEditProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['projects', 'edit'],
    mutationFn: ({ id, body }) => editProject(id, body),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['projects'],
      });

      queryClient.invalidateQueries({
        queryKey: ['projects', variables.id],
      });
    },
  });
};

export default useEditProject;
