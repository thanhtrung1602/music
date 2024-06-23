import Header from "~/components/layout/components/Header";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <Header />
      <div className="mt-16">
        <div>{children}</div>
      </div>
    </>
  );
}

export default DefaultLayout;
