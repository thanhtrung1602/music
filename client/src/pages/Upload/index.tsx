import { FormEvent, useContext, useEffect, useState } from "react";
import { CookieUser } from "~/Hooks/UserToken";
import { fetchPost } from "~/Api";
import icon from "~/assets/img/icon";

interface FileWithPreview extends File {
  preview?: string;
}

function Upload() {
  const u = useContext(CookieUser);
  const [imgTrack, setImgTrack] = useState<FileWithPreview | null>(null);
  const [sound, setSound] = useState<File | null>(null);
  const [track_name, setTrack_name] = useState("");
  const [genre_id, setGenre_id] = useState("");
  const [description, setDescripton] = useState("");
  const { mutate: post } = fetchPost();

  useEffect(() => {
    return () => {
      imgTrack && URL.revokeObjectURL(imgTrack?.preview);
    };
  }, [imgTrack]);
  const handleImgTrack = (e: FormEvent) => {
    const file = e.target?.files[0];
    file.preview = URL.createObjectURL(file);
    setImgTrack(file);
  };

  const handleUploadTrack = () => {
    if ((sound, imgTrack, u?.id)) {
      const formData = new FormData();
      formData.append("image", imgTrack);
      formData.append("sound", sound);
      formData.append("track_name", track_name);
      formData.append("genre_id", genre_id);
      formData.append("description", description);
      formData.append("user_id", u?.id);
      console.log(formData);
      post(
        { url: "/tracks/uploader", data: formData },
        {
          onSuccess: () => {
            setTrack_name("");
            setImgTrack(null);
            setSound(null);
            setGenre_id("");
            setDescripton("");
          },
        },
      );
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex w-[800px] gap-5 border px-[25px] py-3.5">
        <div className="relative h-[260px] w-[260px] bg-custom-gradient">
          {imgTrack && <img src={imgTrack?.preview} alt="" />}
          <div className="absolute bottom-12 left-2/4 -translate-x-[56%]">
            <button className="relative flex w-[140px] cursor-pointer items-center gap-2 rounded border bg-[#ffffffcc] py-[2px] pl-2.5 pr-3 text-sm text-[#333]">
              <img src={icon.camera} alt="" />
              <span>Upload image</span>
            </button>
            <input
              onChange={handleImgTrack}
              className="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
              type="file"
              accept="image/jpeg,image/pjpeg,image/gif,image/png"
            />
          </div>
        </div>
        <div className="w-[470px]">
          <div className="mb-5 flex flex-col gap-2">
            <label className="text-xs text-[#333]" htmlFor="idSound">
              Permalink *
            </label>
            <input
              className="text-xs"
              type="file"
              onChange={(e) => setSound(e.target?.files[0])}
              accept="audio/mp3"
              name=""
              id="idSound"
            />
          </div>
          <div className="my-2.5 flex w-full flex-col gap-2">
            <label className="text-xs text-[#333]" htmlFor="idTitle">
              Title *
            </label>
            <input
              className="w-full rounded border px-2 py-[2px] text-sm"
              value={track_name}
              onChange={(e) => setTrack_name(e.target.value)}
              placeholder="Name your track"
              id="idTitle"
              type="text"
            />
          </div>
          <div className="my-2.5 flex w-full flex-col gap-2">
            <label className="text-xs text-[#333]" htmlFor="idTitle">
              Genre
            </label>
            <select
              className="h-[26px] w-[230px] rounded border px-2 py-[2px] text-sm text-[#333] outline-none"
              name=""
              id=""
              onChange={(e) => setGenre_id(e.target.value)}
            >
              <option selected value="">
                none
              </option>
              <option value="1">Hip-hop & Rap</option>
              <option value="2">Dance & EDM</option>
              <option value="Ballad">Ballad</option>
            </select>
          </div>
          <div className="my-2.5 flex w-full flex-col gap-2">
            <label className="text-xs text-[#333]" htmlFor="idAdditionalTags ">
              Additional tags
            </label>
            <input
              className="w-full rounded border px-2 py-[2px] text-sm"
              placeholder="Add tags to describe the genre and mood of your track"
              id="idAdditionalTags "
              type="text"
            />
          </div>
          <div className="my-2.5 flex w-full flex-col gap-2">
            <label className="text-xs text-[#333]" htmlFor="idDescription ">
              Description
            </label>
            <textarea
              name=""
              className="h-[130px] w-full rounded border px-2 py-[2px] text-sm"
              placeholder="Describe your track"
              value={description}
              onChange={(e) => setDescripton(e.target.value)}
              id=""
            ></textarea>
          </div>
          <div className="my-2.5 flex w-full flex-col gap-2">
            <label className="text-xs text-[#333]" htmlFor="idDescription ">
              Caption
            </label>
            <textarea
              name=""
              className="h-[85px] w-full resize-none rounded border px-2 py-[2px] text-sm"
              placeholder="Add a caption to your post (optional)"
              id=""
            ></textarea>
          </div>
          <div className="flex items-center justify-end pt-4">
            <button className="mr-1 py-0.5 pl-2.5 pr-3">Cancel</button>
            <button
              onClick={handleUploadTrack}
              className="rounded border bg-[#f50] py-0.5 pl-2.5 pr-3 text-white"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upload;
