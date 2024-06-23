import { useLocation } from "react-router-dom";
import Header from "~/components/layout/components/Header";
import Comment from "~/components/layout/components/Comment";
import SlideBar from "~/components/layout/DefaultLayout/SlideBar";
import Content from "~/components/layout/components/Content";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
  const location = useLocation();
  const isDetailPage = /^\/detail\/\d+$/.test(location.pathname);
  const isProfilePage = /^\/Profile\/\d+$/.test(location.pathname);

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
            <SlideBar />
          </section>
        </div>
      </main>
    </>
  );
}

export default DefaultLayout;
