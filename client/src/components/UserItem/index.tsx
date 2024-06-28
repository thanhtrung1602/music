import { useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAll, fetchId, fetchPost } from "~/Api";
import { FetchDelete } from "~/Api/FetchPost";
import { CookieUser } from "~/Hooks/UserToken";
import icon from "~/assets/img/icon";
// import { Shuffle } from "~/logic";
import { IUser } from "~/types/users";

function UserItem() {
  const [followedUsers, setFollowedUsers] = useState<number[]>(() => {
    const saved = localStorage.getItem("followedUsers");
    return saved ? JSON.parse(saved) : [];
  });

  const u = useContext(CookieUser);
  const { data: users } = fetchAll("/users/getAllUser");
  const { mutate: followed } = fetchPost();
  const { mutate: unFollow } = FetchDelete();

  const queryClient = useQueryClient();
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

  const shuffleUser: IUser[] | undefined = users?.usersWithoutPassword;

  return (
    <div>
      {shuffleUser &&
        shuffleUser.slice(0, 3).map(
          (user: IUser) =>
            u?.id !== user.id && (
              <div className="mt-3 flex items-center">
                <div className="max-w-[65px] flex-1">
                  <div className="h-[50px] w-[50px]">
                    <img
                      className="h-full w-full rounded-full object-cover"
                      src={user.image}
                      alt=""
                    />
                  </div>
                </div>
                <Link to={"/profile/" + user.id} key={user.id}>
                  <div className="flex max-w-52 flex-1 flex-col">
                    <div>
                      <h3 className="text-[#333]">{user.username}</h3>
                    </div>
                    <MiniStart id={user.id} />
                  </div>
                </Link>
                <div className="mb-[2px] mt-auto flex flex-1 justify-end">
                  {followedUsers.includes(user.id) ? (
                    <button
                      type="submit"
                      onClick={() => handleUnFollow(Number(u?.id), user.id)}
                      className="flex items-center gap-2 rounded-[4px] border border-[#f50] py-[2px] pl-[10px] pr-2 text-xs text-[#f50]"
                    >
                      <img src={icon.followSuccess} alt="" />
                      Following
                    </button>
                  ) : (
                    <button
                      type="submit"
                      onClick={() => handleFollow(Number(u?.id), user.id)}
                      className="flex items-center gap-2 rounded-[4px] border border-[#e5e5e5] py-[2px] pl-[10px] pr-2 text-xs"
                    >
                      <img src={icon.userPlus} alt="" />
                      Follow
                    </button>
                  )}
                </div>
              </div>
            ),
        )}
    </div>
  );
}

function MiniStart(props: { id: number }) {
  const { data: userFollow } = fetchId("/users/getCountFollower/", props.id);
  const { data: track } = fetchId("/tracks/getTrackCount/", props.id);
  const trackCount = track?.amountTrack;
  const followerCount = userFollow?.follower;
  return (
    <div className="flex items-center gap-2">
      <p className="flex items-center gap-1">
        <img className="h-[12px] w-[16px]" src={icon.followBlur} alt="follow" />
        <span className="text-xs text-[#999]">{followerCount}</span>
      </p>
      <p className="flex items-center gap-1">
        <img className="h-[12px] w-[16px]" src={icon.track} alt="track" />
        <span className="text-xs text-[#999]">{trackCount}</span>
      </p>
    </div>
  );
}

export default UserItem;
