import { NavLink } from "react-router-dom";

function DashboardNavbar({height, col} : {height? : string; col? : string}) {
  return (
    <div className="relative sm:basis-1/4 sm:h-screen box-border">
      <div className={`fixed max-[639px]:bg-white ${col || 'bg-slate-100'} sm:sticky sm:top-0 bottom-0 w-full py-3 ${height || 'sm:h-4/5'}`}>
        <div className="flex justify-around sm:flex-col sm:items-center sm:h-full">
          <div>
            <NavLink to="/">
            <img  src="/home.png" alt="home-img" />
            </NavLink>
            
          </div>
          <div>
            <NavLink to="/trans">
            <img src="/arrow.png" alt="trans-img" />
            </NavLink>
            
          </div>
          <div>
            <NavLink to="/user">
            <img src="/person.png" alt="person-img" />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DashboardNavbar;
