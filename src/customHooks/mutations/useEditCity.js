import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { controlControlLocationModal } from '../../redux/slices/ModalContollerSlice';
import { editCity } from '../../services/cities';

const useEditCity = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['cities', 'edit'],

    mutationFn: ({ id, data }) => editCity(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cities'],
      });

      dispatch(
        controlControlLocationModal({
          type: 'edit',
          id: null,
        }),
      );
    },
  });
};

export default useEditCity;
