import { useMutation } from '@tanstack/react-query';
import { addCampaignToProject } from '../../services/projects';

const useAddCampaignToProject = (id) => {
  return useMutation({
    mutationKey: ['projects', id, 'campaign'],

    mutationFn: (data) => addCampaignToProject(id, data),
  });
};

export default useAddCampaignToProject;
