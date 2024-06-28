import { useLocation } from "react-router-dom";
import Header from "~/components/layout/components/Header";
import Comment from "~/components/layout/components/Comment";
// import SlideBar from "~/components/layout/DefaultLayout/SlideBar";
import Content from "~/components/layout/components/Content";
import SlideBarDetail from "./SlideBarDetail";
import SlideBarProfile from "./SlideBarProflie";
import Footer from "~/components/layout/components/Footer";
interface DefaultLayoutProps {
  children: React.ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
  const { pathname } = useLocation();
  const isDetailPage = /^\/detail\/\d+$/.test(pathname);
  const isProfilePage = /^\/profile\/\d+$/i.test(pathname);
  return (
    <>
      <Header />
      <main className="mt-[45px] flex w-full items-center justify-center">
        <div className="w-[1258.2px]">
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
      <Footer />
    </>
  );
}

export default DefaultLayout;
