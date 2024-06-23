import instance from "~/services/customize-axios";
async function fetchAll(url: string) {
  try {
    const { data } = await instance.get(url);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default fetchAll;
