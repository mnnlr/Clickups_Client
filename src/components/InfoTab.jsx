import React from 'react'

export const InfoTab = ({ title1, description1, title2, description2, img }) => {
    return (
        <div className='flex flex-col md:flex-row items-center justify-center'>
            <div className='flex flex-col justify-center items-center md:flex-col md:space-x-4'>
                <div className='px-4 py-6 m-4 w-full md:w-96 bg-blue-400 rounded-r-full'>
                    <h1 className='text-2xl md:text-3xl font-bold'>{title1}</h1>
                    <p className='text-base md:text-xl'>{description1}</p>
                </div>
                <div className='px-4 py-6 m-4 w-full md:w-96 bg-blue-300 rounded-r-full'>
                    <h1 className='text-2xl md:text-3xl font-bold'>{title2}</h1>
                    <p className='text-base md:text-xl'>{description2}</p>
                </div>
            </div>
            <div className='mt-6 md:mt-0 md:ml-10 w-full md:w-[700px]'>
                <img src={img} className='rounded-2xl shadow-xl w-full' alt="image" />
            </div>
        </div>
    )
}
