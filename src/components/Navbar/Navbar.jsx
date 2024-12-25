import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/freshcart-logo.svg'
import { counterContext } from '../../../context/counterContext';
import { userContext } from '../../../context/userContext';
import Login from '../Login/Login';
import { cartContext } from '../../../context/cartContext';
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  let navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false);
  let {cartItems} = useContext(cartContext)
  let {userLogin,setuserLogin} = useContext(userContext)

  function logOut(){
    localStorage.removeItem('userToken')
    setuserLogin(null)
    navigate('/login')
  }

  

  return (<>
<nav className="bg-slate-100 lg:fixed top-0 left-0 right-0 z-10 dark:bg-slate-300">
  <div className="p-4 px-10 flex flex-col lg:flex-row lg:justify-between lg:items-center">
    {/* Logo */}
    <div className="flex justify-between items-center">
      <img width={140} src={logo} alt="Logo" />
      <button
        className="lg:hidden text-xl focus:outline-none"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`}></i>
      </button>
    </div>

    {/* Links */}
    <ul
      className={`flex flex-col lg:flex-row lg:items-center ${
        isMenuOpen ? "block" : "hidden"
      } lg:flex`}
    >
      {userLogin !== null ? (
        <>
          <li className="px-3 py-2 ">
            <NavLink className={'forlink'} to="/">Home</NavLink>
          </li>
          <li className="px-3 py-2">
            <NavLink className={'forlink'} to="/Products">Products</NavLink>
          </li>
          <li className="px-3 py-2 relative">
            <NavLink className={'forlink'} to="/Cart">
              Cart{" "}
              {cartItems > 0 && (
                <span className="absolute top-[-10px] right-[-10px] bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded border border-green-400">
                  {cartItems}
                </span>
              )}
            </NavLink>
          </li>
          <li className="px-3 py-2">
            <NavLink className={'forlink'} to="/Brands">Brands</NavLink>
          </li>
          <li className="px-3 py-2">
            <NavLink className={'forlink'} to="/Categories">Categories</NavLink>
          </li>
          <li className="px-3 py-2">
            <NavLink className={'forlink'} to="/Wishlist">Wishlist</NavLink>
          </li>
          <li className="px-3 py-2 lg:hidden">
            {/* Logout Button for Small Screens */}
            <button
              onClick={logOut}
              className="w-full text-red-500 font-bold text-left focus:outline-none outline-none ">
              Logout
            </button>
          </li>
          <li className="px-3 py-2 lg:hidden">
            {/* Cart Icon for Small Screens */}
            <DarkModeToggle />          </li>
        </>
      ) : (
        <>
          <li className="px-3 py-2">
            <NavLink className={'forlink'} to="/Register">Register</NavLink>
          </li>
          <li className="px-3 py-2">
            <NavLink  className={'forlink'} to="/Login">Login</NavLink>
          </li>
        </>
      )}
    </ul>

    {/* Logout and Cart for Large Screens */}
    {userLogin !== null && (
      <div className="hidden lg:flex items-center space-x-4">
        <button
          onClick={logOut}
          className="px-3 py-2 text-red-400 font-bold  ">
          Logout
        </button>
        <DarkModeToggle />      </div>
    )}
  </div>
</nav>

  </>
  );
}
