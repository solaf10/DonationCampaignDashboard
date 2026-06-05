import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editProjectDetail } from '../../services/projects';
import { useDispatch } from 'react-redux';
import { controlAddProjectDetailModalOpen } from '../../redux/slices/ModalContollerSlice';

const useAddProjectDetail = (detailID, projectID) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationKey: ['projects', projectID, 'details'],

    mutationFn: (data) => editProjectDetail(`${projectID}/${detailID}`, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['projects', projectID],
      });
      queryClient.invalidateQueries({
        queryKey: ['projects', projectID, 'details'],
      });
      dispatch(controlAddProjectDetailModalOpen({ type: 'edit' }));
    },
  });
};

export default useAddProjectDetail;
