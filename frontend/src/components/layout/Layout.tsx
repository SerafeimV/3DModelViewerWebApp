import type {ReactNode} from "react";
import Header from "./Header";

interface LayoutProps {
    children: ReactNode;
    headerWithExtras?: boolean;
}

function Layout({children, headerWithExtras = false}: LayoutProps) {
    return (
        <div>
            <Header withExtras={headerWithExtras}/>
            <hr className="rounded"/>
            <div id={"page-content"} style={{marginTop: "5rem"}}>
                {children}
            </div>
            <hr className="rounded"/>
        </div>
    );
}

export default Layout;