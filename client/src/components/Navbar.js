import React, { useState } from "react";

export default function Navbar({ fixed }) {

    const [navbarOpen, setNavbarOpen] = useState(false);


    return (
        <>
            <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-gradient-to-r from-teal-400 to-purple-600 mb-3">
                <div className="container px-4 pr-0 mx-auto flex flex-wrap items-center justify-between">
                    <div className="w-full relative flex justify-between md:w-auto md:static md:block md:justify-start">
                        <a
                            className="text-2xl font-bold leading-relaxed inline-block mr-4 py-1 whitespace-nowrap text-white"
                            href="/"
                        >
                            microURLs
                        </a>
                        <button
                            className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block md:hidden outline-none focus:outline-none"
                            type="button"
                            onClick={() => setNavbarOpen(!navbarOpen)}
                        >
                            {navbarOpen ?
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                                :
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            }
                        </button>
                    </div>
                    <div
                        className={
                            "md:flex flex-grow items-center" +
                            (navbarOpen ? " flex" : " hidden")
                        }
                        id="example-navbar-danger"
                    >
                        <ul className="flex flex-col md:flex-row list-none md:ml-auto">
                            <li className="nav-item">
                                <a
                                    className="px-3 py-2 flex items-center font-bold leading-snug text-white hover:opacity-75"
                                    href="/"
                                >
                                    <span className="ml-2 text-lg">Home</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="px-3 py-2 flex items-center font-bold leading-snug text-white hover:opacity-75"
                                    href="#"
                                >
                                    <span className="ml-2 text-lg">Login</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="px-3 py-2 flex items-center font-bold leading-snug text-white hover:opacity-75"
                                    href="#"
                                >
                                    <span className="ml-2 text-lg">Sing-UP</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}