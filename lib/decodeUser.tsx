import { toast } from "sonner";
import api from "./axiosInstance";
import { useRouter } from "next/router";

export const useDecodeUser = async () => {
  const navigate = useRouter();
  try {
    const {data} = await api.get("/api/auth/decode");
    return data.?data;
  } catch (error) {
    toast.error("Invalid User");
    navigate.push("/login");
  }
};
