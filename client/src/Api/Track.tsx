import instance from "~/services/customize-axios";
async function fetchTrack() {
  const { data } = await instance.get("/tracks/getAllTrack");
  return data;
}

export async function fetchTrackGenre(id: number | null) {
  const { data } = await instance.get(`/tracks/getTrackGenre/${id}`);
  return data.getTrackGenre;
}

export default fetchTrack;
