import { useMutation } from "@tanstack/react-query";
import { login as loginRequest } from "../service/auth.service";
import { useAuth } from "../context/AuthContext";

interface LoginResponse {
  accessToken: string;
}

export const useLogin = () => {
  const auth = useAuth();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: {
      email: string;
      password: string;
    }) => {
      return (await loginRequest(data)) as LoginResponse;
    },
    onSuccess: (response) => {
      auth.login(response.accessToken);
    },
  });
};