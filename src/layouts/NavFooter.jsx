import React from 'react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Outlet } from 'react-router-dom'

export const NavFooter = () => {
    return (
        <>
            <div className='flex flex-col h-screen bg-[#EFF2FF]'>
                <Navbar />
                <div className='flex-grow'>
                    <Outlet />
                </div>
                <Footer />
            </div>
        </>
    )
}
