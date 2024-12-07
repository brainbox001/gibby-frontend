import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function NavFooter() {
    return (
        <>
            <Navbar />
                <Outlet />
        </>
    );
};
export default NavFooter;