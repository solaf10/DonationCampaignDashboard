import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { controlControlLocationModal } from '../../redux/slices/ModalContollerSlice';
import { editArea } from '../../services/areas';

const useEditArea = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['areas', 'edit'],

    mutationFn: ({ id, data }) => editArea(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['areas'],
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

export default useEditArea;
