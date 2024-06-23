import instance from "~/services/customize-axios";

async function fetchId(url: string, id: number | null) {
  try {
    const { data } = await instance.get(`${url}${id}`);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default fetchId;
