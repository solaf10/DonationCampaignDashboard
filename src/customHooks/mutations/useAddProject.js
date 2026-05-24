import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addProject } from '../../services/projects';

const useAddProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['projects', 'add'],
    mutationFn: (body) => addProject(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};

export default useAddProject;
