import instance from "~/services/customize-axios";
async function fetchCookie(url: string) {
  try {
    const response = await instance.get("/users/getUserToken");
    const cookie = response.data;
    const { data } = await instance.get(url, {
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });
    return { data };
  } catch (error) {
    throw new Error(`Error fetching data: ${error}`);
  }
}

export default fetchCookie;
