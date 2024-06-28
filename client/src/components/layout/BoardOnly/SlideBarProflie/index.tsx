import icon from "~/assets/img/icon";
import TrackItem from "~/components/TrackItem";
import UserItem from "~/components/UserItem";
import TitleItem from "~/components/TitleItem";
import { useParams } from "react-router-dom";
import { fetchId } from "~/Api";
function SlideBarProfile() {
  const { id } = useParams();

  const countTrack = fetchId("/tracks/getTrackCount/", Number(id));
  const countFollower = fetchId("/users/getCountFollower/", Number(id));
  const countFollowing = fetchId("/users/getCountFollowing/", Number(id));

  const countTrackUser = countTrack.data?.amountTrack;
  const countFollowerUser = countFollower.data?.follower;
  const countFollowingUser = countFollowing.data?.following;

  return (
    <div className="float-right w-[350px] pl-5">
      <div className="mb-8 flex items-center">
        <div className="border-r border-[#f2f2f2] pr-[30px] text-[#999]">
          <h3 className="text-xs">Followers</h3>
          <span className="text-xl">{countFollowerUser}</span>
        </div>
        <div className="border-r border-[#f2f2f2] pl-[10px] pr-[30px] text-[#999]">
          <h3 className="text-xs">Following</h3>
          <span className="text-xl">{countFollowingUser}</span>
        </div>
        <div className="pl-[10px] text-[#999]">
          <h3 className="text-xs">Tracks</h3>
          <span className="text-xl">{countTrackUser}</span>
        </div>
      </div>
      <TitleItem
        icon={icon.followBlur}
        _icon={icon.refresh}
        title_left={"Artists you should follow"}
        title_right={"Refresh list"}
      />
      <UserItem />
      <TitleItem
        icon={icon.heartBlur}
        title_left={`${7} likes`}
        title_right={"View all"}
      />
      <TrackItem />
      <TitleItem
        icon={icon.calendar}
        title_left={"Listening history"}
        title_right={"View all"}
      />

      <TrackItem />
    </div>
  );
}

export default SlideBarProfile;
