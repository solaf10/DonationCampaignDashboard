import { useQuery } from '@tanstack/react-query';
import { getExchangeRates } from '../../services/general';

export function useGetExchangeRates() {
  return useQuery({
    queryKey: ['exchange-rates'],
    queryFn: () => getExchangeRates(),
  });
}
