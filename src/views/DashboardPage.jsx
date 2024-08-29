import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dashboardData } from '../redux/dashboards/dashboardSlice'
import { DashboardTemplates } from '../components/dashboard/DashboardTemplates'
import { UserDashboards } from '../components/dashboard/UserDashboards'

export const DashboardPage = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        try {
            const dashboardDataFromServer = [
                { //Dumy data
                    _id: 'ads4fas89f4',
                    createdBy: 'John Doe',
                    dashboardName: 'John Doe Dashboard',
                    projectName: "MNNLR",
                    dashboardType: 'Simple Dashboard',
                    dashboardId: 1,
                    dashboardData: {
                        name: 'John Doe',
                        tasks: 5,
                        completedTask: 2,
                        pendingTask: 3,
                        todoTask: 1
                    }
                },
                {
                    _id: 'ads4fas89f4ds',
                    createdBy: 'John Doe',
                    dashboardName: 'John Doe Dashboard',
                    projectName: "HR",
                    dashboardType: 'Simple Dashboard',
                    dashboardId: 2,
                    dashboardData: {
                        name: 'John Doe',
                        tasks: 5,
                        completedTask: 2,
                        pendingTask: 3,
                        todoTask: 1
                    }
                },
                {
                    _id: 'ads4fas89f4saf',
                    createdBy: 'John Doe',
                    dashboardName: 'John Doe Dashboard',
                    projectName: "Management",
                    dashboardType: 'Simple Dashboard',
                    dashboardId: 3,
                    dashboardData: {
                        name: 'John Doe',
                        tasks: 5,
                        completedTask: 2,
                        pendingTask: 3,
                        todoTask: 1
                    }
                }
            ]
            dispatch(dashboardData(dashboardDataFromServer))
        } catch (err) {
            console.log(err)
        }
    }, [dispatch])

    const DashboardData = useSelector((state) => state.dashboard.dashboards)

    // console.log(DashboardData)

    return (
        <>
            <div className="relative pt-16 pb-6 bg-gray-100 h-screen md:ml-16">
                <section className='flex flex-col items-center justify-center px-5 py-10'>
                    <h1 className='text-black text-3xl font-bold'>Choose a Dashboard template</h1>
                    <p className='text-gray-500'>Get started with a new Dashboard template which fit to your exact needs.</p>
                </section>
                <DashboardTemplates />
                {Object.keys(DashboardData).length !== 0 && DashboardData.map((data, index) => (
                    <div className='my-1 mx-7' key={index}>
                        <UserDashboards dashboardName={data.dashboardName} dashboardType={data.dashboardType} projectName={data.projectName} />
                    </div>
                ))}
            </div>
        </>
    )
}
