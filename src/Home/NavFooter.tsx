import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ContextProvider } from "../GeneralContext";

function NavFooter() {
    return (
        <ContextProvider>
            <Navbar />
                <Outlet />
            <Footer />
        </ContextProvider>
    )
    // <NavLink to='/about'
};
export default NavFooter;