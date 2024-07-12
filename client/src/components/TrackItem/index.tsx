import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { fetchId } from "~/Api";
import { CookieUser } from "~/Hooks/UserToken";
import icon from "~/assets/img/icon";
// import { Shuffle } from "~/logic";
import { ITrack } from "~/types/track";

type Like = {
  id: number;
  trackData: ITrack;
};

function TrackItem() {
  const u = useContext(CookieUser);
  const { data: tracks } = fetchId("/tracks/getAllTrackLike/", Number(u?.id));
  const track: Like[] = tracks?.track;
  return (
    <div>
      {track &&
        track.slice(0, 3).map((t) => (
          <NavLink to={"/detail/" + t.trackData.id} key={t.id}>
            <div className="mt-3 flex items-center">
              <div className="">
                <div className="h-[65px] w-[65px] px-[6px] py-[5px]">
                  <img
                    className="h-full w-full object-cover"
                    src={t.trackData.image || t.trackData.userData?.image}
                    alt={t.trackData.track_name}
                  />
                </div>
              </div>
              <div className="ml-2 w-[250px]">
                <div className="text-sm text-[#999]">
                  <span>{t.trackData.userData?.username}</span>
                </div>
                <div className="m-[2px] text-sm text-[#333]">
                  <p className="w-full truncate">{t.trackData.track_name}</p>
                </div>
                <InfUser id={t.id} />
              </div>
            </div>
          </NavLink>
        ))}
    </div>
  );
}

function InfUser(props: { id: number }) {
  const { data: countComment } = fetchId(
    "/comments/getCommentTrackCount/",
    Number(props.id),
  );
  const { data: countTrack } = fetchId(
    "/tracks/getAllLikeTrack/",
    Number(props.id),
  );
  const countCommentTrack = countComment?.amountCommentTrack;
  const countLikeTrack = countTrack?.getAllLikeTrack;

  return (
    <ul className="flex flex-wrap gap-2 text-[12px] text-[#999]">
      <li className="flex items-center gap-[2px]">
        <img className="" src={icon.play} alt="" />
        <span>1M</span>
      </li>
      <li className="flex items-center gap-[2px]">
        <img className="opacity-50" src={icon.heart} alt="" />
        <span>{countLikeTrack}</span>
      </li>
      <li className="flex items-center gap-[2px]">
        <img className="" src={icon.comment} alt="" />
        <span>{countCommentTrack}</span>
      </li>
    </ul>
  );
}

export default TrackItem;
