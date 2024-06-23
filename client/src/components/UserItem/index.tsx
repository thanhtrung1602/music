import icon from "~/assets/img/icon";
function UserItem() {
  return (
    <div className="mt-3 flex items-center">
      <div className="max-w-[65px] flex-1">
        <div className="h-[50px] w-[50px]">
          <img
            className="h-full w-full rounded-full object-cover"
            src="https://i1.sndcdn.com/avatars-PFJfACORNI81gMkB-ka5qdw-t120x120.jpg"
            alt=""
          />
        </div>
      </div>
      <div className="flex max-w-52 flex-1 flex-col">
        <div>
          <h3 className="text-[#333]">PhongKhin</h3>
        </div>
        <div className="flex items-center gap-2">
          <p className="flex items-center gap-1">
            <img
              className="h-[12px] w-[16px]"
              src={icon.followBlur}
              alt="follow"
            />
            <span className="text-xs text-[#999]">36.7k</span>
          </p>
          <p className="flex items-center gap-1">
            <img className="h-[12px] w-[16px]" src={icon.track} alt="track" />
            <span className="text-xs text-[#999]">149</span>
          </p>
        </div>
      </div>
      <div className="mb-[2px] mt-auto flex flex-1 justify-end">
        <button
          type="submit"
          className="flex items-center gap-2 rounded-[4px] border border-[#e5e5e5] py-[2px] pl-[10px] pr-2 text-xs"
        >
          <img src={icon.userPlus} alt="" />
          Follow
        </button>
      </div>
    </div>
  );
}

export default UserItem;
