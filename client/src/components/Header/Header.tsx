import logo from "~/assets/img/logo/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faBell,
  faEnvelope,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import Search from "~/components/Header/component/Search/Search";
function Header() {
  const categories = ["Home", "Feed", "Library"];

  return (
    <header className="fixed top-0 h-[46px] w-full bg-[#333] text-sm leading-normal text-[#ccc]">
      <div className="mx-36 flex items-center">
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
          <Search />
        </div>
        <nav>
          <ul className="ml-2 flex items-center gap-1">
            <li className="px-2 text-[#ff5500]">Try Next Pro</li>
            <li className="px-2">For Artists</li>
            <li className="px-2">Upload</li>
          </ul>
        </nav>
        <div className="flex items-center gap-2 pl-2">
          <img
            src="https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
            className="w-7 rounded-full"
            alt=""
          />
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
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
