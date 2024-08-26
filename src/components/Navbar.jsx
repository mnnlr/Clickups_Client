import React from 'react'
import { Link } from 'react-router-dom'
// import { LoginBtn } from '../utils/LoginBtn'

export const Navbar = () => {
    return (
        <header className="text-gray-600 bg-[#2A085F] body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg> */}
                    <span className="text-white ml-3 font-bold text-3xl">MNNLR Workspace</span>
                </a>
                <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                    <Link to="/" className="mr-5 font-semibold duration-300 text-white hover:text-gray-300">Home</Link>

                    <a target="_blank" href="https://mnnlr-emp.netlify.app/" className="mr-5 font-semibold duration-300 text-white hover:text-gray-300">MNNLR</a>
                    <Link to="/signin" className="text-gray-900 m-1 px-5 py-[7px] font-bold duration-300 bg-blue-500 hover:cursor-pointer hover:bg-gray-400 hover:shadow-lg  rounded-full">LogIn</Link>
                    <Link to="/signup" className="text-gray-900 m-1 px-5 py-[7px] font-bold duration-300 bg-gray-100 hover:cursor-pointer hover:bg-gray-400 hover:shadow-lg  rounded-full">SignUp</Link>
                </nav>
            </div>
        </header>

    )
}