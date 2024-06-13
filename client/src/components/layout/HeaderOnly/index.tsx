import Header from "~/components/layout/components/Header";

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
            </div>
        </>
     );
}

export default DefaultLayout;