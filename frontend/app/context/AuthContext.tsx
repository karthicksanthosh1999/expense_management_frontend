"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";

interface IUser {
  id?: string;
  fullname: string;
  email: string;
  mobile: string;
  password: string;
  createdAt?: Date;
}

interface IAuthContextType {
  user: IUser | null;
  loading: boolean;
  setUser: (user: IUser | null) => void;
}

const AuthContext = createContext<IAuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await api.get("/api/auth/decode");
        setUser(userData?.data?.data);
        router.push('/')
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ loading, setUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
