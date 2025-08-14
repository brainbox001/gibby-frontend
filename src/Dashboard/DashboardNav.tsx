import { NavLink, Outlet } from "react-router-dom";
import { RiHome2Line, RiFileLine, RiUserLine } from "react-icons/ri";

function DashboardNavbar() {
  return (
    <div className="flex flex-col sm:flex-row h-screen bg-gray-200 relative">
      {/* Navbar */}
      <div className="flex flex-row sm:flex-col sm:left-0 items-center justify-around fixed bottom-0 shadow-lg  w-full sm:sticky py-2 sm:w-[8%] sm:h-screen bg-gray-50 z-10">  
          <div>
            <NavLink to="/dashboard">
              <RiHome2Line size={25} />
            </NavLink>
          </div>

          <div>
            <NavLink to="/dashboard/trans">
              <RiFileLine size={25} />
            </NavLink>
          </div>

          <div>
            <NavLink to="/dashboard/user">
              <RiUserLine size={25} />
            </NavLink>
          </div>
      </div>

      {/* Page Content */}
      <div className="sm:w-[90%] ml-4">
        {/* Hello world */}
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardNavbar;
