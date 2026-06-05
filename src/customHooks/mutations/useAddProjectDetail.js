import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addProjectDetail } from '../../services/projects';
import { useDispatch } from 'react-redux';
import { controlAddProjectDetailModalOpen } from '../../redux/slices/ModalContollerSlice';

const useAddProjectDetail = (id) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationKey: ['projects', id, 'details'],

    mutationFn: (data) => addProjectDetail(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['projects', id],
      });
      dispatch(controlAddProjectDetailModalOpen({ type: 'add' }));
    },
  });
};

export default useAddProjectDetail;
