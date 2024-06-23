import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAll } from "~/Api";
import { fetchId } from "~/Api";
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
    queryFn: () => fetchAll("/tracks/getGenre"),
  });

  const { data: track } = useQuery({
    queryKey: ["track", genreId],
    queryFn: () => fetchId("/tracks/getTrackGenre/", genreId),
  });

  const shuffleTrack: ITrack[] = Shuffle(track?.getTrackGenre);

  useEffect(() => {
    if (genres) {
      genres?.getGenre.map((genre: Genre) => {
        setGenre(genre);
        setGenreId(genre.id);
      });
    }
  }, [genres]);

  return (
    <>
      <div className="w-full">
        {genre && (
          <h2 className="mb-3" key={genre.id}>
            {genre.title}
          </h2>
        )}
        <div className="grid w-full grid-cols-4 gap-5">
          {shuffleTrack.slice(0, 4).map((track) => (
            <div key={track.id} className="w-[174px]">
              <Link to={`/detail/${track.id}`}>
                <div className="h-[174px] w-full">
                  <img
                    className="h-full w-full object-cover"
                    src={track.image}
                    alt={track.track_name}
                  />
                </div>
                <div className="w-full">
                  <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
                    {track.track_name}
                  </p>
                  <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
                    {track.userData?.username}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
