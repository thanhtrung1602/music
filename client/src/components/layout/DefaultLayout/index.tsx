import Header from "~/components/layout/components/Header";
import SlideBar from "~/components/layout/DefaultLayout/SlideBar";

function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />

      <main className="mt-16 flex w-full items-center justify-center">
        <div className="relative flex w-[1185.2px]">
          <div className="float-left border-r border-[#f2f2f2] pr-7">
            {children}
          </div>
          <SlideBar />
        </div>
      </main>
    </>
  );
}

export default DefaultLayout;
