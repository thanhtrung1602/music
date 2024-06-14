import { useMutation } from "@tanstack/react-query";
import instance from "~/services/customize-axios";

function useFetchLogin() {
  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      instance.post("/auth/login", data, {
        withCredentials: true,
      }),
  });
}

export default useFetchLogin;
