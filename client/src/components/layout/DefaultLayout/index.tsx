import Header from "~/components/layout/components/Header";
import SlideBar from "~/components/layout/DefaultLayout/SlideBar";

function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="mt-16 flex w-full items-center justify-center">
        <div className="relative flex w-[1519.2px] items-center justify-center">
          <div className="float-left w-[820px]">{children}</div>
          <SlideBar />
        </div>
      </main>
    </>
  );
}

export default DefaultLayout;
