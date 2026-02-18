import { useMutation } from "@tanstack/react-query";
import { TTransactionValidationSchemaType } from "../schema/transactionSchema";
import api from "@/lib/axiosInstance";
import { toast } from "sonner";

export const useCreateTransactionHook = () => {
  return useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      toast.success("Expense Created Successfully");
    },
    onError: (err) => {
      toast.error("Something went wrong");
    },
  });
};

export const useFilterTransactionHook = () => {
  return useMutation({
    mutationFn: filterTransaction,
    onError: (err) => {
      toast.error("Something went wrong");
    },
  });
};

const createTransaction = async (
  formData: TTransactionValidationSchemaType,
) => {
  const { data } = await api.post(`/api/expense/create`, formData);
  return data;
};
const filterTransaction = async (
  formData: TTransactionValidationSchemaType,
) => {
  const { data } = await api.post(`/api/expense/getAll`, formData);
  return data;
};
