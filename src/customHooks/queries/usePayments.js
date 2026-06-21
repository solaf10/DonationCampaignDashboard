import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addPayment,
  editPayment,
  getDetails,
  getPayments,
  getProjects,
} from "../../services/payments";

export default function usePayments() {
  return useQuery({
    queryKey: ["pendings/all"],
    queryFn: getPayments,
  });
}
export function useProjects() {
  return useQuery({
    queryKey: ["pendings/projects"],
    queryFn: getProjects,
  });
}
export function useDetails(id) {
  return useQuery({
    queryKey: [`pendings/details`, id],
    queryFn: () => getDetails(id),
    enabled: !!id,
  });
}
export function useAddPayment() {
  return useMutation({
    mutationFn: addPayment,
  });
}
export function usePaymentById(uuid) {
  return useQuery({
    queryKey: ["pendings/all", uuid],
    queryFn: async () => {
      const res = await getPayments();
      const item = res?.data?.find((p) => p.uuid === uuid);
      return { data: item };
    },
    enabled: !!uuid,
  });
}
export function useEditPayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editPayment,
    onSuccess: () => queryClient.invalidateQueries(["pendings/all"]),
  });
}
