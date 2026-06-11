import { useMutation, useQueryClient } from '@tanstack/react-query';
import { verifyPaycheck } from '../../services/donars';

const useVerifyPaycheck = () => {
  return useMutation({
    mutationKey: ['donars', 'verify'],

    mutationFn: ({ id, data }) => verifyPaycheck(id, data),
  });
};

export default useVerifyPaycheck;
