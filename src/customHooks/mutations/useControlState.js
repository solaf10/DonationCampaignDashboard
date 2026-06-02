import { useMutation, useQueryClient } from '@tanstack/react-query';
import { changeState } from '../../services/campaigns';

const useControlState = (url, baseQuery, type) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [...baseQuery, type],
    mutationFn: () => changeState(url),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...baseQuery] });
    },
  });
};

export default useControlState;
