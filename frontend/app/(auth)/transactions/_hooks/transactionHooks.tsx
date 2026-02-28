import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TTransactionFilterValidationSchemaType, TTransactionValidationSchemaType } from "../schema/transactionSchema";
import api from "@/lib/axiosInstance";
import { toast } from "sonner";
import { ITransactionsResponseType } from "@/app/(types)/transactionsTypes";

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
  return useMutation<ITransactionsResponseType[], Error, TTransactionFilterValidationSchemaType>({
    mutationFn: filterTransaction,
    onError: () => {
      toast.error("Something went wrong");
    },
  });
};

export const useGetSingleTransactionsHook = (id: string) => {
  return useQuery<ITransactionsResponseType, Error>({
    queryKey: ["transaction", id],
    queryFn: () => getSingleTransactions(id!),
    enabled: !!id,
  });
};

export const useGetCurrentAmountHook = () => {
  return useQuery({
    queryKey: ["transaction"],
    queryFn: () => getCurrentAmount(),

  });
};

export const useDeleteTransactionHook = () => {
  const queryClient = useQueryClient();
  return useMutation<ITransactionsResponseType, Error, string>({
    mutationFn: deleteSingleTransactions,
    onSuccess: () => {
      toast.success("Transaction Deleted Successfully")
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: () => {
      toast.success("Something Went Wrong")
    }
  })
}


const createTransaction = async (
  formData: TTransactionValidationSchemaType,
) => {
  const { data } = await api.post(`/api/expense/create`, formData);
  return data;
};

const filterTransaction = async (
  formData: TTransactionFilterValidationSchemaType,
) => {
  const { data } = await api.post(`/api/expense/getAll`, formData);
  return data?.data;
};

export const getSingleTransactions = async (id: string) => {
  const { data } = await api.get(`/api/expense/getSingle/${id}`);
  return data?.data
}

export const deleteSingleTransactions = async (id: string) => {
  const { data } = await api.delete(`/api/expense/delete/${id}`);
  return data?.data
}

export const getCurrentAmount = async () => {
  const { data } = await api.get(`/api/expense/currentAmount`);
  return data?.data
}