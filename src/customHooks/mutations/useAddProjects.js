import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { controlAddBySelectionModal } from '../../redux/slices/ModalContollerSlice';
import { addProjectsToCampaign } from '../../services/campaigns';

const useAddProjectToCampaign = (id) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationKey: ['campaigns', id, 'projects'],

    mutationFn: (data) => addProjectsToCampaign(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['campaigns', id],
      });
      queryClient.invalidateQueries({
        queryKey: ['campaigns', id],
      });
      dispatch(controlAddBySelectionModal());
    },
  });
};

export default useAddProjectToCampaign;
