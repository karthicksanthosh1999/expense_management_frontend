import { useMutation } from "@tanstack/react-query";
import { TTransactionValidationSchemaType } from "../schema/transactionSchema";
import api from "@/lib/axiosInstance";

export const useCreateTransactionHook = () => {
  return useMutation({
    mutationFn: createTransaction,
  });
};

const createTransaction = async (
  formData: TTransactionValidationSchemaType,
) => {
  const { data } = await api.post(`/api/expense/create`, formData);
  return data;
};
