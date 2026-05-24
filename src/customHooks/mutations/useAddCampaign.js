import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addCampaign } from '../../services/campaigns';

const useAddCampaign = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['campaigns', 'add'],
    mutationFn: (body) => addCampaign(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
    },
  });
};

export default useAddCampaign;
