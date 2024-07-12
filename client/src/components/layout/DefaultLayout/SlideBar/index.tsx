import icon from "~/assets/img/icon";
import TrackItem from "~/components/TrackItem";
import UserItem from "~/components/UserItem";
import TitleItem from "~/components/TitleItem";
function SlideBar() {
  return (
    <div className="float-right w-[350px] pl-7">
      <TitleItem
        icon={icon.followBlur}
        _icon={icon.refresh}
        title_left={"Artists you should follow"}
        title_right={"Refresh list"}
      />
      <UserItem />
      <TitleItem
        icon={icon.heartBlur}
        title_left={` likes`}
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

export default SlideBar;
