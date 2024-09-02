import React from 'react'
import TopNav from '../components/LoginTopNav'
import SideNav from '../components/LoginSideNav'
import { Outlet } from 'react-router-dom'

export const SideNavTopNav = () => {
    return (
        <div className='bg-[#EFF2FF]'>
            <TopNav />
            <SideNav />
            <div className=''>
                <Outlet />
            </div>
        </div>
    )
}
