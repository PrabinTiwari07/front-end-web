import React, { useState } from "react";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-teal-600">
            <div className="navbar bg-teal-400 text-white">
                <div className="navbar-start">
                    <a className="btn btn-ghost text-xl hover:bg-black">Clean Ease</a>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><a className="hover:bg-black">Home</a></li>
                        <li><a className="hover:bg-black">Service</a></li>
                        <li><a className="hover:bg-black">Contact</a></li>
                    </ul>
                </div>

                <div className="navbar-end">
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar hover:bg-black"
                        >
                            <div className="w-10 rounded-full">
                                <img alt="User Avatar" src="src/assets/images/iron.jpeg" />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-teal-600 text-white rounded-box z-[1] mt-3 w-52 p-2 shadow"
                        >
                            <li>
                                <a className="justify-between hover:bg-black">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a className="hover:bg-black">Settings</a></li>
                            <li><a className="hover:bg-black">Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
