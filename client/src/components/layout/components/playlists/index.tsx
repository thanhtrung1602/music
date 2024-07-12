import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost } from "~/Api";
import { CookieUser } from "~/Hooks/UserToken";
import { togglePlaylist } from "~/Redux/actions";
import instance from "~/services/customize-axios";
import { ITrack } from "~/types/track";
import { toast } from "react-hot-toast";
function Playlist() {
  const u = useContext(CookieUser);
  const [trackDetail, setTrackDetail] = useState<ITrack | null>(null);
  const { trackId } = useSelector((state: { trackId: number }) => state);
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const { mutate: createPlaylist } = fetchPost();
  const { mutate: addPlaylist } = fetchPost();

  useEffect(() => {
    instance.get(`/tracks/getOneTrack/${trackId}`).then((res) => {
      setTrackDetail(res.data.getOneTrack);
    });
  }, [trackId]);

  const handleHidePlaylist = () => {
    dispatch(togglePlaylist(Number(trackDetail)));
  };

  const handleSubmitPlaylist = (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const create = {
        playlist_name: title,
        image: trackDetail?.image,
        user_id: u?.id,
      };
      createPlaylist(
        {
          url: "/tracks/createPlaylist",
          data: create,
        },
        {
          onSuccess: (resId) => {
            if (resId && resId.createPlaylist && resId.createPlaylist.id) {
              const playlistId = resId.createPlaylist.id;
              const add = {
                playlist_id: playlistId,
                track_id: trackDetail?.id,
              };
              addPlaylist(
                {
                  url: "/tracks/addPlaylist",
                  data: add,
                },
                {
                  onSuccess: () => {
                    toast.success("Add Playlist successful");
                    dispatch(togglePlaylist(Number(trackDetail?.id)));
                  },
                },
              );
            } else {
              console.error("Invalid response structure", resId);
            }
          },
        },
      );
    } catch (error) {
      console.error("Error creating and adding playlist:", error);
    }
  };

  return (
    <div className="w-[550px] bg-white shadow-custom">
      <div className="p-[25px]">
        <div className="flex items-center justify-end">
          <button onClick={handleHidePlaylist}>
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>
        <ul className="border-b pb-2 text-2xl text-[#333]">
          <li></li>
          <li>Create a Playlist</li>
        </ul>
        <div className="pt-[25px]">
          <form onSubmit={handleSubmitPlaylist}>
            <div className="flex flex-col">
              <label className="text-xs text-[#333]" htmlFor="idPlaylist">
                Playlist title *
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="my-2 rounded border border-[#ccc] px-2 py-[2px] outline-none"
                type="text"
                name=""
                id="idPlaylist"
              />
            </div>
            <div className="mt-2 flex items-center justify-end">
              <button className="rounded border border-[#f50] bg-[#f50] py-0.5 pl-2.5 pr-3 text-white">
                Save
              </button>
            </div>
          </form>
        </div>
        <div className="mt-8 border">
          {trackDetail && (
            <div className="flex items-center justify-between border-b pb-1 pl-[5px]">
              <div className="flex w-full items-center">
                <div className="mr-[5px] mt-[5px]">
                  <img className="h-5 w-5" src={trackDetail.image} alt="" />
                </div>
                <div className="mt-[5px] flex items-center text-xs text-[#f50]">
                  <span className="mr-[3px]">
                    {trackDetail.userData?.username} -
                  </span>
                  <span>{trackDetail.track_name}</span>
                </div>
              </div>
              <div className="mr-[5px] mt-[5px]">
                <FontAwesomeIcon className="opacity-50" icon={faClose} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Playlist;
