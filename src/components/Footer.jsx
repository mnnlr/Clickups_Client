import React from 'react'
import { Link } from 'react-router-dom'

export const Footer = () => {
    return (
        <footer className="relative bg-[#2A085F] pt-8 pb-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap text-left lg:text-left">
                    <div className="w-full lg:w-6/12 px-4">
                        <h4 className="text-white text-3xl fonat-semibold text-blueGray-700">Let's keep in touch!</h4>
                        <h5 className="text-lg mt-0 mb-2 text-gray-200">
                            Find us on any of these platforms, we respond 1-2 business days.
                        </h5>
                        <div className="mt-6 lg:mb-0 mb-6 flex">
                            <Link to ="https://www.linkedin.com/company/man-need-new-life-resource/posts/?feedView=all">
                            <button className="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 8c0 .557-.447 1.008-1 1.008s-1-.45-1-1.008c0-.557.447-1.008 1-1.008s1 .452 1 1.008zm0 2h-2v6h2v-6zm3 0h-2v6h2v-2.861c0-1.722 2.002-1.881 2.002 0v2.861h1.998v-3.359c0-3.284-3.128-3.164-4-1.548v-1.093z"/></svg>
                            </button>
                            </Link>
                            {/* <button className="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2" type="button">
                                <svg className="h-6 w-6 text-lightBlue-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.407.593 24 1.324 24h11.486v-9.293H9.692v-3.622h3.118V8.413c0-3.1 1.892-4.788 4.657-4.788 1.325 0 2.463.098 2.795.142v3.24h-1.917c-1.505 0-1.796.716-1.796 1.766v2.315h3.591l-.467 3.622h-3.124V24h6.123C23.407 24 24 23.407 24 22.676V1.324C24 .593 23.407 0 22.676 0" />
                                </svg>
                            </button> */}
                            <Link to={"https://github.com/mnnlr"}>
                            <button className="bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2" type="button">
                                <svg className="h-6 w-6 text-blueGray-800" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0C5.371 0 0 5.371 0 12c0 5.309 3.438 9.786 8.207 11.387.599.111.82-.259.82-.577v-2.141c-3.337.725-4.033-1.36-4.033-1.36-.546-1.382-1.334-1.751-1.334-1.751-1.091-.746.083-.731.083-.731 1.205.085 1.839 1.239 1.839 1.239 1.072 1.837 2.81 1.306 3.493.998.108-.776.419-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.931 0-1.31.47-2.381 1.236-3.222-.124-.303-.536-1.527.117-3.18 0 0 1.009-.323 3.301 1.231.957-.266 1.98-.399 3-.405 1.021.006 2.043.139 3 .405 2.291-1.554 3.299-1.231 3.299-1.231.654 1.653.243 2.877.119 3.18.769.841 1.235 1.911 1.235 3.222 0 4.61-2.803 5.622-5.473 5.921.43.369.814 1.096.814 2.212v3.285c0 .321.219.693.824.575C20.565 21.783 24 17.308 24 12c0-6.629-5.371-12-12-12" />
                                </svg>
                            </button>
                            </Link>
                        </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                        <div className="flex flex-wrap items-top mb-6">
                            <div className="w-full lg:w-4/12 px-4 ml-auto">
                                <span className="text-white block uppercase text-blueGray-500 text-lg font-semibold mb-4 underline underline-offset-8">Useful Links</span>
                                <ul className="list-unstyled">
                                <li>
                                        <a className="text-gray-200 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://mnnlr-emp.netlify.app">MNNLR</a>
                                    </li>
                                    <li>
                                        <a className="text-gray-200 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://mnnlr-emp.netlify.app/#about">About Us</a>
                                    </li>
                                    <li>
                                        <a className="text-gray-200 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://mnnlr-emp.netlify.app/services">MNNLR Services</a>
                                    </li>
                                    <li>
                                        <a className="text-gray-200 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://mnnlr-emp.netlify.app/career">MNNLR Career</a>
                                    </li>
                                    <li>
                                        <a className="text-gray-200 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://mnnlr-emp.netlify.app/contact">Contact</a>
                                    </li>
                                </ul>
                            </div>                            
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-blueGray-300" />
                <div className="flex flex-wrap items-center md:justify-between justify-center">
                    <div className="w-full md:w-4/12 px-4 mx-auto text-center">
                        <div className="text-sm text-white font-semibold py-1">
                            Copyright © <span id="get-current-year">2024</span><a href="https://www.creative-tim.com/product/notus-js" className="text-blueGray-500 hover:text-gray-800" target="_blank"> MNNLR
                            </a><a href="https://www.creative-tim.com?ref=njs-profile" className="text-blueGray-500 hover:text-blueGray-800"> Creative Tim</a>.
                        </div>
                    </div>
                </div>
            </div>
        </footer>

    )
}
