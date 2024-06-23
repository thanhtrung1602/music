import instance from "~/services/customize-axios";
import { useMutation } from "@tanstack/react-query";

function FetchPost() {
  return useMutation({
    mutationFn: ({ url, data }: { url: string; data: object }) =>
      instance.post(url, data),
  });
}

export default FetchPost;
