// import { useEffect, useState } from "react";
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
  console.log(1);
  const {
    data: genres,
    isLoading: loading,
    error: err,
  } = fetchAll("/tracks/getGenre");

  if (loading) return <div>Loading...</div>;
  if (err) return <div>Error: {err.message}</div>;

  return (
    <>
      <div className="w-full">
        {genres &&
          genres?.getGenre.map((genre: Genre) => (
            <div key={genre.id}>
              <h2 className="mb-3 text-2xl font-bold">{genre.title}</h2>
              <Product id={genre.id} />
            </div>
          ))}
      </div>
    </>
  );
}

function Product(props: { id: number }) {
  const { data: track } = fetchId("/tracks/getTrackGenre/", props.id);

  const shuffleTrack: ITrack[] | undefined = Shuffle(track?.getTrackGenre);

  return (
    <div className="grid w-full grid-cols-4 gap-5 border-b border-[#f2f2f2]">
      {shuffleTrack.slice(0, 4).map((track) => (
        <div key={track.id} className="mb-8 w-[174px]">
          <Link to={`/detail/${track.id}`}>
            <div className="h-[174px] w-full">
              <img
                className="h-full w-full object-cover"
                src={track.image}
                alt={track.track_name}
              />
            </div>
            <div className="w-full">
              <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm text-[#333]">
                {track.track_name}
              </p>
              <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-xs text-[#999]">
                {track.userData?.username}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Home;
