import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { useQueryClient } from "@tanstack/react-query";
import Tippy from "@tippyjs/react/";
import "tippy.js/themes/light.css";

import { fetchId, fetchPost } from "~/Api/";
import { CookieUser } from "~/Hooks/UserToken";
import icon from "~/assets/img/icon";
import { Wrapper as PopperWrapper } from "~/components/Popper";
import { IComment } from "~/types/comment";
import { ITrack } from "~/types/track";
import { FetchDelete } from "~/Api/FetchPost";
// import Button from "~/components/Button";

function Comment() {
  const u = useContext(CookieUser);
  const { id } = useParams();
  const user = useContext(CookieUser);
  const [trackDetail, setTrackDetail] = useState<ITrack | null>(null);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState<IComment[] | []>([]);
  const [like, setLike] = useState<number[]>(() => {
    const saved = localStorage.getItem("likeTrack");
    return saved ? JSON.parse(saved) : [];
  });

  const [followedUsers, setFollowedUsers] = useState<number[]>(() => {
    const saved = localStorage.getItem("followedUsers");
    return saved ? JSON.parse(saved) : [];
  });

  const { mutate } = fetchPost();
  const { mutate: liked } = fetchPost();
  const { mutate: unLike } = FetchDelete();

  const { data: track } = fetchId("/tracks/getOneTrack/", Number(id));
  const { data: comments } = fetchId(
    "/comments/getAllCommentTrack/",
    Number(id),
  );
  const { data: countComment } = fetchId(
    "/comments/getCommentTrackCount/",
    Number(id),
  );
  const { data: countTrack } = fetchId("/tracks/getAllLikeTrack/", Number(id));
  const countLikeTrack = countTrack?.getAllLikeTrack;

  const handleLikeTrack = (user_id: number, track_id: number) => {
    const data = {
      track_id,
      user_id,
    };
    liked(
      { url: "/tracks/likeTrack", data },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["/tracks/getAllLikeTrack/"],
          });
          const updateLike = [...like, user_id, track_id];
          setLike(updateLike);
          localStorage.setItem("likeTrack", JSON.stringify(updateLike));
        },
      },
    );
  };

  const queryClient = useQueryClient();
  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    const user_id = user?.id;
    const track_id = trackDetail?.id;
    setTitle("");
    const data = {
      title,
      track_id: track_id,
      user_id: user_id,
    };
    mutate(
      { url: "/comments/postCommentTrack", data },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["/comments/getAllCommentTrack/"],
          });
          queryClient.invalidateQueries({
            queryKey: ["/comments/getCommentTrackCount/"],
          });
        },
      },
    );
  };

  const handleUnLike = (user_id: number, track_id: number) => {
    const data = {
      track_id,
      user_id,
    };
    unLike(
      { url: "/tracks/unLikeTrack/", data },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["/tracks/getAllLikeTrack/"],
          });
          const updateUnLike = like.filter((id) => id !== track_id);
          setLike(updateUnLike);
          localStorage.setItem("likeTrack", JSON.stringify(updateUnLike));
        },
      },
    );
  };

  // const u = useContext(CookieUser);

  const { mutate: followed } = fetchPost();
  const { mutate: unFollow } = FetchDelete();

  // const queryClient = useQueryClient();
  const handleFollow = (followerId: number, followingId: number) => {
    const data = { followerId, followingId };
    followed(
      { url: "/users/following", data },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["/users/getCountFollower/"],
          });
          const updatedFollowedUsers = [...followedUsers, followingId];
          setFollowedUsers(updatedFollowedUsers);
          localStorage.setItem(
            "followedUsers",
            JSON.stringify(updatedFollowedUsers),
          );
        },
      },
    );
  };

  const handleUnFollow = (followerId: number, followingId: number) => {
    const data = {
      followerId,
      followingId,
    };
    unFollow(
      { url: "/users/unFollow", data },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["/users/getCountFollower/"],
          });
          const updatedFollowedUsers = followedUsers.filter(
            (id) => id !== followingId,
          );
          setFollowedUsers(updatedFollowedUsers);
          localStorage.setItem(
            "followedUsers",
            JSON.stringify(updatedFollowedUsers),
          );
        },
      },
    );
  };

  const handleCopyLink = () => {
    const currentPath = document.location.href;
    navigator.clipboard.writeText(currentPath);
  };

  useEffect(() => {
    setComment(comments?.getAllCommentTrack);
  }, [comments]);

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
          <form onSubmit={handleComment}>
            <div className="flex">
              <input
                className="h-10 w-[714px] rounded-3xl border-none bg-[#f3f3f3] pl-4 pr-9 text-sm font-normal outline-none"
                type="text"
                name=""
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
              {like.includes(Number(trackDetail?.id)) ? (
                <button
                  onClick={() =>
                    handleUnLike(Number(u?.id), Number(trackDetail?.id))
                  }
                  className="flex items-center gap-2 rounded border border-[#e5e5e5] py-[2px] pl-[10px] pr-3 text-sm text-[#f50]"
                >
                  <img src={icon.heartLike} alt="" />
                  <span>Liked</span>
                </button>
              ) : (
                <button
                  onClick={() =>
                    handleLikeTrack(Number(u?.id), Number(trackDetail?.id))
                  }
                  className="flex items-center gap-2 rounded border border-[#e5e5e5] py-[2px] pl-[10px] pr-3 text-sm text-[#333]"
                >
                  <img src={icon.heart} alt="" />
                  <span>Liked</span>
                </button>
              )}

              <button className="flex items-center gap-2 rounded border border-[#e5e5e5] py-[2px] pl-[10px] pr-3 text-sm text-[#333]">
                <img src={icon.share} alt="" />
                <span>Share</span>
              </button>
              <button className="flex items-center gap-2 rounded border border-[#e5e5e5] py-[2px] pl-[10px] pr-3 text-sm text-[#333]">
                <img src={icon.repost} alt="" />
                <span>Repost</span>
              </button>
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-2 rounded border border-[#e5e5e5] py-[2px] pl-[10px] pr-3 text-sm text-[#333]"
              >
                <img src={icon.cpLink} alt="" />
                <span>Copy Link</span>
              </button>
              <button className="flex items-center gap-2 rounded border border-[#e5e5e5] py-[2px] pl-[10px] pr-3 text-sm text-[#333]">
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
                <span>{countLikeTrack}</span>
              </li>
              <li className="flex items-center gap-1 text-xs text-[#999]">
                <img src={icon.comment} alt="" />
                <span>{countComment?.amountCommentTrack}</span>
              </li>
            </ul>
          </div>
        </PopperWrapper>
      </article>

      <article className="flex gap-8">
        {u?.id === trackDetail?.userData?.id ? (
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
          </div>
        ) : (
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
              {followedUsers.includes(Number(trackDetail?.userData?.id)) ? (
                <button
                  type="submit"
                  onClick={() =>
                    handleUnFollow(
                      Number(u?.id),
                      Number(trackDetail?.userData?.id),
                    )
                  }
                  className="flex items-center gap-2 rounded-[4px] border border-[#f50] py-[2px] pl-[10px] pr-2 text-xs text-[#f50]"
                >
                  <img src={icon.followSuccess} alt="" />
                  Following
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={() =>
                    handleFollow(
                      Number(u?.id),
                      Number(trackDetail?.userData?.id),
                    )
                  }
                  className="flex items-center gap-2 rounded-[4px] border border-[#e5e5e5] py-[2px] pl-[10px] pr-2 text-xs"
                >
                  <img src={icon.userPlus} alt="" />
                  Follow
                </button>
              )}
            </div>
          </div>
        )}
        <div className="w-full">
          <div className="mb-6 line-clamp-5">
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
                  <span>{countComment?.amountCommentTrack} comment</span>
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
            <div>
              {comment &&
                comment.map((cmt) => (
                  <div className="flex w-full gap-3 pr-2.5 pt-5" key={cmt.id}>
                    <Link to={"/profile/" + cmt.userData.id}>
                      <Tippy
                        theme="light"
                        className="h-[200px] w-[150px] rounded shadow-custom"
                        content={
                          <div className="flex items-center justify-center">
                            <div className="flex h-full flex-col items-center gap-3 p-2.5">
                              <div>
                                <img
                                  className="h-20 w-20 rounded-full"
                                  src={cmt.userData.image}
                                  alt=""
                                />
                              </div>
                              <div>
                                <span className="text-sm text-[#333]">
                                  {cmt.userData.username}
                                </span>
                              </div>
                              <div>
                                <button
                                  type="submit"
                                  onClick={() =>
                                    handleFollow(
                                      Number(u?.id),
                                      Number(trackDetail?.userData?.id),
                                    )
                                  }
                                  className="flex items-center gap-2 rounded-[4px] border border-[#e5e5e5] bg-[#f50] py-[2px] pl-[10px] pr-2 text-xs text-white"
                                >
                                  <img src={icon.userPlusW} alt="" />
                                  <span>Follow</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        }
                      >
                        <div>
                          <img
                            className="h-10 w-10 rounded-full"
                            src={cmt.userData.image}
                            alt="avatar user"
                          />
                        </div>
                      </Tippy>
                    </Link>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex w-full flex-col gap-1 text-sm text-black">
                        <div className="flex items-center gap-4">
                          <Link to={"/profile/" + cmt.userData.id}>
                            <span className="font-semibold">
                              {cmt.userData.username}
                            </span>
                          </Link>
                          <span className="text-xs text-[#666]">
                            {moment(cmt.createdAt).fromNow()}
                          </span>
                        </div>
                        <div className="mb-1 w-full">
                          <p>{cmt.title}</p>
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
                ))}
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}

export default Comment;
