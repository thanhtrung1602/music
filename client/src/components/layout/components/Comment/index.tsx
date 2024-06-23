import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchId } from "~/Api/";
import { CookieUser } from "~/Hooks/UserToken";
import icon from "~/assets/img/icon";
import { Wrapper as PopperWrapper } from "~/components/Popper";
import { ITrack } from "~/types/track";

function Comment() {
  const [trackDetail, setTrackDetail] = useState<ITrack | null>(null);
  const params = useParams();
  const user = useContext(CookieUser);

  const { data: track } = useQuery({
    queryKey: ["track", Number(params.id)],
    queryFn: () => fetchId("/tracks/getOneTrack/", Number(params.id)),
  });

  useEffect(() => {
    setTrackDetail(track?.getOneTrack);
  }, [track]);

  const paragraphs: string[] | undefined = trackDetail?.description
    ? trackDetail.description.split("\n")
    : undefined;

  return (
    <section className="float-left border-r border-[#f2f2f2] pr-[30px]">
      <article className="mb-[10px] flex">
        <div>
          <img
            className="h-10 w-10 rounded-full"
            src={
              user?.image ||
              "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
            }
            alt=""
          />
        </div>
        <div className="ml-2">
          <form>
            <div className="flex">
              <input
                className="h-10 w-[714px] rounded-3xl border-none bg-[#f3f3f3] pl-4 pr-9 text-sm font-normal outline-none"
                type="text"
                name=""
                id=""
                placeholder="Write a comment"
              />
              <div className="ml-4">
                <button className="relative h-10 w-10 rounded-full border border-[#cbcaca] bg-white">
                  <img
                    className="absolute left-1/2 top-1/2 -translate-x-2/4 -translate-y-1/2 opacity-50"
                    src={icon.send}
                    alt="send"
                  />
                </button>
              </div>
            </div>
          </form>
        </div>
      </article>

      <article className="mb-5 border-b border-[#f2f2f2] pb-2">
        <PopperWrapper>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <button className="flex h-[26px] items-center gap-2 rounded border border-[#e5e5e5] py-[2px] pl-[10px] pr-3 text-sm text-[#333]">
                <img src={icon.heart} alt="" />
                <span>Liked</span>
              </button>
              <button className="flex h-[26px] items-center gap-2 rounded border border-[#e5e5e5] py-[2px] pl-[10px] pr-3 text-sm text-[#333]">
                <img src={icon.share} alt="" />
                <span>Share</span>
              </button>
              <button className="flex h-[26px] items-center gap-2 rounded border border-[#e5e5e5] py-[2px] pl-[10px] pr-3 text-sm text-[#333]">
                <img src={icon.repost} alt="" />
                <span>Repost</span>
              </button>
              <button className="flex h-[26px] items-center gap-2 rounded border border-[#e5e5e5] py-[2px] pl-[10px] pr-3 text-sm text-[#333]">
                <img src={icon.cpLink} alt="" />
                <span>Copy Link</span>
              </button>
              <button className="flex h-[26px] items-center gap-2 rounded border border-[#e5e5e5] py-[2px] pl-[10px] pr-3 text-sm text-[#333]">
                <img src={icon.bardPlus} alt="" />
                <span>Add to Playlist</span>
              </button>
            </div>
            <ul className="flex items-center gap-3">
              <li className="flex items-center gap-1 text-xs text-[#999]">
                <img src={icon.play} alt="listening" />
                <span>572k</span>
              </li>
              <li className="flex items-center gap-1 text-xs text-[#999]">
                <img className="opacity-50" src={icon.heart} alt="Liked" />
                <span>3,910</span>
              </li>
              <li className="flex items-center gap-1 text-xs text-[#999]">
                <img src={icon.comment} alt="" />
                <span>48</span>
              </li>
            </ul>
          </div>
        </PopperWrapper>
      </article>

      <article className="flex gap-8">
        <div className="flex w-[148px] flex-col gap-2">
          <img
            className="h-[120px] w-[120px] rounded-full"
            src={trackDetail?.userData?.image}
            alt="avatar user"
          />
          <div className="flex flex-col gap-1">
            <div className="text-sm text-[#333]">
              <h3>{trackDetail?.userData?.username}</h3>
            </div>
            <div className="flex items-center gap-3">
              <p className="flex items-center gap-1 text-xs text-[#999]">
                <img className="h-3 w-4" src={icon.follow} alt="" />
                <span>45.4k</span>
              </p>
              <p className="flex items-center gap-1 text-xs text-[#999]">
                <img className="h-3 w-4" src={icon.track} alt="" />
                <span>18</span>
              </p>
            </div>
          </div>
          <div>
            <button className="flex items-center gap-1 rounded border border-[#f50] bg-[#f50] py-[2px] pl-2 pr-2.5 text-xs text-white">
              <img src={icon.userPlusW} alt="" />
              <span>Follow</span>
            </button>
          </div>
        </div>
        <div className="w-full">
          <div className="mb-6">
            {paragraphs
              ? paragraphs.map((paragraph, index) => (
                  <p className="my-2" key={index}>
                    {paragraph}
                  </p>
                ))
              : null}
          </div>
          <div>
            <div className="border-b border-[#f2f2f2] pb-2">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-1">
                  <img
                    className="h-[21px] w-[21px]"
                    src={icon.comment}
                    alt=""
                  />
                  <span>8 comment</span>
                </h3>
                <div className="flex h-8 w-[182px] items-center gap-2 rounded border border-[#f50] pl-[10px] text-sm text-[#f50]">
                  <span>Sorted by:</span>
                  <select className="outline-none" name="" id="">
                    <option value="">Newest</option>
                    <option value="">Oldest</option>
                    <option value="">TrackTime</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex w-full gap-3 pr-2.5 pt-5">
              <div>
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://i1.sndcdn.com/avatars-zyBG7laYIsd5hwXi-MqG3ig-t120x120.jpg"
                  alt="avatar user"
                />
              </div>
              <div className="flex w-full items-center justify-between">
                <div className="flex w-full flex-col gap-1 text-sm text-black">
                  <div className="flex items-center gap-4">
                    <span className="font-semibold">cngan</span>
                    <span className="text-xs text-[#666]">28 days ago</span>
                  </div>
                  <div className="mb-1 w-full">
                    <p>Loại người Toxic nhỉ nhỉi</p>
                  </div>
                  <div>
                    <span className="font-medium">Reply</span>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <FontAwesomeIcon className="h-5 w-5" icon={faHeart} />
                  <span className="text-xs">0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}

export default Comment;
