import icon from "~/assets/img/icon";
import TrackItem from "~/components/TrackItem";
import TitleItem from "~/components/TitleItem";
function SlideBarDetail() {
  return (
    <div className="float-right w-[350px] pl-7">
      <TitleItem
        icon={icon.track}
        title_left={"Related tracks"}
        title_right={"View all"}
      />
      <TrackItem />
    </div>
  );
}

export default SlideBarDetail;
