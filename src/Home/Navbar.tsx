import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import SmallDeviceNav from "./SmallDeviceNav";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  function toogleNav() {
    setIsOpen(!isOpen)
  }

  return (
    <div className="sticky top-0 h-24 bg-current-col drop-shadow-xl flex items-center justify-between px-4">
      <div>
        <img
          className="h-20 w-20 object-contain"
          src="/gibby-logo.png"
          alt="gibby-logo"
        />
      </div>
      <SmallDeviceNav callback={toogleNav} isOpen={isOpen} />
      <div className="nav-custom-1 hidden sm:block">
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/about'>About</NavLink>
        <NavLink to='/how-it-works'>How it works</NavLink>
      </div>

      <div className="nav-custom-2 hidden sm:block">
        <Link className="login" to='/login'>Login</Link>
        <Link className="register" to='/register'>Get started</Link>
      </div>
    </div>
  );
}

export default Navbar;
