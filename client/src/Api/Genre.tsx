import instance from "~/services/customize-axios";
async function fetchGenre() {
  const { data } = await instance.get("");
  return data;
}

export default fetchGenre;
