import instance from "~/services/customize-axios";
import { useMutation } from "@tanstack/react-query";

interface MutationArgs {
  url: string;
  data: object;
}

function FetchPost() {
  return useMutation({
    mutationFn: ({ url, data }: MutationArgs) =>
      instance.post(url, data).then((response) => response.data),
  });
}

export function FetchDelete() {
  return useMutation({
    mutationFn: ({ url, data }: { url: string; data: object }) =>
      instance.delete(url, { data }),
  });
}

export default FetchPost;
