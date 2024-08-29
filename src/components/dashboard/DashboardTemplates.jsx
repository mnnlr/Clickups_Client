import React, { useEffect, useState } from 'react';

export const DashboardTemplates = () => {

    const [ProjectName, setProjectName] = useState("Select Project");
    const [ToggleEdit, setToggleEdit] = useState(false);

    const handleToggleEdit = () => {
        setToggleEdit(!ToggleEdit);
    }

    //----------------Handle Form Change-----------------
    const handleFormChange = (e) => {
        return setProjectName(e.target.value);
    }

    //----------------Handle dashboard in backend-----------------
    const handleToggleEditOnChange = (e) => {
        e.preventDefault();
        if (ProjectName === "Select Project") {
            alert("Please enter Project Name")
        } else {
            setToggleEdit(!ToggleEdit);

            //----------------Creating dashboard in backend here---------------
            console.log(ProjectName)
        }
        setProjectName("Select Project");
    }


    return (
        <>
            <div className="items-center text-gray-800 flex mb-10">
                <div className="p-4 w-full">
                    <div className="grid grid-cols-12 gap-4 px-4 sm:px-8 md:px-16">
                        <div className="col-span-12 sm:col-span-6 md:col-span-3">
                            <div className="flex flex-row bg-white shadow-sm rounded p-4 hover:cursor-pointer">
                                <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-blue-100 text-blue-500">
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
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                </div>
                                <div
                                    className="flex flex-col flex-grow ml-4 hover:cursor-pointer"
                                    onClick={handleToggleEdit}
                                >
                                    <div className="font-bold text-lg">Simple Dashboard</div>
                                    <div className="text-sm text-gray-500">
                                        Easily manage and prioritize daily tasks.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* selecting project form for Dashboard */}
            {ToggleEdit && (
                <div className='bg-gray-900 bg-opacity-50 w-full h-screen fixed top-0 left-0'>
                    <div className="absolute top-0 left-0 w-full h-screen flex flex-col justify-center sm:py-12" >
                        <div className="p-10 xs:p-0 mx-auto md:w-auto">
                            <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
                                <div className='flex flex-wrap flex-col text-start px-5 py-3 max-w-md '>
                                    <h1 className="font-bold text-xl pt-3">What data do you want to visualize?</h1>
                                    <p className='text-sm pt-1'>ClickUp Dashboards help you visualize data from your tasks. Select a location(s) to source your data from.</p>
                                </div>
                                <form onSubmit={handleToggleEditOnChange} className="px-14 py-10 space-y-4">
                                    <label className="block">
                                        <span className="text-gray-700">Select Project:</span>
                                        <select
                                            type="text"
                                            value={ProjectName}
                                            onChange={handleFormChange}
                                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                        >
                                            <option >Select Project</option> {/* default option */}
                                            <option >Marketing</option>
                                            <option >MNNLR</option>
                                            <option >HR</option>
                                        </select>
                                    </label>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleToggleEdit}
                                        className="m-2 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
                                    >
                                        Cancel
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div >
                </div>
            )}
        </>
    )
}

