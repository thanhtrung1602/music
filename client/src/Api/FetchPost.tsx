import instance from "~/services/customize-axios";
import { useMutation } from "@tanstack/react-query";

function FetchPost() {
  return useMutation({
    mutationFn: ({ url, data }: { url: string; data: object }) =>
      instance.post(url, data),
  });
}

export function FetchDelete() {
  return useMutation({
    mutationFn: ({ url, data }: { url: string; data: object }) =>
      instance.delete(url, { data }),
  });
}

export default FetchPost;
