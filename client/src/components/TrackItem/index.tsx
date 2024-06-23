import icon from "~/assets/img/icon";

function TrackItem() {
  return (
    <div className="mt-3 flex items-center">
      <div className="">
        <div className="h-[65px] w-[65px] px-[6px] py-[5px]">
          <img
            className="h-full w-full object-cover"
            src="https://i1.sndcdn.com/artworks-XxgG3bzIXzbZrHMP-ygWNGQ-t120x120.jpg"
            alt=""
          />
        </div>
      </div>
      <div className="ml-2 w-[250px]">
        <div className="text-sm text-[#999]">
          <span>MCK</span>
        </div>
        <div className="m-[2px] text-sm text-[#333]">
          <p className="w-full truncate">
            tặng em 1 cây son để em tô hồng duyên
          </p>
        </div>
        <ul className="flex flex-wrap gap-2 text-[12px] text-[#999]">
          <li className="flex items-center gap-[2px]">
            <img className="" src={icon.play} alt="" />
            <span>1M</span>
          </li>
          <li className="flex items-center gap-[2px]">
            <img className="opacity-50" src={icon.heart} alt="" />
            <span>9,412</span>
          </li>
          <li className="flex items-center gap-[2px]">
            <img className="" src={icon.comment} alt="" />
            <span>161</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default TrackItem;
