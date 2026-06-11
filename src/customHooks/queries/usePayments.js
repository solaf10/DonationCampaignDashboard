import { useQuery } from "@tanstack/react-query";
import { getPayments } from "../../services/payments";

export default function usePayments() {
  return useQuery({ queryKey: ["pending/store"], queryFn: getPayments });
}
