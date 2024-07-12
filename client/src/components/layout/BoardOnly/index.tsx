import { useLocation } from "react-router-dom";
import Header from "~/components/layout/components/Header";
import Comment from "~/components/layout/components/Comment";
// import SlideBar from "~/components/layout/DefaultLayout/SlideBar";
import Content from "~/components/layout/components/Content";
import SlideBarDetail from "./SlideBarDetail";
import SlideBarProfile from "./SlideBarProflie";
import Footer from "~/components/layout/components/Footer";
import Playlist from "~/components/layout/components/playlists";
import { useSelector } from "react-redux";
interface DefaultLayoutProps {
  children: React.ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
  const { pathname } = useLocation();
  const { isPlaylist } = useSelector((state: { isPlaylist: boolean }) => state);
  const isDetailPage = /^\/detail\/\d+$/.test(pathname);
  const isProfilePage = /^\/profile\/\d+$/i.test(pathname);
  return (
    <>
      <Header />
      <main
        className={`${isPlaylist && "opacity-50"} mt-[45px] flex w-full items-center justify-center`}
      >
        <div className="relative w-[1258.2px]">
          <section className="">
            <div>{children}</div>
          </section>
          <section className="mt-5 flex justify-center">
            {isDetailPage && <Comment />}
            {isProfilePage && <Content />}
            {isDetailPage && <SlideBarDetail />}
            {isProfilePage && <SlideBarProfile />}
          </section>
        </div>
      </main>
      {isPlaylist && (
        <div className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 opacity-100">
          <Playlist />
        </div>
      )}
      <Footer />
    </>
  );
}

export default DefaultLayout;
