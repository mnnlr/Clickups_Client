import React from 'react'
import { Link } from 'react-router-dom'

export const UserDashboards = ({ dashboardName, dashboardType, projectName, url }) => {

    return (
        <>
            <div className='w-full h-auto hover:scale-[1.02] transition duriration-200 px-5 py-6 bg-slate-100 shadow-lg hover:xl rounded-xl flex flex-row justify-between items-center'>
                <div className=''>
                    <h1 className='text-2xl underline'>{dashboardName}</h1>
                    <p className='text-sm font-normal text-gray-500'>{dashboardType}</p>
                    <p className='text-sm font-normal text-gray-500'>{projectName}</p>
                </div>
                <Link to={url} className='bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded'>View Dashboard</Link>
            </div>
        </>
    )
}
