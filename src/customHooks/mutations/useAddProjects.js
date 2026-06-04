import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { controlAddBySelectionModal } from '../../redux/slices/ModalContollerSlice';
import { addProjectsToCampaign } from '../../services/campaigns';

const useAddProjectToCampaign = (id) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationKey: ['campaigns', id, 'projects'],

    mutationFn: (data) => addProjectsToCampaign(id, data),
  });
};

export default useAddProjectToCampaign;
