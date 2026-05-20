import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { controlControlLocationModal } from '../../redux/slices/ModalContollerSlice';
import { editGovernment } from '../../services/governments';

const useEditGovernment = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['governments', 'edit'],

    mutationFn: ({ id, government }) =>
      editGovernment(id, {
        governorate_name: government,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['governments'],
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

export default useEditGovernment;
