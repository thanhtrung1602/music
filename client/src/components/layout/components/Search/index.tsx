import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HeadlessTippy from "@tippyjs/react/headless";
import { faUser, faMusic } from "@fortawesome/free-solid-svg-icons";

import { ISearch, ISearchProps } from "~/types/search";
import { ITrack } from "~/types/track";
import { User } from "~/types/user";
import { Wrapper as PopperWrapper } from "~/components/Popper";
import ResultSearch from "~/components/layout/components/ResultSearch";
import { fetchSearch } from "~/Api";
import { Link } from "react-router-dom";
function Search(props: ISearchProps) {
  const [key, setKey] = useState("");
  const [hiddenSearch, setHiddenSearch] = useState(false);
  const [search, setSearch] = useState<ISearch>();
  const { data, isLoading } = useQuery({
    queryKey: ["search", key],
    queryFn: () => fetchSearch(key),
  });

  useEffect(() => {
    setSearch(data);
    if (key === "") {
      setHiddenSearch(false);
    }
  }, [key, data]);

  return (
    <>
      <HeadlessTippy
        interactive
        visible={hiddenSearch}
        render={(attrs) => (
          <div className="mt-[-1px] w-[385px]" tabIndex={-1} {...attrs}>
            <PopperWrapper>
              {hiddenSearch && (
                <ul className="bg bg-slate-950 text-[#ccc]">
                  <li className="bg-[#333] p-[6px]">Search for "{key}"</li>
                  {isLoading && (
                    <li className="bg-[#333] p-[6px]">Loading...</li>
                  )}
                  {search?.users.map((user: User) => (
                    <li
                      className="cursor-pointer p-[6px] hover:bg-[#333]"
                      key={user.id}
                    >
                      <Link to={"/profile/" + user.id}>
                        <ResultSearch
                          id={user.id}
                          name={user.username}
                          image={user.image}
                          icon={faUser}
                        />
                      </Link>
                    </li>
                  ))}
                  {search?.tracks.map((track: ITrack) => (
                    <li
                      className="cursor-pointer p-[6px] hover:bg-[#333]"
                      key={track.id}
                    >
                      <Link to={"/detail/" + track.id}>
                        <ResultSearch
                          id={track.id}
                          name={track.track_name}
                          image={track.image}
                          icon={faMusic}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </PopperWrapper>
          </div>
        )}
        onClickOutside={() => setHiddenSearch(false)}
      >
        <form>
          <div className="w-full rounded bg-[#e5e5e5] transition delay-300 ease-in-out focus-within:bg-[#fff]">
            <input
              type="text"
              value={key}
              onChange={(e) => {
                setKey(e.target.value);
                setHiddenSearch(true);
              }}
              className="h-7 w-[355px] rounded bg-[#e5e5e5] p-2 text-[#666] outline-none transition delay-300 ease-in-out focus:bg-[#fff]"
              placeholder="Search for artists, tracks"
              name=""
              id=""
              onFocus={() =>
                key.length > 0 ? setHiddenSearch(true) : setHiddenSearch(false)
              }
            />
            <button type="submit" className="px-2 text-[#111]">
              <FontAwesomeIcon icon={props.search} />
            </button>
          </div>
        </form>
      </HeadlessTippy>
    </>
  );
}

export default memo(Search);
