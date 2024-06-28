import { useContext, useEffect, useRef, useState } from "react";
import { FastAverageColor } from "fast-average-color";
import { useParams } from "react-router-dom";

import { CookieUser } from "~/Hooks/UserToken";
import icon from "~/assets/img/icon";
import { Wrapper as PopperWrapper } from "~/components/Popper";
import { fetchId } from "~/Api";
import { IUser } from "~/types/users";

const titles = [
  { id: 1, name: "All" },
  { id: 2, name: "Popular tracks" },
  { id: 3, name: "Tracks" },
  { id: 4, name: "Playlists" },
  { id: 5, name: "Reposts" },
];

function Profile() {
  const u = useContext(CookieUser);
  const { id } = useParams();
  const imgRef = useRef(null);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [user, setUser] = useState<IUser | null>(null);

  const { data: users } = fetchId("/users/getUserDetail/", Number(id));

  useEffect(() => {
    setUser(users?.getUserDetail);
  }, [users]);

  useEffect(() => {
    const img = imgRef.current;
    if (img) {
      const fac = new FastAverageColor();
      const proxyUrl = `${user?.image}`;

      const image = new Image();
      image.crossOrigin = "Anonymous";
      image.src = proxyUrl;
      image.onload = () => {
        fac
          .getColorAsync(image)
          .then((color) => {
            setBgColor(color.hex);
          })
          .catch((e) => {
            console.error(e);
          });
      };
      image.onerror = (e) => {
        console.error("Image loading error:", e);
      };
    }
  }, [user]);

  return (
    <div>
      <div className="h-[260px] border">
        <PopperWrapper>
          <div
            className="flex h-full flex-row p-[30px]"
            style={{ backgroundColor: bgColor }}
          >
            <div className="mr-[30px]">
              <img
                ref={imgRef}
                className="flex h-[200px] w-[248px] items-center justify-center rounded-full"
                src={user?.image}
                alt={"avatar"}
              />
            </div>

            <div className="w-full">
              <div className="w-full">
                <div className="flex w-[full] gap-2">
                  <div className="flex flex-col gap-2">
                    <div className="w-full">
                      <span className="flex h-[36.8px] items-center gap-2 bg-[#000000cc] px-2 py-1 text-2xl text-[#fff]">
                        {user?.username}
                        <img className="h-[18px]" src={icon.checkBlue} alt="" />
                      </span>
                    </div>
                    <div className="w-full">
                      <span className="h-[36.8px] w-full bg-[#000000cc] px-2 py-1 text-base text-[#ccc]">
                        {user?.username}
                      </span>
                    </div>
                    <div className="w-full">
                      {user?.country && (
                        <span className="h-[36.8px] w-full bg-[#000000cc] px-2 py-1 text-base text-[#ccc]">
                          {user.country}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="ml-[30px] flex items-center"></div>
            </div>
          </div>
        </PopperWrapper>
      </div>
      <section className="mx-auto flex w-[1200px] justify-between border-b py-[10px]">
        <ul className="flex items-center gap-3 text-lg text-[#333]">
          {titles.map((title) => (
            <li key={title.id}>{title.name}</li>
          ))}
        </ul>
        {Number(u?.id) !== Number(id) ? (
          <article className="flex items-center">
            <button className="mr-1.5 flex h-[26px] items-center gap-1.5 rounded border py-[2px] pl-[10px] pr-[12px] text-sm text-[#333]">
              <img src={icon.station} alt="" />
              <span>Station</span>
            </button>
            <button className="mr-1.5 flex h-[26px] items-center gap-1.5 rounded border py-[2px] pl-[10px] pr-[12px] text-sm text-[#333]">
              <img src={icon.userPlus} alt="" />
              <span>Follow</span>
            </button>
            <button className="mr-1.5 flex h-[26px] items-center gap-1.5 rounded border py-[2px] pl-[10px] pr-[12px] text-sm text-[#333]">
              <img src={icon.share} alt="" />
              <span>Share</span>
            </button>
            <button className="mr-1.5 flex h-[26px] items-center gap-1.5 rounded border py-[2px] pl-[10px] pr-[12px] text-sm text-[#333]">
              <img src={icon.email} alt="" />
            </button>
            <button className="mr-1.5 flex h-[26px] items-center gap-1.5 rounded border py-[2px] pl-[10px] pr-[12px] text-sm text-[#333]">
              <img src={icon.more} alt="" />
            </button>
          </article>
        ) : (
          <article className="flex items-center">
            <button className="mr-1.5 flex h-[26px] items-center gap-1.5 rounded border py-[2px] pl-[10px] pr-[12px] text-sm text-[#333]">
              <img src={icon.share} alt="" />
              <span>Share</span>
            </button>
            <button className="mr-1.5 flex h-[26px] items-center gap-1.5 rounded border py-[2px] pl-[10px] pr-[12px] text-sm text-[#333]">
              <img src={icon.pen} alt="" />
              <span>edit</span>
            </button>
          </article>
        )}
      </section>
    </div>
  );
}

export default Profile;
