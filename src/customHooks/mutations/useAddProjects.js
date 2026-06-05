import { useMutation } from '@tanstack/react-query';
import { addProjectsToCampaign } from '../../services/campaigns';

const useAddProjectToCampaign = (id) => {
  return useMutation({
    mutationKey: ['campaigns', id, 'projects'],

    mutationFn: (data) => addProjectsToCampaign(id, data),
  });
};

export default useAddProjectToCampaign;
