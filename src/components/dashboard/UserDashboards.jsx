import React from 'react'
import { Link } from 'react-router-dom'

export const UserDashboards = ({ dashboardName, dashboardType, projectName, url }) => {

    return (
        <>
            <div className='px-5'>
                <div className='w-full h-auto hover:scale-[1.009] transition duration-200 px-5 py-6 bg-slate-100 shadow-lg rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center'>

                    <div className='mb-4 md:mb-0'>
                        <h1 className='text-2xl underline'>{dashboardName}</h1>
                        <p className='text-sm font-normal text-gray-500'>{dashboardType}</p>
                        <p className='text-sm font-normal text-gray-500'>{projectName}</p>
                    </div>
                    <Link to="/dashboard/project" className='bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded'>View Dashboard</Link>
                </div>
            </div>
        </>
    )
}
