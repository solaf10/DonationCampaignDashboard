import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { controlControlLocationModal } from '../../redux/slices/ModalContollerSlice';
import { addCity } from '../../services/cities';

const useAddCity = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['cities', 'add'],
    mutationFn: (body) => addCity(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cities'] });
      dispatch(controlControlLocationModal({ type: 'add', id: null }));
    },
  });
};

export default useAddCity;
