import React from 'react'
// import image from '../assets/09d6bfc03b197744925c51762fb97cbc'
import image from '../../public/assets/home-bg.jpg'
import { Link } from 'react-router-dom'
import { InfoTabsSection } from '../components/InfoTabsSection'

export const HomePageBeforeLogin = () => {
    return (
        <>
            <section className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
                {/* Background Patterns */}
                <div className="absolute top-0 left-0 w-full h-full"></div>

                {/* Background Animation */}
                <div className="absolute inset-0 h-screen flex items-center justify-center z-0 opacity-80">
                    <img
                        src={image}
                        alt="Working Animation"
                        className="h-auto w-screen bg-cover hidden sm:block"
                    />
                    <div className="sm:hidden w-full h-full bg-gradient-to-br from-blue-500 to-blue-500 via-white"></div>
                </div>

                <div className="relative bg-black bg-opacity-40 h-screen text-center flex flex-col items-center justify-center w-screen z-10 px-4">
                    <h1 className="text-gray-900 text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">
                        Welcome to <span className="text-blue-400">ClickUp</span>
                    </h1>
                    <p className="text-gray-100 text-lg md:text-2xl font-semibold leading-relaxed mb-10 max-w-2xl mx-auto">
                        Bring all your work into one place, from tasks to documents and everything in between.
                    </p>
                    <Link to="/login" className="text-lg font-semibold bg-black-300 text-black px-6 py-2 rounded-lg bg-blue-400 hover:bg-blue-500 transition duration-300">
                        Get Started
                    </Link>
                </div>
            </section>
            <section className="relative w-full h-screen overflow-hidden">
                <img
                    src="/assets/bg.jpg"
                    className="w-full h-full object-cover"
                    alt="background"
                />
                <div className="absolute inset-0 z-10 flex items-center justify-center p-4 md:p-8 lg:p-12">
                    <InfoTabsSection />
                </div>
            </section>
        </>
    )
}
