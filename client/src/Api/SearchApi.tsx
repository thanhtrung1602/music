import instance from "~/services/customize-axios";
async function fetchSearch(key: string) {
  const { data } = await instance.get(`/tracks/search`, {
    params: {
      query: key,
    },
  });
  return data;
}
export default fetchSearch;
