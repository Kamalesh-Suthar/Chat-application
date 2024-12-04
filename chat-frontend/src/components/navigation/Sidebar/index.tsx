import Sidebar from "@/components/navigation/Sidebar/menu"
import {ReactNode} from "react";

const Layout = ({ children }: { children: ReactNode })=>  {
    return (
        <>
            <Sidebar />
            <main>
                {children}
            </main>
        </>
    )
}

export default Layout