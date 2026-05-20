import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { controlControlLocationModal } from '../../redux/slices/ModalContollerSlice';
import { addArea } from '../../services/areas';

const useAddArea = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['areas', 'add'],
    mutationFn: (body) => addArea(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['areas'] });
      dispatch(controlControlLocationModal({ type: 'add', id: null }));
    },
  });
};

export default useAddArea;
