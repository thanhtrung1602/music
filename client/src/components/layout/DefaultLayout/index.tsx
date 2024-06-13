import Header from "~/components/layout/components/Header";
import SlideBar from "~/components/layout/DefaultLayout/SlideBar";

interface DefaultLayoutProps {
    children: React.ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
    return ( 
        <>
            <Header />
            <div className="">
                <div>
                    {children}
                </div>
                <SlideBar />
            </div>
        </>
     );
}

export default DefaultLayout;