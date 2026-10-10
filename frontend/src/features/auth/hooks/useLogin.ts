import { useMutation } from "@tanstack/react-query";
import { login } from "../service/auth.service";
import { saveAccessToken } from "../service/token.service";

export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: (res) => {
      saveAccessToken(res.accessToken);
    },
  });
};
