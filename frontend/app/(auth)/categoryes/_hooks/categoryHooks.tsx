import { ICategoryTypes } from "@/app/(types)/categoryTypes";
import api from "@/lib/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetAllCategories = () =>
  useQuery({
    queryFn: fetchCategories,
    queryKey: ["fetch_category"],
  });

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetch_category"] });
      toast.success("Category created Successfully", {
        id: "category",
      });
    },
    onError: () => {
      toast.error("Category Creation Failed", {
        id: "category",
      });
    },
  });
};

const fetchCategories = async (): Promise<ICategoryTypes[]> => {
  const { data } = await api.get("/api/category/getAll");
  return data.data;
};

const createCategory = async (
  category: ICategoryTypes,
): Promise<ICategoryTypes> => {
  const { data } = await api.post(`/api/category/create`, category);
  return data?.data;
};
