import instance from "~/services/customize-axios";
async function fetchCookie() {
  try {
    const response = await instance.get("/users/getUserToken");
    const cookie = response.data;
    const userResponse = await instance.get("/auth/log", {
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });
    return userResponse.data;
  } catch (error) {
    throw new Error(`Error fetching data: ${error}`);
  }
}

export default fetchCookie;
