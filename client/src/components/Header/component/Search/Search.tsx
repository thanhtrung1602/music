import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ISearch, ISearchProps } from "~/types/search";
import instance from "~/services/customize-axios";
import { ITrack } from "~/types/track";
import { User } from "~/types/user";
function Search(props: ISearchProps) {
  const [key, setKey] = useState("");
  const [hidenSearch, setHidenSearch] = useState(false);
  const [search, setSearch] = useState<ISearch>();

  useEffect(() => {
    instance
      .get(`/tracks/search`, {
        params: {
          query: key,
        },
      })
      .then((result) => {
        setSearch(result.data);
      });
  }, [key]);

  return (
    <>
      <form className="relative w-full rounded bg-[#e5e5e5]">
        <input
          type="text"
          value={key}
          onChange={(e) => {
            setKey(e.target.value);
            setHidenSearch(true);
          }}
          className="h-7 w-[355px] rounded bg-[#e5e5e5] p-2 text-[#666] outline-none"
          placeholder="Search"
          name=""
          id=""
        />
        <button type="submit" className="px-2 text-[#111]">
          <FontAwesomeIcon icon={props.search} />
        </button>
      </form>
      <div className="absolute left-auto top-11 w-[385px] bg-slate-950">
        {hidenSearch && (
          <ul className="text-[#ccc]">
            <li className="bg-[#333] p-[6px]">Search for "{key}"</li>
            {search?.users.map((user: User) => (
              <li
                className="cursor-pointer p-[6px] hover:bg-[#333]"
                key={user.id}
              >
                <a href="" className="flex items-center">
                  <img
                    className="mr-3 w-6"
                    src={
                      user.image ||
                      "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
                    }
                    alt=""
                  />
                  {user.username}
                </a>
              </li>
            ))}
            {search?.tracks.map((track: ITrack) => (
              <li
                className="cursor-pointer items-center p-[6px] hover:bg-[#333]"
                key={track.id}
              >
                <a href="" className="flex items-center">
                  <img
                    className="mr-3 w-6"
                    src={
                      track.userData?.image ||
                      "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
                    }
                    alt=""
                  />
                  {track.track_name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Search;
