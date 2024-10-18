import React from 'react';

export const UserDashboards = ({ dashboardName, dashboardType, ownerName, handleDashboard, url, handleDeleteBtn }) => {

    return (
        <>
            <div className='px-5 py-1'>
                <div className='w-full h-auto transition-transform transform hover:scale-[1.009] duration-300 px-6 py-6 bg-white dark:bg-gray-700 shadow-md hover:shadow-xl rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center'>

                    <div className='mb-4 md:mb-0'>
                        <h1 className='text-2xl font-semibold text-gray-800 dark:text-gray-200 underline'>{dashboardName}</h1>
                        <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>{dashboardType}</p>
                        <p className='text-sm font-medium text-gray-600 font-LXGWFont dark:text-gray-400'>{ownerName}</p>
                    </div>

                    <div className='flex space-x-3'>
                        <button onClick={handleDashboard} className='bg-gray-300 hover:bg-blue-200 dark:bg-gray-700 dark:hover:bg-blue-500 text-white px-3 py-2 rounded-md font-medium transition-colors duration-200'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24"><path fill="#5c5c5c" d="M15.21 2H8.75A6.76 6.76 0 0 0 2 8.75v6.5A6.76 6.76 0 0 0 8.75 22h6.5A6.76 6.76 0 0 0 22 15.25v-6.5A6.76 6.76 0 0 0 15.21 2M8.43 16.23a.8.8 0 1 1-1.6 0v-5.1a.8.8 0 0 1 1.6 0zm4.45 0a.8.8 0 1 1-1.6 0V7.78a.8.8 0 0 1 1.6 0zm4.21 0a.8.8 0 1 1-1.6 0V9.82a.8.8 0 0 1 1.6 0z" /></svg>
                        </button>
                        <button onClick={handleDeleteBtn} className='bg-gray-300 hover:bg-red-200 dark:bg-gray-700 dark:hover:bg-red-600 text-white px-3 py-2 rounded-md font-medium transition-colors duration-200'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24"><path fill="#a80000" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z" /></svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
