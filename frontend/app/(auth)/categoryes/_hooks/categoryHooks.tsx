import { ICartCategoryFilterType, ICategoryTypes } from "@/app/(types)/categoryTypes";
import api from "@/lib/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type FilterParams = {
  startDate?: Date | null
  endDate?: Date | null
}
export const useGetAllCategories = () =>
  useQuery({
    queryFn: fetchCategories,
    queryKey: ["fetch_category"],
  });


export const useCategoryFilterHook = () => {
  return useMutation({
    mutationFn: filterApi,
    onError: (err) => {
      console.log(err)
    },
  })
}

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

export const useCategoryDeleteMutationHook = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetch_category'] })
      toast.success("Category Deleted Successfully", { id: "delete_category" })
    },
    onError: () => {
      toast.error("Category Not Deleted", { id: "delete_category" })
    }
  })
}

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

const filterApi = async ({ startDate, endDate }: FilterParams): Promise<ICartCategoryFilterType[]> => {
  const { data } = await api.post(`/api/category/filter`, {
    startDate,
    endDate,
  });

  return data?.data;
};

const deleteApi = async (id: string): Promise<ICategoryTypes> => {
  const { data } = await api.delete(`/api/category/delete`, id);
  return data?.data
}
