import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../services/axios';

const useEditExchangeRate = (uuid) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await api.post(`/exchange_rate/update/${uuid}`, data);

      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['exchange-rates'],
      });
    },
  });
};

export default useEditExchangeRate;
