import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addGovernment } from '../../services/governments';
import { useDispatch } from 'react-redux';
import { controlControlLocationModal } from '../../redux/slices/ModalContollerSlice';

const useAddGovernment = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['governments', 'add'],
    mutationFn: (government) => addGovernment({ governorate_name: government }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['governments'] });
      dispatch(controlControlLocationModal({ type: 'add', id: null }));
    },
  });
};

export default useAddGovernment;
