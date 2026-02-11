import api from "@/lib/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { TUserValidationSchemaType } from "../schema/loginValidationSchema";
import { useRouter } from "next/navigation";

export const useLoginHook = () => {
  const queryClient = useQueryClient();
  const navigation = useRouter();
  return useMutation({
    mutationFn: async (user: TUserValidationSchemaType) => {
      const { data } = await api.post("/api/auth/login", user);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["login"], exact: false });
      navigation.push("/dashboard");
      toast.success("User Login Successfully 🎉", {
        id: "login_user",
      });
    },
    onError: () => {
      toast.error("Login Failed", {
        id: "login_user",
      });
    },
  });
};
