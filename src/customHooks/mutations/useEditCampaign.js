import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editCampaign } from '../../services/campaigns';

const useEditCampaign = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['campaigns', 'edit'],
    mutationFn: ({ id, body }) => editCampaign(id, body),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['campaigns'],
      });

      queryClient.invalidateQueries({
        queryKey: ['campaigns', variables.id],
      });
    },
  });
};

export default useEditCampaign;
