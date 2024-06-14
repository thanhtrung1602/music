import Header from "~/components/layout/components/Header";
import SlideBar from "~/components/layout/DefaultLayout/SlideBar";

function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="">
        <div>{children}</div>
        <SlideBar />
      </div>
    </>
  );
}

export default DefaultLayout;
