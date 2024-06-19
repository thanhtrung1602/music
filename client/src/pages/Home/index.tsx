import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchGenre } from "~/Api";
import { fetchTrackGenre } from "~/Api/Track";
import { Shuffle } from "~/logic";
import { ITrack } from "~/types/track";
type Genre = {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
};

function Home() {
  const [genre, setGenre] = useState<Genre | null>(null);
  const [genreId, setGenreId] = useState<number | null>(null);

  const { data: genres } = useQuery({
    queryKey: ["genre"],
    queryFn: () => fetchGenre(),
  });

  const { data: track } = useQuery({
    queryKey: ["track", genreId],
    queryFn: () => fetchTrackGenre(genreId),
  });

  const shuffleTrack: ITrack[] = Shuffle(track);

  useEffect(() => {
    if (genres) {
      genres.map((genre: Genre) => {
        setGenre(genre);
        setGenreId(genre.id);
      });
    }
  }, [genres]);

  return (
    <>
      <div className="">
        {genre && <h2 key={genre.id}>{genre.title}</h2>}
        <div className="grid w-full grid-cols-4">
          {shuffleTrack.slice(0, 4).map((track) => (
            <div className="w-[25%]">
              <div>
                <img className="" src={track.image} alt={track.track_name} />
              </div>
              <div>
                <p className="w-full">{track.track_name}</p>
                <p className="w-full">{track.userData?.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
