import { ICartCategoryFilterType } from "@/app/(types)/categoryTypes";
import { IApiResponse, IGlobalDeleteType } from "@/app/(types)/constants";
import { IGoalType, IAddAmountType } from "@/app/(types)/goalTypes";
import api from "@/lib/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

type FilterParams = {
  startDate?: Date | null;
  endDate?: Date | null;
};

export const useGetAllGoals = () =>
  useQuery({
    queryFn: fetchGoals,
    queryKey: ["fetch_goals"],
  });

export const useCategoryFilterHook = () => {
  return useMutation({
    mutationFn: filterApi,
    onError: (err) => {
      console.log(err);
    },
  });
};

export const useCreateGoal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetch_goals"] });
      toast.success("Goal created Successfully", {
        id: "goal",
      });
    },
    onError: () => {
      toast.error("Goal Creation Failed", {
        id: "goal",
      });
    },
  });
};

export const useAddAmountHook = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IApiResponse<IGoalType>,
    AxiosError<IApiResponse<null>>,
    IAddAmountType
  >({
    mutationFn: addAmount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetch_goals"] });
      toast.success("Amount Added Successfully", {
        id: "goal",
      });
    },
    onError: () => {
      toast.error("Amount Couldn't Failed", {
        id: "goal",
      });
    },
  });
};

export const useGoalDeleteMutationHook = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IApiResponse<IGoalType>,
    AxiosError<IApiResponse<null>>,
    string
  >({
    mutationFn: deleteApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetch_goals"] });
      toast.success("Goal Deleted Successfully", { id: "delete_goals" });
    },
    onError: () => {
      toast.error("Goal Not Deleted", { id: "delete_goals" });
    },
  });
};

export const useGoalUpdateMutationHook = () => {
  const queryClient = useQueryClient()
  return useMutation<
    IApiResponse<IGoalType>,
    AxiosError<IApiResponse<null>>,
    <{string, IGoalType}>
  >(
    
  );
};

const fetchGoals = async (): Promise<IGoalType[]> => {
  const { data } = await api.get("/api/goal/getAll");
  return data.data;
};

const createGoal = async (goal: IGoalType): Promise<IGoalType> => {
  const { data } = await api.post(`/api/goal/create`, goal);
  return data?.data;
};

const filterApi = async ({
  startDate,
  endDate,
}: FilterParams): Promise<ICartCategoryFilterType[]> => {
  const { data } = await api.post(`/api/goal/filter`, {
    startDate,
    endDate,
  });

  return data?.data;
};

const deleteApi = async (id: string): Promise<IApiResponse<IGoalType>> => {
  const { data } = await api.delete(`/api/goal/delete/${id}`);
  return data?.data;
};

const updateApi = async (goal: IGoalType, id: string): Promise<IGoalType> => {
  const { data } = await api.put(`/api/goal/update/${id}`, goal);
  return data?.data;
};

const addAmount = async (
  payload: IAddAmountType,
): Promise<IApiResponse<IGoalType>> => {
  const { data } = await api.put(`/api/goal/amount`, payload);
  return data.data;
};
