import instance from "~/services/customize-axios";
async function fetchGenre() {
  const { data } = await instance.get("/tracks/getGenre");
  return data.getGenre;
}

export default fetchGenre;
