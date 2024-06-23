import { useEffect, useRef, useState } from "react";
import { FastAverageColor } from "fast-average-color";
import icon from "~/assets/img/icon";
import { Wrapper as PopperWrapper } from "~/components/Popper";

const titles = [
  { id: 1, name: "All" },
  { id: 2, name: "Popular tracks" },
  { id: 3, name: "Tracks" },
  { id: 4, name: "Playlists" },
  { id: 5, name: "Reposts" },
];

function Profile() {
  const imgRef = useRef(null);
  const [bgColor, setBgColor] = useState("#ffffff");

  useEffect(() => {
    const img = imgRef.current;
    if (img) {
      const fac = new FastAverageColor();
      const proxyUrl = `https://i1.sndcdn.com/avatars-VRK7gRM7x8uZTSa6-UCAdHA-t500x500.jpg`;

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
  }, []);

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
                src="https://i1.sndcdn.com/avatars-VRK7gRM7x8uZTSa6-UCAdHA-t500x500.jpg"
                alt={"avatar"}
              />
            </div>

            <div className="w-full">
              <div className="w-full">
                <div className="flex w-[full] gap-2">
                  <div className="flex flex-col gap-2">
                    <div className="w-full">
                      <span className="flex h-[36.8px] items-center gap-2 bg-[#000000cc] px-2 py-1 text-2xl text-[#fff]">
                        denvau
                        <img className="h-[18px]" src={icon.checkBlue} alt="" />
                      </span>
                    </div>
                    <div className="w-full">
                      <span className="h-[36.8px] w-full bg-[#000000cc] px-2 py-1 text-base text-[#ccc]">
                        Đen Vâu
                      </span>
                    </div>
                    <div className="w-full">
                      <span className="h-[36.8px] w-full bg-[#000000cc] px-2 py-1 text-base text-[#ccc]">
                        Viet Nam
                      </span>
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
      </section>
    </div>
  );
}

export default Profile;
