import Header from "~/components/layout/components/Header";
import Footer from "~/components/layout/components/Footer";

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
      <Footer />
    </>
  );
}

export default DefaultLayout;
