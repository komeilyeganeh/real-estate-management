import { useMutation } from "@tanstack/react-query";
import { login } from "../service/auth.service";

export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: login,
  });
};
