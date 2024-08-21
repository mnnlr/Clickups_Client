import React, { useState } from 'react'
import { InfoTab } from './InfoTab'
import img from '/assets/09d6bfc03b197744925c51762fb97cbc.jpg'

export const InfoTabsSection = () => {

    const [todoTab, setTodoTab] = useState(true)
    const [docTab, setDocTab] = useState(false)
    const [inboxMessagesTab, setInboxMessagesTab] = useState(false)
    const [workspaceTab, setWorkspaceTab] = useState(false)

    const todoBtn = () => {
        setTodoTab(true)
        setDocTab(false)
        setInboxMessagesTab(false)
        setWorkspaceTab(false)
    }
    const docBtn = () => {
        setDocTab(true)
        setTodoTab(false)
        setInboxMessagesTab(false)
        setWorkspaceTab(false)
    }
    const inboxMessagesBtn = () => {
        setInboxMessagesTab(true)
        setDocTab(false)
        setTodoTab(false)
        setWorkspaceTab(false)
    }
    const workspaceBtn = () => {
        setWorkspaceTab(true)
        setInboxMessagesTab(false)
        setDocTab(false)
        setTodoTab(false)
    }

    return (
        <div className='w-full h-screen flex flex-col items-center justify-center px-4'>
            <h1 className='py-6 text-2xl md:text-3xl text-gray-900 font-serif text-center'>
                All from a single source of truth
            </h1>
            <div className='my-6 flex flex-wrap justify-center'>
                <button
                    onClick={todoBtn}
                    className='shadow-xl m-2 px-4 py-2 font-bold duration-300 bg-gray-300 hover:underline hover:cursor-pointer bg-opacity-50 hover:bg-opacity-50 rounded-full text-sm sm:text-base md:text-lg'
                >
                    Todo's
                </button>
                <button
                    onClick={docBtn}
                    className='shadow-xl m-2 px-4 py-2 font-bold duration-300 bg-gray-300 hover:underline hover:cursor-pointer bg-opacity-50 hover:bg-opacity-50 rounded-full text-sm sm:text-base md:text-lg'
                >
                    Documentation
                </button>
                <button
                    onClick={inboxMessagesBtn}
                    className='shadow-xl m-2 px-4 py-2 font-bold duration-300 bg-gray-300 hover:underline hover:cursor-pointer bg-opacity-50 hover:bg-opacity-50 rounded-full text-sm sm:text-base md:text-lg'
                >
                    Inbox Messages
                </button>
                <button
                    onClick={workspaceBtn}
                    className='shadow-xl m-2 px-4 py-2 font-bold duration-300 bg-gray-300 hover:underline hover:cursor-pointer bg-opacity-50 hover:bg-opacity-50 rounded-full text-sm sm:text-base md:text-lg'
                >
                    Workspaces
                </button>
            </div>
            <div id='infoTabs' className=''>
                {todoTab && (
                    <InfoTab
                        title1="Todo's"
                        description1='Break the big ideas down into manageable chunks across teams with user stories, issues, and tasks.'
                        title2="Todo's"
                        description2='Work becomes a lot more visible when its all in one place. It makes collaboration a whole lot easier.'
                        img={img}
                    />
                )}
                {docTab && (
                    <InfoTab
                        title1='Documentation'
                        description1='Prioritize and discuss your team’s work in context with complete visibility at every level.'
                        title2='Documentation'
                        description2='Prioritize and discuss your team’s work in context with complete visibility at every level.'
                        img={img}
                    />
                )}
                {inboxMessagesTab && (
                    <InfoTab
                        title1='Inbox Messages'
                        description1='Ship faster, with confidence knowing the information you have is always up-to-date.'
                        title2='Inbox Messages'
                        description2='Less friction in the development process means better results and a faster time to market.'
                        img={img}
                    />
                )}
                {workspaceTab && (
                    <InfoTab
                        title1='Workspace'
                        description1='Improve team performance in context, based on real-time, visual data.'
                        title2='Workspace'
                        description2='Full visibility in Jira across the whole organization enables you to make better management judgment.'
                        img={img}
                    />
                )}
            </div>
        </div>
    )
}
