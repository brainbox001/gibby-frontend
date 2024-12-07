import { NavLink, Link } from "react-router-dom";

function SmallDeviceNav({callback, isOpen} : {callback : () => void, isOpen : boolean}) {
    return (
        <div className="relative sm:hidden">
        <button
          className="space-y-1 focus:outline-none"
          onClick={() => callback()}
        >
          <div className="w-6 h-1 bg-black"></div>
          <div className="w-6 h-1 bg-black"></div>
          <div className="w-6 h-1 bg-black"></div>
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 bg-current-col rounded-md shadow-lg small-nav-custom flex flex-col w-16 items-center">
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/about'>About</NavLink>
            <NavLink to='/how-it-works'>How it works</NavLink>
            <Link className="login" to='/login'>Login</Link>
            <Link className="register" to='/register'>Get started</Link>
          </div>
        )}
      </div>
    )
}
export default SmallDeviceNav;
