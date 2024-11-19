import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function NavFooter() {
    return (
        <>
        <Navbar />
        <Outlet />
        <Footer />
        </>
    )
    // <NavLink to='/about'
};
export default NavFooter;