import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HeadlessTippy from "@tippyjs/react/headless";
import {
  faChevronDown,
  faBell,
  faEnvelope,
  faEllipsis,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

import logo from "~/assets/img/logo/logo.png";
import Search from "~/components/layout/components/Search";
import { Wrapper as PopperWrapper } from "~/components/Popper";
import icon from "~/assets/img/icon";

type Users = {
  id: number;
  image: string;
  name: string;
};

function Header() {
  const users = [
    { id: 1, image: icon.profile, name: "Profile" },
    { id: 2, image: icon.heart, name: "Likes" },
    { id: 3, image: icon.playlist, name: "Playlists" },
    { id: 4, image: icon.follow, name: "Following" },
    { id: 5, image: icon.follow, name: "Who to follow" },
    { id: 6, image: icon.track, name: "Tracks" },
  ];

  const [show, setShow] = useState(false);
  const refShow = useRef();

  function handleSearch() {
    if (show) {
      refShow.current.style.backgroundColor = "#000";
      // refShow.current.style.backgroundColor = "#333";
    }
    setShow(true);
  }
  const categories = ["Home", "Feed", "Library"];

  return (
    <header className="fixed top-0 flex h-[46px] w-full items-center justify-center bg-[#333] text-sm leading-normal text-[#ccc]">
      <div className="flex w-[1519.2px] items-center justify-center">
        <div className="block">
          <div className="flex items-center justify-center">
            <div className="flex h-[46px] w-[69px] items-center justify-center bg-[#f50]">
              <a href="/" className="block">
                <img className="w-full" src={logo} alt="Logo" />
              </a>
            </div>
            <nav>
              <ul className="flex items-center justify-center">
                {categories.map((category, i) => {
                  return (
                    <li className="border-r-[1px] border-[#111]" key={i}>
                      <a
                        href=""
                        className="block h-[46px] w-[104px] cursor-pointer p-3 text-center"
                      >
                        {category}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
        <div className="ml-3">
          <Search search={faSearch} />
        </div>
        <nav>
          <ul className="ml-2 flex items-center gap-1">
            <li className="px-2 text-[#ff5500]">
              <a href="">Try Next Pro</a>
            </li>
            <li className="px-2">
              <a href="">For Artists</a>
            </li>
            <li className="px-2">
              <a href="">Upload</a>
            </li>
          </ul>
        </nav>
        <HeadlessTippy
          interactive
          visible={show}
          render={(attrs) => (
            <div
              className="mt-[-9.5px] translate-x-[35px] border border-solid border-[#ccc]"
              {...attrs}
            >
              <PopperWrapper>
                <ul className="text-xs font-semibold text-[#333]">
                  {users.map((user: Users) => {
                    return (
                      <li className="" key={user.id}>
                        <a
                          href=""
                          className="relative flex h-[32.8px] w-[133.4px] items-center py-2 pr-[10px]"
                        >
                          <img
                            className="block h-5 w-[34px]"
                            src={user.image}
                            alt={user.name}
                          />
                          <span className="pl-1">{user.name}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </PopperWrapper>
            </div>
          )}
          onClickOutside={() => setShow(false)}
        >
          <div
            ref={refShow}
            className="flex h-[46px] w-16 items-center gap-2 pl-2"
            onClick={handleSearch}
          >
            <img
              src="https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
              className="w-6 rounded-full"
              alt=""
            />
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        </HeadlessTippy>
        <div className="flex items-center justify-between pl-2 text-xl">
          <span className="px-3">
            <FontAwesomeIcon icon={faBell} />
          </span>
          <span className="px-4">
            <FontAwesomeIcon icon={faEnvelope} />
          </span>
          <span className="px-3 text-2xl">
            <FontAwesomeIcon icon={faEllipsis} />
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;
